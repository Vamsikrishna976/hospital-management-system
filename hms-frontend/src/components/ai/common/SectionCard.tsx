import type { ReactNode } from "react";

interface Props {
  title: string;
  icon?: string;
  children: ReactNode;
}

export default function SectionCard({
  title,
  icon,
  children,
}: Props) {
  return (
    <div className="bg-white border rounded-xl shadow-md p-5">
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
        {icon && <span>{icon}</span>}
        {title}
      </h2>

      {children}
    </div>
  );
}