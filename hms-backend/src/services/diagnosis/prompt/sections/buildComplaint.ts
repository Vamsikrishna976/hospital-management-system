interface Complaint {
  chiefComplaint?: string | null;
}

export function buildComplaint(
  complaint?: Complaint | null
): string {
  return `
=========================
CURRENT COMPLAINT
=========================

Chief Complaint:
${complaint?.chiefComplaint ?? "Not Available"}
`;
}