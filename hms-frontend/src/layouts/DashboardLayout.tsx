import type { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <div className="min-h-screen bg-gray-100 p-6">{children}</div>;
}
