import React, { useEffect } from "react";
import { useChat } from "../../store/chat/store";
import Alert from "../alert";
import ChatInput from "./chat-input";
import ChatList from "./chat-list";
import ConversationSelect from "./conversation-select";

interface ChatPanelProps {
  onSubmit: (text: string) => void;
  documentId: number;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ onSubmit, documentId }) => {
  const {
    fetchConversations,
    createConversation,
    getActiveConversation,
    resetError,
    error,
    conversations,
  } = useChat();

  const activeConversation = getActiveConversation();

  useEffect(() => {
    fetchConversations(documentId);
  }, [documentId, fetchConversations]);

  const handleSubmit = (text: string) => {
    if (onSubmit) {
      onSubmit(text);
    }
  };

  const handleNewChat = () => {
    createConversation(documentId);
  };

  return (
    <div
      style={{ height: "calc(100vh - 80px)" }}
      className="flex flex-col h-full bg-slate-50 border rounded-xl shadow"
    >
      <div className="rounded-lg border-b px-3 py-2 flex flex-row items-center justify-between">
        <div className="flex gap-2">
          <ConversationSelect conversations={conversations} />
          <button
            className="rounded text-sm border border-blue-500 px-2 py-0.5"
            onClick={handleNewChat}
          >
            New Chat
          </button>
        </div>
      </div>
      <div className="flex flex-col flex-1 px-3 py-2 overflow-y-scroll">
        <ChatList messages={activeConversation?.messages || []} />
        <div className="relative">
          {error && error.length < 200 && (
            <div className="p-4">
              <Alert type="error" onDismiss={resetError}>
                {error}
              </Alert>
            </div>
          )}
          <ChatInput onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
