import { useState } from "react";
import Button from "../button";

interface ChatInputProps {
  onSubmit: (value: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSubmit }) => {
  const [value, setValue] = useState("");
  const [height, setHeight] = useState(72);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const isCombo =
      event.shiftKey || event.ctrlKey || event.altKey || event.metaKey;
    if (event.key !== "Enter" || isCombo) {
      return;
    }

    if (event.key === "Enter" && !isCombo && value === "") {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    onSubmit(value);
    setValue("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    const lineCount = (event.target.value.match(/\n/g)?.length || 0) * 25 + 72;
    setHeight(lineCount);
  };

  return (
    <div className="flex gap-2">
      <textarea
        className="w-full mx-auto py-1.5 px-2.5 resize-none border border-black rounded max-h-40"
        style={{ height: `${height}px` }}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={() => onSubmit(value)}>Submit</Button>
    </div>
  );
};

export default ChatInput;
