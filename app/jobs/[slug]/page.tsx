import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { detailedFeaturedJobs, getFeaturedJobById } from "@/data/featuredJobs";
import { jobs } from "@/data/jobs";
import { getCompanyById, getJobBySlug } from "@/lib/data-helpers";
import { employmentTypeLabels, getCategoryName, jobRoleLabels, supportAreaLabels } from "@/lib/labels";
import type { FeaturedJob } from "@/types/featured-job";

function DetailTag({ children, tone = "neutral" }: { children: string; tone?: "primary" | "accent" | "neutral" }) {
  const toneClass = {
    primary: "border-primary/20 bg-primary/5 text-primary",
    accent: "border-accent/40 bg-accent/10 text-text",
    neutral: "border-border bg-background text-text/75",
  }[tone];

  return <span className={`inline-flex min-h-8 items-center rounded-full border px-3 py-1 text-sm font-semibold leading-5 ${toneClass}`}>{children}</span>;
}

function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-3xl border border-border bg-white p-6 shadow-[0_8px_28px_rgba(43,43,43,0.03)] sm:p-8">
      <h2 className="text-2xl font-bold tracking-tight text-text">{title}</h2>
      <div className="mt-4 text-base leading-8 text-text/75">{children}</div>
    </section>
  );
}

