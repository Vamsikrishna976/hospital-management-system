import { memo } from "react";

interface Props {
  prompt: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
}

function ChatInput({ prompt, loading, onChange, onSend }: Props) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (!loading) {
        onSend();
      }
    }
  };

  return (
    <div className="bg-white border rounded-xl shadow-md p-5 mt-6">
      <textarea
        rows={3}
        value={prompt}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything about diseases, medicines, diagnosis..."
        className="w-full border rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex justify-end mt-4">
        <button
          onClick={onSend}
          disabled={loading || !prompt.trim()}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white px-8 py-3 rounded-xl font-semibold transition disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>
      </div>
    </div>
  );
}
export default memo(ChatInput);
