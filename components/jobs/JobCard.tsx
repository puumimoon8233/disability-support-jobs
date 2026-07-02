import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { getCompanyById } from "@/lib/data-helpers";
import { employmentTypeLabels, getCategoryName, jobRoleLabels } from "@/lib/labels";
import type { Job } from "@/types/job";

export function JobCard({ job }: { job: Job }) {
  const company = getCompanyById(job.companyId);
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-wrap gap-2">{job.categories.map((category) => <Badge key={category}>{getCategoryName(category)}</Badge>)}</div>
      <h2 className="mt-4 text-xl font-bold text-slate-950"><Link href={`/jobs/${job.slug}`}>{job.title}</Link></h2>
      <p className="mt-2 text-sm font-semibold text-blue-700">{company?.name}</p>
      <p className="mt-3 text-slate-600">{job.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600"><span>{jobRoleLabels[job.role]}</span><span>·</span><span>{employmentTypeLabels[job.employmentType]}</span><span>·</span><span>{job.location}</span></div>
      <div className="mt-5 flex flex-wrap gap-2">
        {job.isRemoteAvailable && <Badge tone="green">リモート可</Badge>}
        {job.allowsSideJob && <Badge tone="green">副業可</Badge>}
        {job.hasFlexibleHours && <Badge tone="green">フレックス</Badge>}
      </div>
    </article>
  );
}
