import { createContext, useContext, useReducer, useCallback } from "react";
import { api } from "../../api/axios";

export interface Message {
  id?: number;
  role: "user" | "assistant" | "system" | "pending";
  content: string;
}

export interface Conversation {
  id: number;
  messages: Message[];
}
export interface MessageOpts {
  documentId?: number;
}

export interface ChatState {
  error: string;
  loading: boolean;
  activeConversationId: number | null;
  conversations: Conversation[];
}

const INITIAL_STATE: ChatState = {
  error: "",
  loading: false,
  activeConversationId: null,
  conversations: [],
};

type ChatAction =
  | { type: "SET"; payload: Partial<ChatState> }
  | { type: "RESET" }
  | { type: "RESET_ERROR" }
  | { type: "ADD_MESSAGE_TO_ACTIVE"; payload: Message }
  | { type: "REMOVE_MESSAGE_FROM_ACTIVE"; payload: number };

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case "SET":
      return { ...state, ...action.payload };
    case "RESET":
      return INITIAL_STATE;
    case "RESET_ERROR":
      return { ...state, error: "" };
    case "ADD_MESSAGE_TO_ACTIVE": {
      const activeConversation = state.conversations.find(
        (c) => c.id === state.activeConversationId
      );
      if (activeConversation) {
        activeConversation.messages.push(action.payload);
      }
      return { ...state };
    }
    case "REMOVE_MESSAGE_FROM_ACTIVE": {
      const activeConversation = state.conversations.find(
        (c) => c.id === state.activeConversationId
      );
      if (activeConversation) {
        activeConversation.messages = activeConversation.messages.filter(
          (m) => m.id !== action.payload
        );
      }
      return { ...state };
    }
    default:
      return state;
  }
};

const ChatContext = createContext<
  ChatState & {
    set: (val: Partial<ChatState>) => void;
    getRawMessages: () => { role: string; content: string }[];
    fetchConversations: (documentId: number) => Promise<void>;
    resetAll: () => void;
    resetError: () => void;
    createConversation: (documentId: number) => Promise<Conversation>;
    setActiveConversationId: (id: number) => void;
    insertMessageToActive: (message: Message) => void;
    removeMessageFromActive: (id: number) => void;
    getActiveConversation: () => Conversation | null;
  }
>({
  ...INITIAL_STATE,
  set: () => {},
  getRawMessages: () => [],
  fetchConversations: async () => {},
  resetAll: () => {},
  resetError: () => {},
  createConversation: async () => ({ id: 0, messages: [] }),
  setActiveConversationId: () => {},
  insertMessageToActive: () => {},
  removeMessageFromActive: () => {},
  getActiveConversation: () => null,
});

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  const set = useCallback((val: Partial<ChatState>) => {
    dispatch({ type: "SET", payload: val });
  }, []);

  const getActiveConversation = useCallback(() => {
    return (
      state.conversations.find((c) => c.id === state.activeConversationId) ||
      null
    );
  }, [state.conversations, state.activeConversationId]);

  const getRawMessages = useCallback(() => {
    const conversation = getActiveConversation();
    if (!conversation) return [];
    return conversation.messages
      .filter((message) => message.role !== "pending")
      .map((message) => ({ role: message.role, content: message.content }));
  }, [getActiveConversation]);

  const insertMessageToActive = useCallback(
    (message: Message) => {
      const conversation = getActiveConversation();
      if (!conversation) return;
      conversation.messages.push(message);
      dispatch({
        type: "SET",
        payload: { conversations: [...state.conversations] },
      });
    },
    [getActiveConversation, state.conversations]
  );

  const removeMessageFromActive = useCallback(
    (id: number) => {
      const conversation = getActiveConversation();
      if (!conversation) return;
      conversation.messages = conversation.messages.filter((m) => m.id !== id);
      dispatch({
        type: "SET",
        payload: { conversations: [...state.conversations] },
      });
    },
    [getActiveConversation, state.conversations]
  );

  const fetchConversations = useCallback(
    async (documentId: number) => {
      const { data } = await api.get<Conversation[]>(
        `/conversations?pdf_id=${documentId}`
      );
      if (data.length) {
        set({
          conversations: data,
          activeConversationId: data[0].id,
        });
      } else {
        await createConversation(documentId);
      }
    },
    [set]
  );

  const createConversation = useCallback(
    async (documentId: number) => {
      const { data } = await api.post<Conversation>(
        `/conversations?pdf_id=${documentId}`
      );
      set({
        activeConversationId: data.id,
        conversations: [data, ...state.conversations],
      });
      return data;
    },
    [set, state.conversations]
  );

  const setActiveConversationId = useCallback(
    (id: number) => {
      set({ activeConversationId: id });
    },
    [set]
  );

  const resetAll = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  const resetError = useCallback(() => {
    dispatch({ type: "RESET_ERROR" });
  }, []);

  return (
    <ChatContext.Provider
      value={{
        ...state, // Spreads the state properties directly
        set,
        getRawMessages,
        fetchConversations,
        resetAll,
        resetError,
        createConversation,
        setActiveConversationId,
        insertMessageToActive,
        removeMessageFromActive,
        getActiveConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
