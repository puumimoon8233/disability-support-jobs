import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { getCategoryName, supportAreaLabels } from "@/lib/labels";
import type { Company } from "@/types/company";

export function CompanyCard({ company }: { company: Company }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-wrap gap-2">{company.categories.map((category) => <Badge key={category}>{getCategoryName(category)}</Badge>)}</div>
      <h2 className="mt-4 text-xl font-bold text-slate-950"><Link href={`/companies/${company.slug}`}>{company.name}</Link></h2>
      <p className="mt-3 text-slate-600">{company.shortDescription}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">{company.supportAreas.map((area) => <span key={area}>#{supportAreaLabels[area]}</span>)}</div>
      <div className="mt-5 flex flex-wrap gap-2">
        {company.isRemoteFriendly && <Badge tone="green">リモート可</Badge>}
        {company.allowsSideJob && <Badge tone="green">副業可</Badge>}
        {company.hasFlexibleHours && <Badge tone="green">フレックス</Badge>}
      </div>
    </article>
  );
}
