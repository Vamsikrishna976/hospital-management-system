import SectionCard from "../common/SectionCard";
import { memo } from "react";
interface Props {
  context: any;
}

function PatientInfo({ context }: Props) {
  if (!context) return null;

  return (
    <SectionCard title="Patient Information" icon="👤">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-gray-500">Name</span>
          <p className="font-semibold">{context.fullName}</p>
        </div>

        <div>
          <span className="text-gray-500">Age</span>
          <p className="font-semibold">{context.age}</p>
        </div>

        <div>
          <span className="text-gray-500">Gender</span>
          <p className="font-semibold">{context.gender}</p>
        </div>

        <div>
          <span className="text-gray-500">Mobile</span>
          <p className="font-semibold">{context.mobile}</p>
        </div>

        <div>
          <span className="text-gray-500">Blood Group</span>
          <p className="font-semibold">{context.bloodGroup || "-"}</p>
        </div>

        <div>
          <span className="text-gray-500">Patient ID</span>
          <p className="font-semibold">{context.patientNumber}</p>
        </div>
      </div>
    </SectionCard>
  );
}
export default memo(PatientInfo);
