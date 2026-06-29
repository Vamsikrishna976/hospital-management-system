import type { TimelineEvent } from "../../types/timeline";

export function buildRegistrationEvents(
  context: any
): TimelineEvent[] {
  if (!context) return [];

  return [
    {
      id: context.id,
      title: "Patient Registered",
      description: context.fullName,
      date: context.createdAt,
      type: "registration",
    },
  ];
}