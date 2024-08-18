import React, { useEffect, useRef } from "react";
import AssistantMessage from "./assistant-manager";
import UserMessage from "./user-message";
import PendingMessage from "./pending-message";

interface Message {
  role: "user" | "system" | "assistant" | "pending" | "human" | "ai";
  content: string;
}

interface ChatListProps {
  messages: Message[];
}

const ChatList: React.FC<ChatListProps> = ({ messages }) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="overflow-y-auto flex flex-col flex-1">
      <div className="flex flex-col flex-1 gap-3 px-1.5 py-1">
        {messages.map((message, index) => {
          if (message.role === "user" || message.role === "human") {
            return <UserMessage key={index} content={message.content} />;
          } else if (message.role === "assistant" || message.role === "ai") {
            return <AssistantMessage key={index} content={message.content} />;
          } else if (message.role === "pending") {
            return <PendingMessage key={index} />;
          }
          return null;
        })}
      </div>
      <div ref={endOfMessagesRef} className="pt-4" />
    </div>
  );
};

export default ChatList;
