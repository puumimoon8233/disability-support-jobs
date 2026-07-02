import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { jobs } from "@/data/jobs";
import { getCompanyById, getJobBySlug } from "@/lib/data-helpers";
import { employmentTypeLabels, getCategoryName, jobRoleLabels, supportAreaLabels } from "@/lib/labels";

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  return { title: job ? `${job.title} | Glow Compass` : "求人詳細" };
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
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
