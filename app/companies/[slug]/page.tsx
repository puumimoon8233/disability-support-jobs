import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/layout/Container";
import { JobCard } from "@/components/jobs/JobCard";
import { companies } from "@/data/companies";
import { getCompanyBySlug, getJobsByCompanyId } from "@/lib/data-helpers";
import { getCategoryName, supportAreaLabels } from "@/lib/labels";

export function generateStaticParams() {
  return companies.map((company) => ({ slug: company.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  return { title: company ? `${company.name} | 障害者支援IT Jobs` : "企業詳細" };
}

export default async function CompanyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  if (!company) notFound();
  const companyJobs = getJobsByCompanyId(company.id);

  return (
    <Container className="py-10">
      <Link href="/companies" className="text-sm font-semibold text-blue-700">← 企業一覧に戻る</Link>
      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap gap-2">{company.categories.map((category) => <Badge key={category}>{getCategoryName(category)}</Badge>)}</div>
        <h1 className="mt-5 text-4xl font-bold">{company.name}</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-600">{company.shortDescription}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {company.isRemoteFriendly && <Badge tone="green">リモート可</Badge>}
          {company.allowsSideJob && <Badge tone="green">副業可</Badge>}
          {company.hasFlexibleHours && <Badge tone="green">フレックス</Badge>}
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">企業概要</h2>
          <p className="mt-4 leading-8 text-slate-700">{company.description}</p>
          <h3 className="mt-8 font-bold">使用技術</h3>
          <div className="mt-3 flex flex-wrap gap-2">{company.technologies.map((tech) => <Badge key={tech} tone="slate">{tech}</Badge>)}</div>
          <h3 className="mt-8 font-bold">支援領域</h3>
          <div className="mt-3 flex flex-wrap gap-2">{company.supportAreas.map((area) => <Badge key={area} tone="slate">{supportAreaLabels[area]}</Badge>)}</div>
        </div>
        <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold">基本情報</h2>
          <dl className="mt-4 grid gap-3 text-sm text-slate-600">
            <div><dt className="font-semibold text-slate-900">所在地</dt><dd>{company.location}</dd></div>
            <div><dt className="font-semibold text-slate-900">設立</dt><dd>{company.foundedYear}年</dd></div>
            <div><dt className="font-semibold text-slate-900">従業員数</dt><dd>{company.employeeCount}</dd></div>
          </dl>
          {company.websiteUrl && <a href={company.websiteUrl} className="mt-6 inline-flex rounded-full bg-blue-700 px-5 py-3 text-sm font-bold text-white" target="_blank" rel="noreferrer">公式サイトを見る</a>}
        </aside>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">掲載求人</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">{companyJobs.map((job) => <JobCard key={job.id} job={job} />)}</div>
      </section>
    </Container>
  );
}
