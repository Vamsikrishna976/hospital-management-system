interface BedStatsProps {
  stats: any;
}

export default function BedStats({ stats }: BedStatsProps) {
  if (!stats) return null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">

        <div className="bg-blue-600 text-white rounded-xl p-5 shadow-lg">
          <h3 className="text-sm">Total Beds</h3>
          <p className="text-3xl font-bold">{stats.totalBeds}</p>
        </div>

        <div className="bg-green-600 text-white rounded-xl p-5 shadow-lg">
          <h3 className="text-sm">Available</h3>
          <p className="text-3xl font-bold">{stats.availableBeds}</p>
        </div>

        <div className="bg-red-600 text-white rounded-xl p-5 shadow-lg">
          <h3 className="text-sm">Occupied</h3>
          <p className="text-3xl font-bold">{stats.occupiedBeds}</p>
        </div>

        <div className="bg-yellow-500 text-white rounded-xl p-5 shadow-lg">
          <h3 className="text-sm">Maintenance</h3>
          <p className="text-3xl font-bold">{stats.maintenanceBeds}</p>
        </div>

        <div className="bg-purple-600 text-white rounded-xl p-5 shadow-lg">
          <h3 className="text-sm">Occupancy</h3>
          <p className="text-3xl font-bold">
            {stats.occupancyRate}%
          </p>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold">
            Bed Occupancy
          </h2>

          <span className="font-semibold text-purple-600">
            {stats.occupancyRate}%
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-purple-600 h-4 transition-all duration-700"
            style={{
              width: `${stats.occupancyRate}%`,
            }}
          />
        </div>

        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>{stats.occupiedBeds} Occupied</span>
          <span>{stats.availableBeds} Available</span>
        </div>
      </div>
    </>
  );
}