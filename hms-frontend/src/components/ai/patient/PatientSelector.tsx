import type { Patient } from "../../../../types/ai";

interface Props {
  patients: Patient[];
  selectedPatient: string;
  onSelect: (id: string) => void;
  showPatientInfo: boolean;
  onTogglePatientInfo: () => void;
}

export default function PatientSelector({
  patients,
  selectedPatient,
  onSelect,
  showPatientInfo,
  onTogglePatientInfo,
}: Props) {
  return (
    <div className="bg-white border rounded-xl shadow-md p-5 mb-6">
      <label className="block font-semibold mb-2">Select Patient</label>

      {selectedPatient && (
        <button
          onClick={onTogglePatientInfo}
          className="mt-4 px-4 py-2 rounded-lg  bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          {showPatientInfo
            ? "🙈 Hide Patient Details"
            : "👁 Show Patient Details"}
        </button>
      )}
      <div className="pt-3">
        <select
          value={selectedPatient}
          onChange={(e) => onSelect(e.target.value)}
          className="w-full border rounded-lg p-3 "
        >
          <option value="">Select Patient</option>

          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.fullName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
