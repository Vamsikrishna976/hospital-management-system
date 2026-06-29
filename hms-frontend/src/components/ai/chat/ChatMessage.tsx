import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ChatMessage as Message } from "../../../../types/ai";
import { memo } from "react";

interface Props {
  message: Message;
}

function ChatMessage({ message }: Props) {
  return (
    <div
      className={`rounded-xl p-5 max-w-[75%] ${
        message.role === "user"
          ? "ml-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
          : "bg-white border shadow-md"
      }`}
    >
      <div className="font-semibold mb-3">
        {message.role === "user" ? "👨‍⚕️ Doctor" : "🤖 AI Assistant"}
      </div>

      <div
        className={
          message.role === "ai"
            ? "prose prose-sm max-w-none"
            : "whitespace-pre-wrap"
        }
      >
        {message.role === "ai" ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {message.text}
          </ReactMarkdown>
        ) : (
          message.text
        )}
      </div>
    </div>
  );
}
export default memo(ChatMessage);
