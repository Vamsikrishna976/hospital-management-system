import { memo } from "react";

function DiagnosisHeader() {
  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          🧠 AI Diagnosis Assistant
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          AI-generated clinical suggestions based on patient history,
          symptoms, vitals and laboratory reports.
        </p>
      </div>
    </div>
  );
}

export default memo(DiagnosisHeader);