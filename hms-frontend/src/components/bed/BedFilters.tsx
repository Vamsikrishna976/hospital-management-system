interface BedFiltersProps {
  search: string;
  setSearch: (value: string) => void;

  selectedWard: string;
  setSelectedWard: (value: string) => void;

  statusFilter: string;
  setStatusFilter: (value: string) => void;
}

export default function BedFilters({
  search,
  setSearch,
  selectedWard,
  setSelectedWard,
  statusFilter,
  setStatusFilter,
}: BedFiltersProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 mb-6">

      <div className="grid md:grid-cols-3 gap-4">

        <input
          type="text"
          placeholder="Search Bed..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-3"
        />

        <select
          value={selectedWard}
          onChange={(e) => setSelectedWard(e.target.value)}
          className="border rounded-lg px-4 py-3"
        >
          <option value="ALL">All Wards</option>
          <option value="General">General</option>
          <option value="ICU">ICU</option>
          <option value="Emergency">Emergency</option>
          <option value="VIP">VIP</option>
          <option value="Pediatrics">Pediatrics</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg px-4 py-3"
        >
          <option value="ALL">All Status</option>
          <option value="AVAILABLE">Available</option>
          <option value="OCCUPIED">Occupied</option>
          <option value="MAINTENANCE">Maintenance</option>
        </select>

      </div>

    </div>
  );
}