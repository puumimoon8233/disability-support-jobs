import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { JobCard } from "@/components/jobs/JobCard";
import { companies } from "@/data/companies";
import { getCompanyBySlug, getJobsByCompanyId } from "@/lib/data-helpers";
import { getCategoryName, supportAreaLabels } from "@/lib/labels";
import type { Company } from "@/types/company";

function DetailTag({ children, tone = "neutral" }: { children: ReactNode; tone?: "primary" | "accent" | "neutral" }) {
  const toneClass = {
    primary: "border-primary/20 bg-primary/5 text-primary",
    accent: "border-accent/40 bg-accent/10 text-text",
    neutral: "border-border bg-background text-text/75",
  }[tone];

  return (
    <span className={`inline-flex min-h-8 items-center rounded-full border px-3 py-1 text-sm font-semibold leading-5 ${toneClass}`}>
      {children}
    </span>
  );
}

function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-bold tracking-tight text-text">{title}</h2>
      <div className="mt-4 text-base leading-8 text-text/75">{children}</div>
    </section>
  );
}

function getBusinessAreas(company: Company) {
  return company.categories.map((category) => getCategoryName(category));
}

function getSupportAreas(company: Company) {
  return company.supportAreas.map((area) => supportAreaLabels[area]);
}

function getWorkStyles(company: Company) {
  return [
    company.isRemoteFriendly ? "リモート可" : undefined,
    company.hasFlexibleHours ? "フレックス可" : undefined,
    company.allowsSideJob ? "副業可" : undefined,
  ].filter((style): style is string => Boolean(style));
}

export function generateStaticParams() {
  return companies.map((company) => ({ slug: company.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);

  if (!company) {
    return { title: "企業詳細 | Glow Compass" };
  }

  return {
    title: `${company.name} | Glow Compass`,
    description: company.shortDescription,
  };
}

export default async function CompanyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  if (!company) notFound();

  const companyJobs = getJobsByCompanyId(company.id);
  const businessAreas = getBusinessAreas(company);
  const supportAreas = getSupportAreas(company);
  const workStyles = getWorkStyles(company);

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
          <li>
            <Link href="/companies" className="rounded-md text-primary outline-none hover:underline focus:ring-4 focus:ring-primary/15">
              企業を探す
            </Link>
          </li>
          <li aria-hidden="true">＞</li>
          <li aria-current="page" className="font-semibold text-text/75">
            {company.name}
          </li>
        </ol>
      </nav>

      <header className="mt-8 rounded-[2rem] border border-border bg-white p-6 shadow-sm sm:p-8 lg:p-10">
        <p className="text-sm font-semibold tracking-[0.2em] text-primary">{businessAreas.join("・")}</p>
        <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight tracking-tight text-text sm:text-4xl lg:text-5xl">
          {company.name}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-text/75">{company.shortDescription}</p>

        {supportAreas.length > 0 && (
          <div className="mt-7">
            <p className="text-xs font-bold tracking-[0.14em] text-text/55">取り組む社会課題</p>
            <ul className="mt-2 flex flex-wrap gap-2.5" aria-label="取り組む社会課題タグ">
              {supportAreas.map((area) => (
                <li key={area}>
                  <DetailTag tone="primary">{area}</DetailTag>
                </li>
              ))}
            </ul>
          </div>
        )}

        {workStyles.length > 0 && (
          <div className="mt-5">
            <p className="text-xs font-bold tracking-[0.14em] text-text/55">主な働き方</p>
            <ul className="mt-2 flex flex-wrap gap-2.5" aria-label="主な働き方タグ">
              {workStyles.map((style) => (
                <li key={style}>
                  <DetailTag tone="accent">{style}</DetailTag>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <main className="min-w-0 space-y-6">
          <DetailSection title="この企業について">
            <p>{company.description}</p>
          </DetailSection>

          <DetailSection title="取り組む社会課題">
            <p>既存データで整理されている支援領域と事業領域です。</p>
            <ul className="mt-4 flex flex-wrap gap-2.5" aria-label="支援領域と事業領域">
              {[...supportAreas, ...businessAreas].map((item) => (
                <li key={item}>
                  <DetailTag tone={supportAreas.includes(item) ? "primary" : "neutral"}>{item}</DetailTag>
                </li>
              ))}
            </ul>
          </DetailSection>

          <DetailSection title="ITとの関わり">
            <p>{company.description}</p>
            {company.technologies.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2.5" aria-label="使用技術">
                {company.technologies.map((technology) => (
                  <li key={technology}>
                    <DetailTag>{technology}</DetailTag>
                  </li>
                ))}
              </ul>
            )}
          </DetailSection>

          <DetailSection title="働き方">
            {workStyles.length > 0 ? (
              <ul className="flex flex-wrap gap-2.5" aria-label="働き方">
                {workStyles.map((style) => (
                  <li key={style}>
                    <DetailTag tone="accent">{style}</DetailTag>
                  </li>
                ))}
              </ul>
            ) : (
              <p>働き方に関する表示対象の情報はありません。</p>
            )}
          </DetailSection>

          <section className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-text">掲載中の求人</h2>
                <p className="mt-2 text-base leading-7 text-text/70">この企業に関連する求人を紹介します。</p>
              </div>
              {companyJobs.length > 0 && <p className="text-sm font-semibold text-text/65">{companyJobs.length}件</p>}
            </div>
            {companyJobs.length > 0 ? (
              <ul className="mt-5 grid gap-5 md:grid-cols-2">
                {companyJobs.map((job) => (
                  <li key={job.id} className="min-w-0">
                    <JobCard job={job} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 rounded-2xl border border-border bg-background px-4 py-4 text-base leading-7 text-text/70">
                現在掲載中の求人はありません。
              </p>
            )}
          </section>
        </main>

        <aside className="min-w-0 space-y-6">
          <section className="rounded-3xl border border-border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-text">基本情報</h2>
            <dl className="mt-5 grid gap-4 text-sm leading-6 text-text/70">
              {company.location && <div><dt className="font-semibold text-text">所在地</dt><dd className="mt-1">{company.location}</dd></div>}
              {company.foundedYear && <div><dt className="font-semibold text-text">設立年</dt><dd className="mt-1">{company.foundedYear}年</dd></div>}
              {businessAreas.length > 0 && <div><dt className="font-semibold text-text">主な事業領域</dt><dd className="mt-1">{businessAreas.join("・")}</dd></div>}
              {supportAreas.length > 0 && <div><dt className="font-semibold text-text">社会課題</dt><dd className="mt-1">{supportAreas.join("・")}</dd></div>}
              {workStyles.length > 0 && <div><dt className="font-semibold text-text">働き方</dt><dd className="mt-1">{workStyles.join("・")}</dd></div>}
              <div><dt className="font-semibold text-text">リモート可否</dt><dd className="mt-1">{company.isRemoteFriendly ? "可" : "不可"}</dd></div>
              <div><dt className="font-semibold text-text">フレックス可否</dt><dd className="mt-1">{company.hasFlexibleHours ? "可" : "不可"}</dd></div>
              <div><dt className="font-semibold text-text">副業可否</dt><dd className="mt-1">{company.allowsSideJob ? "可" : "不可"}</dd></div>
            </dl>
          </section>
        </aside>
      </div>

      <div className="mt-10">
        <Link href="/companies" className="rounded-md text-sm font-semibold text-primary outline-none hover:underline focus:ring-4 focus:ring-primary/15">
          企業一覧へ戻る
        </Link>
      </div>
    </Container>
  );
}
