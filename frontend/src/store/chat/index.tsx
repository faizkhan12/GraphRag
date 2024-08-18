import type { Message, MessageOpts, Conversation } from "./store";
import { useChat } from "./store";
import { useSync } from "./sync";

const useSendMessage = () => {
  const { sendMessage: sendSyncMessage } = useSync();

  const sendMessage = (message: Message, opts: MessageOpts) => {
    return sendSyncMessage(message, opts);
  };

  return sendMessage;
};

export { useChat, useSendMessage, Conversation };
