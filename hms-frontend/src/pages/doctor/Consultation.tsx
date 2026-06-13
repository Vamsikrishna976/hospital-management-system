import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function Consultation() {
  const location = useLocation();

  const appointmentId =
    location.state?.appointmentId;

  const opRecordId =
    location.state?.opRecordId;

  const [diagnosis, setDiagnosis] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const [followUpDate, setFollowUpDate] =
    useState("");

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Consultation
      </h1>

      <div className="bg-gray-100 p-4 rounded mb-6">
        <p>
          Appointment ID:
          {appointmentId}
        </p>

        <p>
          OP Record ID:
          {opRecordId}
        </p>
      </div>

      <div className="space-y-4">
        <textarea
          placeholder="Diagnosis"
          className="border p-3 w-full rounded"
          rows={3}
          value={diagnosis}
          onChange={(e) =>
            setDiagnosis(e.target.value)
          }
        />

        <textarea
          placeholder="Doctor Notes"
          className="border p-3 w-full rounded"
          rows={5}
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
        />

        <input
          type="date"
          className="border p-3 rounded w-full"
          value={followUpDate}
          onChange={(e) =>
            setFollowUpDate(
              e.target.value
            )
          }
        />

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Save Consultation
        </button>
      </div>
    </div>
  );
}