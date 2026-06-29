import { memo } from "react";

interface Props {
  context: any;
}

function PatientPrescription({ context }: Props) {
  const latestPrescription =
    context?.opRecords?.[0]?.appointment?.[0]?.prescription;

  if (!latestPrescription) return null;

  return (
    <div className="bg-white border rounded-xl shadow-md p-5">
      <h2 className="text-lg font-bold mb-4">💊 Latest Diagnosis</h2>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Diagnosis</p>

          <p className="font-semibold">{latestPrescription.diagnosis}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Doctor Notes</p>

          <p>{latestPrescription.notes || "-"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Follow-up Date</p>

          <p>
            {latestPrescription.followUpDate
              ? new Date(latestPrescription.followUpDate).toLocaleDateString()
              : "-"}
          </p>
        </div>
      </div>
    </div>
  );
}
export default memo(PatientPrescription);
