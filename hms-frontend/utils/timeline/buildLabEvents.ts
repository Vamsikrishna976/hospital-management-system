import type { TimelineEvent } from "../../types/timeline";

export function buildLabEvents(context: any): TimelineEvent[] {
  if (!context) return [];

  const events: TimelineEvent[] = [];

  context.labOrders?.forEach((labOrder: any) => {
    // Lab Order
    events.push({
      id: `lab-order-${labOrder.id}`,
      title: "Lab Test Ordered",
      description:
        labOrder.items
          ?.map((item: any) => item.labTest?.testName)
          .join(", ") || "Laboratory Test",
      date: labOrder.createdAt,
      type: "lab",
    });

    // Lab Results
    const completedResults =
      labOrder.items?.filter(
        (item: any) => item.result
      ) || [];

    completedResults.forEach((item: any) => {
      events.push({
        id: `lab-result-${item.id}`,
        title: "Lab Result Available",
        description: `${item.labTest?.testName}: ${item.result}`,
        date: item.updatedAt || item.createdAt,
        type: "lab",
      });
    });
  });

  return events;
}