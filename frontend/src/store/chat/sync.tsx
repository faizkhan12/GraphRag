import { useChat } from "./store";
import { api, getErrorMessage } from "../../api/axios";
import type { Message, MessageOpts } from "./store";

const addPendingMessage = (
  insertMessageToActive: any,
  message: Message,
  pendingId: number
) => {
  insertMessageToActive(message);
  insertMessageToActive({
    id: pendingId,
    role: "pending",
    content: "...",
  });
};

export const useSync = () => {
  const {
    set,
    insertMessageToActive,
    removeMessageFromActive,
    getActiveConversation,
  } = useChat();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sendMessage = async (message: Message, _opts?: MessageOpts) => {
    set({ loading: true });
    const pendingId = Math.random();

    try {
      addPendingMessage(insertMessageToActive, message, pendingId);

      const conversation = getActiveConversation();
      if (!conversation) throw new Error("No active conversation found.");

      const { data: responseMessage } = await api.post<Message>(
        `/conversations/${conversation.id}/messages`,
        {
          input: message.content,
        }
      );

      removeMessageFromActive(pendingId);
      insertMessageToActive(responseMessage);
      set({ error: "", loading: false });
    } catch (err) {
      set({ error: getErrorMessage(err), loading: false });
    }
  };

  return { sendMessage };
};
