interface PreviousVisit {
  createdAt: Date | string;
  complaint?: {
    chiefComplaint?: string | null;
  } | null;
  appointment?: {
    prescription?: {
      diagnosis?: string | null;
    } | null;
  }[];
}

export function buildPreviousVisits(previousVisits: PreviousVisit[]): string {
  if (!previousVisits.length) {
    return `
=========================
PREVIOUS VISITS
=========================

No previous visits available.
`;
  }

  return `
=========================
PREVIOUS VISITS
=========================

${previousVisits
  .map((visit, index) => {
    const diagnosis =
      visit.appointment?.[0]?.prescription?.diagnosis ?? "Not Available";

    return `
Visit ${index + 1}

Date:
${new Date(visit.createdAt).toLocaleDateString()}

Complaint:
${visit.complaint?.chiefComplaint ?? "Not Available"}

Diagnosis:
${diagnosis}
`;
  })
  .join("\n")}
`;
}
