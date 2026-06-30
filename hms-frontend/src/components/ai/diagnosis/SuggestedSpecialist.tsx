import { memo } from "react";

interface Props {
  specialist?: string;
}

function SuggestedSpecialist({ specialist }: Props) {
  if (!specialist) return null;

  return (
    <div className="bg-white border rounded-xl shadow-sm p-5">
      <h3 className="text-lg font-semibold mb-3">
        👨‍⚕️ Suggested Specialist
      </h3>

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
          👨‍⚕️
        </div>

        <div>
          <p className="font-semibold text-slate-800">
            {specialist}
          </p>

          <p className="text-sm text-gray-500">
            Recommended based on AI analysis.
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(SuggestedSpecialist);