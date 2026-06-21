import { Outlet } from "react-router-dom";
import Sidebar from "../../src/components/layout/Sidebar";
import Header from "../../src/components/layout/Header";

export default function DashboardLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}