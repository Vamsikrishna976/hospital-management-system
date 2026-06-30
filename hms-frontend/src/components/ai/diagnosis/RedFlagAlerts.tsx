import { memo } from "react";

interface Props {
  redFlags?: string[];
}

function RedFlagAlerts({ redFlags }: Props) {
  if (!redFlags || redFlags.length === 0) {
    return null;
  }

  return (
    <div className="bg-red-50 border border-red-300 rounded-xl shadow-sm p-5">
      <h3 className="text-lg font-semibold text-red-700 mb-4">
        🚨 Critical Alerts
      </h3>

      <ul className="space-y-3">
        {redFlags.map((flag, index) => (
          <li
            key={index}
            className="flex items-start gap-3"
          >
            <span className="text-red-600 text-xl">
              🔴
            </span>

            <span className="text-red-700">
              {flag}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(RedFlagAlerts);
