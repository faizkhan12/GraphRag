import React from "react";
import { marked } from "marked";

interface UserMessageProps {
  content: string;
}

const UserMessage: React.FC<UserMessageProps> = ({ content }) => {
  return (
    <div
      className="max-w-[80%] border rounded-md py-1 px-2.5 my-0.25 break-words self-end bg-slate-200"
      dangerouslySetInnerHTML={{
        __html: marked(content, { breaks: true, gfm: true }),
      }}
    />
  );
};

export default UserMessage;
