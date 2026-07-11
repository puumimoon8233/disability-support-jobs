import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { getCompanyById } from "@/lib/data-helpers";
import { employmentTypeLabels, getCategoryName, jobRoleLabels, supportAreaLabels } from "@/lib/labels";
import type { Job } from "@/types/job";

const getSourceName = (url: string) => {
  try {
    return new URL(url).hostname;
  } catch {
    return "元サイト";
  }
};

export function JobCard({ job }: { job: Job }) {
  const company = getCompanyById(job.companyId);
  const sourceName = getSourceName(job.applicationUrl);

  return (
    <article className="flex h-full min-w-0 flex-col rounded-3xl border border-border bg-white p-6 shadow-sm transition hover:border-primary/20 hover:shadow-[0_12px_36px_rgba(47,125,122,0.08)]">
      <div className="flex flex-wrap gap-2" aria-label="社会課題タグ">
        {job.categories.map((category) => <Badge key={category}>{getCategoryName(category)}</Badge>)}
        {job.supportAreas.map((area) => <Badge key={area} tone="slate">{supportAreaLabels[area]}</Badge>)}
      </div>

      <div className="mt-4 min-w-0">
        <h2 className="text-xl font-bold leading-8 text-text">
          <Link href={`/jobs/${job.slug}`} className="rounded-md outline-none hover:text-primary hover:underline focus:ring-4 focus:ring-primary/15">
            {job.title}
          </Link>
        </h2>
        {company && (
          <Link href={`/companies/${company.slug}`} className="mt-2 inline-flex rounded-md text-sm font-semibold text-primary outline-none hover:underline focus:ring-4 focus:ring-primary/15">
            {company.name}
          </Link>
        )}
      </div>

      <p className="mt-4 text-base leading-7 text-text/70">{job.summary}</p>

      <dl className="mt-5 grid gap-3 text-sm leading-6 text-text/70 sm:grid-cols-2">
        <div>
          <dt className="font-semibold text-text">IT職種</dt>
          <dd className="mt-1">{jobRoleLabels[job.role]}</dd>
        </div>
        <div>
          <dt className="font-semibold text-text">雇用形態</dt>
          <dd className="mt-1">{employmentTypeLabels[job.employmentType]}</dd>
        </div>
        <div>
          <dt className="font-semibold text-text">働き方</dt>
          <dd className="mt-1">{job.location}</dd>
        </div>
        <div>
          <dt className="font-semibold text-text">掲載確認日</dt>
          <dd className="mt-1">{job.updatedAt}</dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap gap-2" aria-label="働き方タグ">
        {job.isRemoteAvailable && <Badge tone="green">リモート可</Badge>}
        {job.allowsSideJob && <Badge tone="green">副業可</Badge>}
        {job.hasFlexibleHours && <Badge tone="green">フレックス</Badge>}
      </div>

      <div className="mt-auto pt-6">
        <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-semibold text-text/55">元サイト：{sourceName}</p>
          <Link href={`/jobs/${job.slug}`} className="inline-flex min-h-10 items-center justify-center rounded-full border border-primary/25 px-4 text-sm font-bold text-primary outline-none transition hover:bg-primary/5 focus:ring-4 focus:ring-primary/15">
            詳細を見る
          </Link>
        </div>
      </div>
    </article>
  );
}
