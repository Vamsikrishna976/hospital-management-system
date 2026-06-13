import { useEffect, useState } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

export default function AssignDoctor() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const opRecordId = location.state?.opRecordId;

  console.log(opRecordId);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/doctors");

      console.log(response.data);

      setDoctors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const assignDoctor = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/appointments/assign",
        {
          doctorId: selectedDoctor,
          opRecordId,
        },
      );

      console.log(response.data);

      alert("Doctor Assigned Successfully");
      navigate("/doctor/dashboard");
    } catch (error) {
      console.error(error);
      alert("Assignment Failed");
    }
  };

  return (
    <>
      {doctors.map((doctor: any) => (
        <div
          key={doctor.id}
          className={`border p-4 rounded mb-3 cursor-pointer
      ${selectedDoctor === doctor.id ? "border-blue-600 bg-blue-50" : ""}`}
          onClick={() => setSelectedDoctor(doctor.id)}
        >
          <h2 className="font-bold">{doctor.name}</h2>

          <p>{doctor.department}</p>
        </div>
      ))}

      {selectedDoctor && (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <p>Doctor Selected</p>
          <button
            onClick={assignDoctor}
            className="bg-blue-600 text-white px-6 py-3 rounded mt-4"
          >
            Assign Doctor
          </button>
        </div>
      )}
    </>
  );
}
