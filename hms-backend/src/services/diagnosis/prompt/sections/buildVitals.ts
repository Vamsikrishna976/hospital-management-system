interface OPRecord {
  bloodPressure?: string | null;
  temperature?: number | null;
  pulseRate?: number | null;
  spo2?: number | null;
  weight?: number | null;
  height?: number | null;
  bmi?: number | null;
}

export function buildVitals(latestOP?: OPRecord | null): string {
  if (!latestOP) {
    return `
=========================
LATEST VITALS
=========================

No vitals available.
`;
  }

  return `
=========================
LATEST VITALS
=========================

Blood Pressure: ${latestOP.bloodPressure ?? "Not Available"}

Temperature: ${latestOP.temperature ?? "Not Available"} °C

Pulse Rate: ${latestOP.pulseRate ?? "Not Available"} bpm

SpO₂: ${latestOP.spo2 ?? "Not Available"} %

Weight: ${latestOP.weight ?? "Not Available"} kg

Height: ${latestOP.height ?? "Not Available"} cm

BMI: ${latestOP.bmi ?? "Not Available"}
`;
}
