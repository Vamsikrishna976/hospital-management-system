import type { Patient } from "../../../../types/ai";

interface Props {
  patients: Patient[];
  selectedPatient: string;
  onSelect: (id: string) => void;
}

export default function PatientSelector({
  patients,
  selectedPatient,
  onSelect,
}: Props) {
  return (
    <div className="bg-white border rounded-xl shadow-md p-5 mb-6">
      <label className="block font-semibold mb-2">
        Select Patient
      </label>

      <select
        value={selectedPatient}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full border rounded-lg p-3"
      >
        <option value="">
          Select Patient
        </option>

        {patients.map((patient) => (
          <option
            key={patient.id}
            value={patient.id}
          >
            {patient.fullName}
          </option>
        ))}
      </select>
    </div>
  );
}