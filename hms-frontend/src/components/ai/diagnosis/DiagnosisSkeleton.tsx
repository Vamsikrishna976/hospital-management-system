import { memo } from "react";

function DiagnosisSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 w-1/3 rounded bg-slate-200" />

      <div className="h-24 rounded-xl bg-slate-200" />

      <div className="h-16 rounded-xl bg-slate-200" />

      <div className="h-32 rounded-xl bg-slate-200" />

      <div className="h-20 rounded-xl bg-slate-200" />
    </div>
  );
}

export default memo(DiagnosisSkeleton);
