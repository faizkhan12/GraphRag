import React, { useEffect, useRef } from "react";

interface TextInputProps {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  type = "",
  placeholder,
  value,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.type = type;
    }
  }, [type]);

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500  text-black transition duration-300 ease-in-out focus:ring focus:ring-red-500"
      required
      placeholder={placeholder}
    />
  );
};

export default TextInput;
