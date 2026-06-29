import type { TimelineEvent } from "../../types/timeline";

export function buildOPEvents(context: any): TimelineEvent[] {
  if (!context) return [];

  const events: TimelineEvent[] = [];

  context.opRecords?.forEach((op: any) => {
    // OP Visit
    events.push({
      id: `op-${op.id}`,
      title: "OP Visit",
      description: `OP Number: ${op.opNumber}`,
      date: op.createdAt,
      type: "op",
    });

    // Complaint
    if (op.complaint) {
      events.push({
        id: `complaint-${op.complaint.id}`,
        title: "Complaint Recorded",
        description: op.complaint.chiefComplaint,
        date: op.complaint.createdAt,
        type: "complaint",
      });
    }

    // Prescription
    const prescription = op.appointment?.[0]?.prescription;

    if (prescription) {
      events.push({
        id: `prescription-${prescription.id}`,
        title: "Prescription Generated",
        description: prescription.diagnosis,
        date: prescription.createdAt,
        type: "prescription",
      });
    }
  });

  return events;
}