import { memo } from "react";

import DiagnosisHeader from "./DiagnosisHeader";
import DiagnosisSummary from "./DiagnosisSummary";
import DiagnosisConfidence from "./DiagnosisConfidence";
import RecommendedTests from "./RecommendedTests";
import RedFlagAlerts from "./RedFlagAlerts";
import SuggestedSpecialist from "./SuggestedSpecialist";
import DiagnosisActions from "./DiagnosisActions";
import DiagnosisSkeleton from "./DiagnosisSkeleton";
import DiagnosisEmptyState from "./DiagnosisEmptyState";

import useDiagnosis from "../../../hooks/useDiagnosis";

interface Props {
  prompt: string;
  patientId?: string;
}

function DiagnosisPanel({ prompt, patientId }: Props) {
  const { loading, error, result, analyzeDiagnosis, resetDiagnosis } =
    useDiagnosis();

  return (
    <div className="bg-white rounded-2xl shadow-lg border p-6 space-y-6">
      <DiagnosisHeader />

      <DiagnosisActions
        loading={loading}
        prompt={prompt}
        onGenerate={() => analyzeDiagnosis(prompt, patientId)}
        onReset={resetDiagnosis}
      />

      {error && (
        <div className="rounded-lg bg-red-100 border border-red-300 p-4 text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <DiagnosisSkeleton />
      ) : result ? (
        <>
          <DiagnosisSummary summary={result?.summary} />

          <DiagnosisConfidence confidence={result?.confidence} />

          <RecommendedTests tests={result?.recommendedTests} />

          <RedFlagAlerts redFlags={result?.redFlags} />

          <SuggestedSpecialist specialist={result?.suggestedSpecialist} />
        </>
      ) : (
        <DiagnosisEmptyState />
      )}
    </div>
  );
}

export default memo(DiagnosisPanel);
