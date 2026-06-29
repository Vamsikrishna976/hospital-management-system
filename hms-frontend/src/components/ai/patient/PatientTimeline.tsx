import { memo, useMemo } from "react";
import SectionCard from "../common/SectionCard";
import PatientTimelineItem from "./PatientTimelineItem";
import { buildTimeline } from "../../../../utils/timeline/buildTimeline";
interface Props {
  context: any;
}

function PatientTimeline({ context }: Props) {
  const events = useMemo(() => {
    return buildTimeline(context);
  }, [context]);

  if (events.length === 0) return null;

  return (
    <SectionCard title="Patient Timeline" icon="📅">
      <div className="space-y-6">
        {events.map((event) => (
          <PatientTimelineItem key={event.id} event={event} />
        ))}
      </div>
    </SectionCard>
  );
}

export default memo(PatientTimeline);
