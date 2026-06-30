import { memo } from "react";

interface Props {
  confidence?: number;
}

function DiagnosisConfidence({ confidence }: Props) {
  if (confidence === undefined || confidence === null) {
    return null;
  }

  const percentage = Math.min(Math.max(confidence, 0), 100);

  const getConfidenceLabel = () => {
    if (percentage >= 90) return "Very High";
    if (percentage >= 75) return "High";
    if (percentage >= 50) return "Moderate";
    return "Low";
  };

  return (
    <div className="bg-white border rounded-xl shadow-sm p-5">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">
          🎯 AI Confidence
        </h3>

        <span className="font-bold text-blue-600">
          {percentage}%
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-blue-600 h-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="text-sm text-gray-500 mt-3">
        Confidence Level:{" "}
        <span className="font-medium">
          {getConfidenceLabel()}
        </span>
      </p>
    </div>
  );
}

export default memo(DiagnosisConfidence);