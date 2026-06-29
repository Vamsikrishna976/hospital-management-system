import { memo } from "react";

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
      <div className="text-6xl mb-4">🤖</div>

      <h2 className="text-2xl font-bold">AI Medical Assistant</h2>

      <p className="mt-3 max-w-md">
        Ask anything about diseases, medicines, diagnosis, prescriptions or
        laboratory reports.
      </p>

      <p className="text-sm mt-6 text-gray-400">
        Start a conversation below...
      </p>
    </div>
  );
}
export default memo(EmptyState);
