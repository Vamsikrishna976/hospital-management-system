import { memo } from "react";

interface Props {
  context: any;
}

function PatientLabs({ context }: Props) {
  const latestLab = context?.labOrders?.[0];

  if (!latestLab || latestLab.items.length === 0) return null;

  return (
    <div className="bg-white border rounded-xl shadow-md p-5">
      <h2 className="text-lg font-bold mb-4">🧪 Latest Laboratory Report</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-100">
              <th className="border p-3 text-left">Test</th>
              <th className="border p-3 text-left">Result</th>
              <th className="border p-3 text-left">Reference</th>
              <th className="border p-3 text-left">Remarks</th>
            </tr>
          </thead>

          <tbody>
            {latestLab.items.map((item: any) => (
              <tr key={item.id}>
                <td className="border p-3">{item.labTest.testName}</td>

                <td className="border p-3 font-semibold">
                  {item.result ?? "-"}
                </td>

                <td className="border p-3">{item.referenceRange ?? "-"}</td>

                <td className="border p-3">{item.remarks ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default memo(PatientLabs);
