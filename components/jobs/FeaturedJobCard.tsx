import Link from "next/link";
import type { FeaturedJob } from "@/types/featured-job";

function JobTag({ children, tone }: { children: string; tone: "support" | "role" | "work" }) {
  const toneClass = {
    support: "border-primary/20 bg-primary/5 text-primary",
    role: "border-border bg-background text-text/75",
    work: "border-accent/40 bg-accent/10 text-text",
  }[tone];

  return <span className={`inline-flex min-h-8 items-center rounded-full border px-3 py-1 text-xs font-semibold leading-5 ${toneClass}`}>{children}</span>;
}

export function FeaturedJobCard({ job }: { job: FeaturedJob }) {
  return (
    <article className="flex h-full min-w-0 flex-col rounded-3xl border border-border bg-white p-6 shadow-[0_8px_28px_rgba(43,43,43,0.035)] sm:p-7">
      <div className="flex flex-wrap gap-2 text-sm text-text/60">
        <span>{job.location}</span>
        <span aria-hidden="true">/</span>
        <span>{job.employmentType}</span>
      </div>

      <h3 className="mt-4 text-xl font-bold leading-8 tracking-tight text-text">
        {job.detailPath ? (
          <Link className="rounded-md outline-none transition hover:text-primary focus:ring-4 focus:ring-primary/15" href={job.detailPath}>
            {job.title}
          </Link>
        ) : (
          job.title
        )}
      </h3>
      <p className="mt-2 text-sm font-semibold text-primary">{job.companyName}</p>

      <p className="mt-4 line-clamp-3 text-sm leading-7 text-text/70">{job.summary}</p>

      <div className="mt-5 flex flex-wrap gap-2" aria-label="求人タグ">
        {job.supportAreas.map((supportArea) => (
          <JobTag key={supportArea} tone="support">
            {supportArea}
          </JobTag>
        ))}
        <JobTag tone="role">{job.itCategory}</JobTag>
        <JobTag tone="work">{job.workStyle}</JobTag>
      </div>

      {job.detailPath && (
        <Link
          href={job.detailPath}
          className="mt-5 inline-flex w-fit items-center rounded-full border border-primary/20 px-4 py-2 text-sm font-semibold text-primary outline-none transition hover:border-primary/35 hover:bg-primary/5 focus:ring-4 focus:ring-primary/15"
        >
          詳細を見る
        </Link>
      )}

      <dl className="mt-auto grid gap-3 pt-6 text-xs leading-5 text-text/55 sm:grid-cols-2">
        <div>
          <dt className="font-semibold text-text/65">元サイト</dt>
          <dd className="mt-1 break-words">{job.sourceSite}</dd>
        </div>
        <div>
          <dt className="font-semibold text-text/65">掲載確認日</dt>
          <dd className="mt-1">{job.checkedAt}</dd>
        </div>
      </dl>
    </article>
  );
}
