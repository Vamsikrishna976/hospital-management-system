interface PatientContext {
  fullName: string;
  age: number;
  gender: string;
  bloodGroup?: string | null;
  mobile: string;
}

export function buildPatientInfo(
  patient: PatientContext
): string {
  return `
=========================
PATIENT INFORMATION
=========================

Name: ${patient.fullName}

Age: ${patient.age}

Gender: ${patient.gender}

Blood Group: ${patient.bloodGroup ?? "Unknown"}

Mobile: ${patient.mobile}
`;
}