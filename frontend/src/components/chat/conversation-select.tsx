import React, { useState, useEffect } from "react";
import { useChat } from "../../store/chat/store";
import { Conversation } from "../../store/chat/store";

interface ConversationSelectProps {
  conversations: Conversation[];
}

const ConversationSelect: React.FC<ConversationSelectProps> = ({
  conversations,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setActiveConversationId } = useChat();

  const handleClick = (conversation: Conversation) => {
    setIsOpen(false);
    setActiveConversationId(conversation.id);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(".relative") === null) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          History
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div
          className="origin-top-right overflow-y-scroll absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          style={{ maxWidth: "250px", maxHeight: "250px" }}
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => handleClick(conversation)}
                role="menuitem"
              >
                {conversation.id}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationSelect;
