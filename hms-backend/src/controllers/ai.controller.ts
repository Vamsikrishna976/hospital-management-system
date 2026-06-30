import type { Request, Response } from "express";
import { askGemini } from "../services/ai.service.ts";
import { getPatientContext } from "../services/ai.service.ts";

export const chatWithAI = async (req: Request, res: Response) => {
  try {
    const { prompt, patientId } = req.body;

    if (!prompt) {
      return res.status(400).json({
        message: "Prompt is required",
      });
    }

    let finalPrompt = prompt;

    if (patientId) {
      const patientContext = await getPatientContext(patientId);
      const latestOP = patientContext?.opRecords?.[0];
      const prescription = latestOP?.appointment?.[0]?.prescription;
      const latestLabOrder = patientContext?.labOrders?.[0];
      const previousVisits = patientContext?.opRecords?.slice(1) || [];

      

      if (patientContext) {
        finalPrompt = `
You are an experienced AI Clinical Assistant working inside a Hospital Management System.

Your audience is a licensed doctor.

Help the doctor with:
- Possible diagnosis
- Differential diagnosis
- Clinical reasoning
- Recommended investigations
- Red flags
- Initial treatment options

Never say "I cannot diagnose".

------------------------------------
PATIENT INFORMATION
------------------------------------

Name: ${patientContext.fullName}

Age: ${patientContext.age}

Gender: ${patientContext.gender}

Blood Group: ${patientContext.bloodGroup ?? "Unknown"}

Mobile: ${patientContext.mobile}

Latest OP Visit

Complaint:
${latestOP?.complaint?.chiefComplaint ?? "Not Available"}

------------------------------------
LATEST VITALS
------------------------------------

Blood Pressure: ${latestOP?.bloodPressure ?? "Not Available"}

Temperature: ${latestOP?.temperature ?? "Not Available"} °C

Pulse Rate: ${latestOP?.pulseRate ?? "Not Available"} bpm

SpO₂: ${latestOP?.spo2 ?? "Not Available"} %

Weight: ${latestOP?.weight ?? "Not Available"} kg

Height: ${latestOP?.height ?? "Not Available"} cm

BMI: ${latestOP?.bmi ?? "Not Available"}

------------------------------------
CURRENT PRESCRIPTION
------------------------------------

Diagnosis:
${prescription?.diagnosis ?? "Not Available"}

Doctor Notes:
${prescription?.notes ?? "Not Available"}

Follow Up Date:
${
  prescription?.followUpDate
    ? new Date(prescription.followUpDate).toLocaleDateString()
    : "Not Available"
}

------------------------------------
CURRENT MEDICINES
------------------------------------

${
  prescription?.medicines?.length
    ? prescription.medicines
        .map(
          (m, index) => `
${index + 1}. ${m.medicineName}

Dosage: ${m.dosage}

Frequency: ${m.frequency}

Duration: ${m.duration}
`,
        )
        .join("\n")
    : "No medicines prescribed."
}

------------------------------------
LATEST LAB REPORT
------------------------------------
${
  latestLabOrder?.items?.length
    ? latestLabOrder.items
        .map(
          (item) => `

Test:
${item.labTest.testName}

Result:
${item.result ?? "Pending"}

Reference Range:
${item.referenceRange ?? "-"}

Remarks:
${item.remarks ?? "-"}
`,
        )
        .join("\n")
    : "No laboratory reports available."
}

------------------------------------
PREVIOUS VISITS
------------------------------------

${
  previousVisits.length
    ? previousVisits
        .map(
          (visit, index) => `

Visit ${index + 1}

Date:
${visit.createdAt}

Complaint:
${visit.complaint?.chiefComplaint ?? "-"}

Diagnosis:
${visit.appointment?.[0]?.prescription?.diagnosis ?? "-"}

`,
        )
        .join("\n")
    : "No previous visits."
}

------------------------------------
DOCTOR QUESTION
------------------------------------

${prompt}

Provide a professional medical response.
`;
      }
    }

    // ✅ NOW send finalPrompt
    const answer = await askGemini(finalPrompt);

    return res.json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "AI request failed",
    });
  }
};

export const patientContext = async (req: any, res: any) => {
  try {
    const { patientId } = req.params;

    const context = await getPatientContext(patientId);

    if (!context) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    res.json(context);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch patient context",
    });
  }
};
