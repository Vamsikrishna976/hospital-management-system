import type { TimelineEvent } from "../../types/timeline";

export function buildIPDEvents(context: any): TimelineEvent[] {
  if (!context) return [];

  const events: TimelineEvent[] = [];

  context.ipAdmissions?.forEach((admission: any) => {
    // Admission
    events.push({
      id: `ipd-${admission.id}`,
      title: "Patient Admitted",
      description: `Ward: ${
        admission.ward ?? "General"
      } | Bed: ${
        admission.bed?.bedNumber ?? "-"
      }`,
      date: admission.admissionDate,
      type: "ipd",
    });

    // Billing
    if (admission.bill) {
      events.push({
        id: `bill-${admission.bill.id}`,
        title: "Bill Generated",
        description: `₹ ${
          admission.bill.totalAmount ??
          admission.bill.grandTotal ??
          admission.bill.amount ??
          "-"
        }`,
        date: admission.bill.createdAt,
        type: "billing",
      });
    }

    // Discharge
    if (admission.dischargeDate) {
      events.push({
        id: `discharge-${admission.id}`,
        title: "Patient Discharged",
        description: "Successfully discharged",
        date: admission.dischargeDate,
        type: "discharge",
      });
    }
  });

  return events;
}