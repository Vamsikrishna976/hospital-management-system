import { memo, useEffect, useRef } from "react";
import type { ChatMessage as Message } from "../../../../types/ai";

import ChatMessage from "./ChatMessage";
import LoadingBubble from "./LoadingBubble";
import EmptyState from "./EmptyState";

interface Props {
  messages: Message[];
  loading: boolean;
}

function ChatWindow({ messages, loading }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="bg-gray-50 border rounded-xl shadow-inner h-[550px] overflow-y-auto p-6 space-y-5">
      {messages.length === 0 && <EmptyState />}

      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}

      {loading && <LoadingBubble />}

      <div ref={bottomRef} />
    </div>
  );
}
export default memo(ChatWindow);
