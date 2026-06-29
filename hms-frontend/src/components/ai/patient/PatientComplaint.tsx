import { memo } from "react";
interface Props {
  context: any;
}

function PatientComplaint({ context }: Props) {
  const latestOP = context?.opRecords?.[0];
  const complaint = latestOP?.complaint;

  if (!complaint) return null;

  return (
    <div className="bg-white border rounded-xl shadow-md p-5">
      <h3 className="text-lg font-semibold mb-4">🩺 Chief Complaint</h3>

      <div className="space-y-4">
        <div>
          <p className="text-gray-500 text-sm">Chief Complaint</p>

          <p className="font-semibold">{complaint.chiefComplaint}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Symptoms</p>

          <p>{complaint.symptoms || "-"}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Duration</p>

          <p>{complaint.duration || "-"}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Previous Medication</p>

          <p>{complaint.previousMedication || "-"}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Clinical Notes</p>

          <p>{complaint.clinicalNotes || "-"}</p>
        </div>
      </div>
    </div>
  );
}
export default memo(PatientComplaint);
