import { memo } from "react";

function LoadingBubble() {
  return (
    <div className="bg-white border shadow-md rounded-xl p-4 w-fit">
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></div>

          <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:150ms]"></div>

          <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:300ms]"></div>
        </div>

        <span className="text-sm font-medium">AI is thinking...</span>
      </div>
    </div>
  );
}
export default memo(LoadingBubble);
