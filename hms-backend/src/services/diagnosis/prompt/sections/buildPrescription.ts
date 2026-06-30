interface Medicine {
  medicineName: string;
  dosage: string;
  frequency: string;
  duration: string;
}

interface Prescription {
  diagnosis?: string | null;
  notes?: string | null;
  medicines?: Medicine[];
}

export function buildPrescription(prescription?: Prescription | null): string {
  if (!prescription) {
    return `
=========================
CURRENT PRESCRIPTION
=========================

No prescription available.
`;
  }

  const medicines = prescription.medicines?.length
    ? prescription.medicines
        .map(
          (medicine, index) => `
${index + 1}. ${medicine.medicineName}
Dosage: ${medicine.dosage}
Frequency: ${medicine.frequency}
Duration: ${medicine.duration}
`,
        )
        .join("\n")
    : "No medicines prescribed.";

  return `
=========================
CURRENT PRESCRIPTION
=========================

Diagnosis:
${prescription.diagnosis ?? "Not Available"}

Doctor Notes:
${prescription.notes ?? "Not Available"}

Medicines:
${medicines}
`;
}
