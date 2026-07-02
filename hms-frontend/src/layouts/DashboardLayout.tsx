import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 h-screen overflow-y-auto border-r">
        <Sidebar />
      </div>

      {/* Right Side */}
      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}