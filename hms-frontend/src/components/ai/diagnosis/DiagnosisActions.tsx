import { memo } from "react";

interface Props {
  loading?: boolean;
  prompt: string;
  onGenerate: () => void;
  onReset: () => void;
}

function DiagnosisActions({
  loading = false,
  prompt,
  onGenerate,
  onReset,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3 pt-4">
      <button
        onClick={onGenerate}
        disabled={loading || !prompt.trim()}
        className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Generating..." : "🧠 Generate Diagnosis"}
      </button>

      <button
        onClick={onReset}
        className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
      >
        🔄 Reset
      </button>
    </div>
  );
}

export default memo(DiagnosisActions);
