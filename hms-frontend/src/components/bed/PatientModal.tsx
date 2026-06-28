interface PatientModalProps {
  show: boolean;
  patient: any;
  onClose: () => void;
}

export default function PatientModal({
  show,
  patient,
  onClose,
}: PatientModalProps) {
  if (!show || !patient) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-[500px]">

        <h2 className="text-2xl font-bold mb-6">
          Patient Details
        </h2>

        <div className="space-y-3">

          <p>
            <strong>Patient:</strong>{" "}
            {patient.patient.fullName}
          </p>

          <p>
            <strong>Patient No:</strong>{" "}
            {patient.patient.patientNumber}
          </p>

          <p>
            <strong>Admission No:</strong>{" "}
            {patient.admissionNo}
          </p>

          <p>
            <strong>Ward:</strong>{" "}
            {patient.bed?.ward}
          </p>

          <p>
            <strong>Room:</strong>{" "}
            {patient.bed?.roomNumber}
          </p>

          <p>
            <strong>Bed:</strong>{" "}
            {patient.bed?.bedNumber}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {patient.status}
          </p>

        </div>

        <div className="mt-8 flex justify-end">

          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg"
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
}