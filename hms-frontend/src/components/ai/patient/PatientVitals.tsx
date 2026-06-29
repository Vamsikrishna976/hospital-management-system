import { memo } from "react";
interface Props {
  context: any;
}

function PatientVitals({ context }: Props) {
  const latestOP = context?.opRecords?.[0];

  if (!latestOP) return null;

  return (
    <div className="bg-white border rounded-xl shadow-md p-5">
      <h3 className="text-lg font-semibold mb-4">🩺 Latest Vitals</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-gray-500 text-sm">Blood Pressure</p>

          <p className="font-semibold">{latestOP.bloodPressure ?? "-"}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Temperature</p>

          <p className="font-semibold">{latestOP.temperature ?? "-"} °C</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Pulse</p>

          <p className="font-semibold">{latestOP.pulseRate ?? "-"} bpm</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">SpO₂</p>

          <p className="font-semibold">{latestOP.spo2 ?? "-"}%</p>
        </div>
      </div>
    </div>
  );
}
export default memo(PatientVitals);
