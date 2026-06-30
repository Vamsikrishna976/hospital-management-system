import { memo } from "react";

function DiagnosisEmptyState() {
  return (
    <div className="rounded-xl border border-dashed p-8 text-center">
      <div className="text-4xl mb-3">🩺</div>

      <h3 className="text-lg font-semibold">AI Diagnosis Assistant</h3>

      <p className="mt-2 text-sm text-slate-500">
        Enter a clinical question and click
        <strong> Generate Diagnosis </strong>
        to receive an AI-assisted analysis.
      </p>
    </div>
  );
}

export default memo(DiagnosisEmptyState);
