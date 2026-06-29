import type { TimelineEvent } from "../../types/timeline";

import { buildRegistrationEvents } from "./buildRegistrationEvents";
import { buildOPEvents } from "./buildOPEvents";
import { buildLabEvents } from "./buildLabEvents";
import { buildIPDEvents } from "./buildIPDEvents";

export function buildTimeline(context: any): TimelineEvent[] {
  if (!context) return [];

  const timeline: TimelineEvent[] = [
    ...buildRegistrationEvents(context),

    ...buildOPEvents(context),

    ...buildLabEvents(context),

    ...buildIPDEvents(context),
  ];

  return timeline.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