function SampleJobDetailPage({ job }: { job: FeaturedJob }) {
  if (!job.detail || !job.externalUrl) notFound();

  return (
    <Container className="py-10 sm:py-14 lg:py-16">
      <nav aria-label="パンくず" className="text-sm text-text/60">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="rounded-md text-primary outline-none hover:underline focus:ring-4 focus:ring-primary/15">
              ホーム
            </Link>
          </li>
          <li aria-hidden="true">＞</li>
          <li>注目の仕事</li>
          <li aria-hidden="true">＞</li>
          <li aria-current="page" className="font-semibold text-text/75">
            {job.title}
          </li>
        </ol>
      </nav>

      <header className="mt-8 rounded-[2rem] border border-border bg-white p-6 shadow-[0_18px_54px_rgba(47,125,122,0.07)] sm:p-8 lg:p-10">
        <p className="text-sm font-semibold tracking-[0.2em] text-primary">JOB DETAIL</p>
        <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight tracking-tight text-text sm:text-4xl lg:text-5xl">{job.title}</h1>
        <p className="mt-4 text-lg font-semibold text-primary">{job.companyName}</p>
        <div className="mt-6 flex flex-wrap gap-2.5" aria-label="社会課題タグ">
          {job.supportAreas.map((area) => (
            <DetailTag key={area} tone="primary">
              {area}
            </DetailTag>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2.5" aria-label="求人の補足情報">
          <DetailTag>{job.itCategory}</DetailTag>
          <DetailTag tone="accent">{job.workStyle}</DetailTag>
          <DetailTag>{job.employmentType}</DetailTag>
          <DetailTag>{job.location}</DetailTag>
        </div>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-text/75">{job.summary}</p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <main className="min-w-0 space-y-6">
          <DetailSection title="この仕事について">
            <p>{job.detail.about}</p>
          </DetailSection>
          <DetailSection title="関わる社会課題">
            <p>{job.detail.socialIssue}</p>
          </DetailSection>
          <DetailSection title="主な仕事内容">
            <ul className="list-disc space-y-2 pl-6">
              {job.detail.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </DetailSection>
          <DetailSection title="使用技術">
            <ul className="flex flex-wrap gap-2.5">
              {job.detail.technologies.map((technology) => (
                <li key={technology}>
                  <DetailTag>{technology}</DetailTag>
                </li>
              ))}
            </ul>
          </DetailSection>
        </main>

        <aside className="min-w-0 space-y-6">
          <section className="rounded-3xl border border-border bg-white p-6 shadow-[0_8px_28px_rgba(43,43,43,0.03)]">
            <h2 className="text-xl font-bold text-text">募集情報の整理</h2>
            <dl className="mt-5 grid gap-4 text-sm leading-6 text-text/70">
              <div><dt className="font-semibold text-text">勤務地</dt><dd className="mt-1">{job.location}</dd></div>
              <div><dt className="font-semibold text-text">雇用形態</dt><dd className="mt-1">{job.employmentType}</dd></div>
              <div><dt className="font-semibold text-text">働き方</dt><dd className="mt-1">{job.workStyle}</dd></div>
              <div><dt className="font-semibold text-text">給与</dt><dd className="mt-1">{job.detail.salary}</dd></div>
              <div><dt className="font-semibold text-text">IT職種</dt><dd className="mt-1">{job.itCategory}</dd></div>
            </dl>
          </section>

          <section className="rounded-3xl border border-primary/20 bg-white p-6 shadow-[0_12px_36px_rgba(47,125,122,0.07)]" aria-labelledby="external-job-link-title">
            <p className="text-sm font-semibold tracking-[0.18em] text-primary">SOURCE SITE</p>
            <h2 id="external-job-link-title" className="mt-3 text-xl font-bold text-text">元サイトで確認する</h2>
            <dl className="mt-5 grid gap-3 text-sm leading-6 text-text/70">
              <div><dt className="font-semibold text-text">元サイト名</dt><dd className="mt-1">{job.sourceSite}</dd></div>
              <div><dt className="font-semibold text-text">掲載確認日</dt><dd className="mt-1">{job.checkedAt}</dd></div>
              <div><dt className="font-semibold text-text">元求人URL</dt><dd className="mt-1 break-all">{job.externalUrl}</dd></div>
            </dl>
            {job.externalUrlNote && <p className="mt-4 rounded-2xl bg-background px-4 py-3 text-sm leading-6 text-text/65">{job.externalUrlNote}</p>}
            <a
              href={job.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-bold text-white outline-none transition hover:bg-primary/90 focus:ring-4 focus:ring-primary/25 focus:ring-offset-2 focus:ring-offset-background"
            >
              元の求人を見る <span aria-hidden="true" className="ml-2">↗</span>
            </a>
            <p className="mt-4 text-sm leading-6 text-text/65">求人の詳細・最新情報・応募条件は、元の掲載サイトでご確認ください。</p>
          </section>
        </aside>
      </div>
    </Container>
  );
}

export function generateStaticParams() {
  return [...jobs.map((job) => ({ slug: job.slug })), ...detailedFeaturedJobs.map((job) => ({ slug: job.id }))];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const featuredJob = getFeaturedJobById(slug);
  if (featuredJob) {
    return {
      title: `${featuredJob.title} | Glow Compass`,
      description: featuredJob.summary,
    };
  }

  const job = getJobBySlug(slug);
  return { title: job ? `${job.title} | 障害者支援IT Jobs` : "求人詳細" };
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const featuredJob = getFeaturedJobById(slug);
  if (featuredJob) return <SampleJobDetailPage job={featuredJob} />;

  const job = getJobBySlug(slug);
  if (!job) notFound();
  const company = getCompanyById(job.companyId);

  return (
    <Container className="py-10">
      <Link href="/jobs" className="text-sm font-semibold text-blue-700">← 求人一覧に戻る</Link>
      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap gap-2">{job.categories.map((category) => <Badge key={category}>{getCategoryName(category)}</Badge>)}</div>
        <h1 className="mt-5 max-w-4xl text-4xl font-bold">{job.title}</h1>
        {company && <Link href={`/companies/${company.slug}`} className="mt-3 inline-flex font-semibold text-blue-700">{company.name}</Link>}
        <p className="mt-5 max-w-3xl text-lg text-slate-600">{job.summary}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {job.isRemoteAvailable && <Badge tone="green">リモート可</Badge>}
          {job.allowsSideJob && <Badge tone="green">副業可</Badge>}
          {job.hasFlexibleHours && <Badge tone="green">フレックス</Badge>}
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">仕事内容</h2>
          <p className="mt-4 leading-8 text-slate-700">{job.description}</p>
          <h2 className="mt-8 text-2xl font-bold">必要スキル</h2>
          <div className="mt-4 flex flex-wrap gap-2">{job.requiredSkills.map((skill) => <Badge key={skill} tone="slate">{skill}</Badge>)}</div>
          <h2 className="mt-8 text-2xl font-bold">歓迎スキル</h2>
          <div className="mt-4 flex flex-wrap gap-2">{job.preferredSkills.map((skill) => <Badge key={skill} tone="slate">{skill}</Badge>)}</div>
          <h2 className="mt-8 text-2xl font-bold">関わる支援領域</h2>
          <div className="mt-4 flex flex-wrap gap-2">{job.supportAreas.map((area) => <Badge key={area} tone="slate">{supportAreaLabels[area]}</Badge>)}</div>
        </article>
        <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold">募集条件</h2>
          <dl className="mt-4 grid gap-3 text-sm text-slate-600">
            <div><dt className="font-semibold text-slate-900">職種</dt><dd>{jobRoleLabels[job.role]}</dd></div>
            <div><dt className="font-semibold text-slate-900">雇用形態</dt><dd>{employmentTypeLabels[job.employmentType]}</dd></div>
            <div><dt className="font-semibold text-slate-900">勤務地</dt><dd>{job.location}</dd></div>
            <div><dt className="font-semibold text-slate-900">給与</dt><dd>{job.salaryMin}万〜{job.salaryMax}万円 {job.salaryNote}</dd></div>
          </dl>
          <a href={job.applicationUrl} className="mt-6 inline-flex w-full justify-center rounded-full bg-blue-700 px-5 py-3 text-sm font-bold text-white" target="_blank" rel="noreferrer">応募ページへ進む</a>
        </aside>
      </section>
    </Container>
  );
}
