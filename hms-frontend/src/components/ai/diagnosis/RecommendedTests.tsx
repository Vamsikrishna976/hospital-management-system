import { memo } from "react";

interface Props {
  tests?: string[];
}

function RecommendedTests({ tests }: Props) {
  if (!tests || tests.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border rounded-xl shadow-sm p-5">
      <h3 className="text-lg font-semibold mb-4">🧪 Recommended Tests</h3>

      <ul className="space-y-3">
        {tests.map((test, index) => (
          <li
            key={index}
            className="flex items-center gap-3 border rounded-lg p-3"
          >
            <span className="text-xl">🧪</span>

            <span>{test}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(RecommendedTests);
