import { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  summary?: string;
}

function DiagnosisSummary({ summary }: Props) {
  if (!summary) return null;

  return (
    <div className="bg-white border rounded-xl shadow-sm p-5">
      <h3 className="text-lg font-semibold mb-3">
        📋 Diagnosis Summary
      </h3>

      <div className="prose prose-sm max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {summary}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default memo(DiagnosisSummary);