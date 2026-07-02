import type { ReactNode } from "react";

export function Badge({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "green" | "slate" }) {
  const toneClass = {
    blue: "bg-blue-50 text-blue-700 ring-blue-200",
    green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    slate: "bg-slate-100 text-slate-700 ring-slate-200",
  }[tone];
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${toneClass}`}>{children}</span>;
}
