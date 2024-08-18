import React from "react";
import { marked } from "marked";

interface AssistantManagerProps {
  content: string;
}

const AssistantManager: React.FC<AssistantManagerProps> = ({ content }) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <div
        className="max-w-[80%] border rounded-md py-1.5 px-2.5 my-0.25 break-words self-start bg-blue-500 text-gray-100"
        dangerouslySetInnerHTML={{
          __html: marked(content, { breaks: true, gfm: true }),
        }}
      />
    </div>
  );
};
export default AssistantManager;
