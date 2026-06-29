import PatientInfo from "./patient/PatientInfo";
import PatientComplaint from "./patient/PatientComplaint";
import PatientVitals from "./patient/PatientVitals";
import PatientPrescription from "./patient/PatientPrescription";
import PatientMedicines from "./patient/PatientMedicines";
import PatientLabs from "./patient/PatientLabs";
import PatientTimeline from "./patient/PatientTimeline";

interface Props {
  context: any;
  loading: boolean;
}

export default function PatientContextCard({ context, loading }: Props) {
  if (loading) {
    return (
      <div className="bg-white border rounded-xl shadow-md p-5 mb-6">
        <p className="text-gray-500">Loading patient context...</p>
      </div>
    );
  }

  if (!context) return null;

  return (
    <div className="space-y-6">
      <PatientInfo context={context} />

      <PatientComplaint context={context} />

      <PatientVitals context={context} />

      <PatientPrescription context={context} />

      <PatientMedicines context={context} />

      <PatientLabs context={context} />

      <PatientTimeline context={context} />
    </div>
  );
}
