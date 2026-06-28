import React from "react";

interface BedCardProps {
  bed: any;
  updateStatus: (
    id: string,
    status: "AVAILABLE" | "MAINTENANCE"
  ) => void;
  viewPatient: (id: string) => void;
}

function BedCard({
  bed,
  updateStatus,
  viewPatient,
}: BedCardProps) {
  return (
    <div
      className={`rounded-xl shadow-lg p-4 text-white transition hover:scale-105 ${
        bed.status === "AVAILABLE"
          ? "bg-green-600"
          : bed.status === "MAINTENANCE"
          ? "bg-yellow-500"
          : "bg-red-600"
      }`}
    >
      <h3 className="font-bold text-lg">
        {bed.bedNumber}
      </h3>

      <p>Ward : {bed.ward}</p>

      <p>Room : {bed.roomNumber}</p>

      <p>Status : {bed.status}</p>

      <div className="mt-4">
        {bed.status === "AVAILABLE" && (
          <button
            onClick={() =>
              updateStatus(bed.id, "MAINTENANCE")
            }
            className="w-full bg-yellow-600 hover:bg-yellow-700 rounded-lg py-2"
          >
            Mark Maintenance
          </button>
        )}

        {bed.status === "MAINTENANCE" && (
          <button
            onClick={() =>
              updateStatus(bed.id, "AVAILABLE")
            }
            className="w-full bg-green-700 hover:bg-green-800 rounded-lg py-2"
          >
            Make Available
          </button>
        )}

        {bed.status === "OCCUPIED" && (
          <button
            onClick={() => viewPatient(bed.id)}
            className="w-full bg-red-800 hover:bg-red-900 rounded-lg py-2"
          >
            View Patient
          </button>
        )}
      </div>
    </div>
  );
}

export default React.memo(BedCard);