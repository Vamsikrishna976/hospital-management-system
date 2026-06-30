interface LabItem {
  result?: string | null;
  referenceRange?: string | null;
  remarks?: string | null;
  labTest?: {
    testName: string;
  };
}

interface LabOrder {
  items?: LabItem[];
}

export function buildLabResults(latestLabOrder?: LabOrder | null): string {
  if (!latestLabOrder?.items?.length) {
    return `
=========================
LATEST LAB RESULTS
=========================

No laboratory reports available.
`;
  }

  const reports = latestLabOrder.items
    .map(
      (item) => `
Test:
${item.labTest?.testName ?? "Unknown"}

Result:
${item.result ?? "Pending"}

Reference Range:
${item.referenceRange ?? "-"}

Remarks:
${item.remarks ?? "-"}
`,
    )
    .join("\n");

  return `
=========================
LATEST LAB RESULTS
=========================

${reports}
`;
}
