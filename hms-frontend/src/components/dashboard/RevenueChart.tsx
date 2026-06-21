import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: {
    month: string;
    revenue: number;
  }[];
}

export default function RevenueChart({ data }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Revenue Analytics</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="revenue" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
