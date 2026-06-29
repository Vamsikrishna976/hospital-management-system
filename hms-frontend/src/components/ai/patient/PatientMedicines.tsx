import { memo } from "react";

interface Props {
  context: any;
}

function PatientMedicines({ context }: Props) {
  const medicines =
    context?.opRecords?.[0]?.appointment?.[0]?.prescription?.medicines || [];

  if (medicines.length === 0) return null;

  return (
    <div className="bg-white border rounded-xl shadow-md p-5">
      <h2 className="text-lg font-bold mb-4">💊 Prescribed Medicines</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-100">
              <th className="border p-3 text-left">Medicine</th>
              <th className="border p-3 text-left">Dosage</th>
              <th className="border p-3 text-left">Frequency</th>
              <th className="border p-3 text-left">Duration</th>
            </tr>
          </thead>

          <tbody>
            {medicines.map((medicine: any) => (
              <tr key={medicine.id}>
                <td className="border p-3">{medicine.medicineName}</td>

                <td className="border p-3">{medicine.dosage}</td>

                <td className="border p-3">{medicine.frequency}</td>

                <td className="border p-3">{medicine.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default memo(PatientMedicines);
