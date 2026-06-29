import { memo } from "react";
import type { TimelineEvent } from "../../../../types/timeline";

interface Props {
  event: TimelineEvent;
}

const icons = {
  registration: "🟢",
  op: "🔵",
  complaint: "🟠",
  prescription: "🟣",
  lab: "🧪",
  ipd: "🏥",
  billing: "💰",
  discharge: "🏠",
};

function PatientTimelineItem({ event }: Props) {
  return (
    <div className="flex gap-4">

      <div className="text-2xl">
        {icons[event.type]}
      </div>

      <div className="flex-1">

        <h3 className="font-semibold">
          {event.title}
        </h3>

        {event.description && (
          <p className="text-gray-600 text-sm mt-1">
            {event.description}
          </p>
        )}

        <p className="text-xs text-gray-400 mt-2">
          {new Date(event.date).toLocaleString()}
        </p>

      </div>

    </div>
  );
}

export default memo(PatientTimelineItem);