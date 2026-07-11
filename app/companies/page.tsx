import type { Metadata } from "next";
import Link from "next/link";
import { CompanyCard } from "@/components/companies/CompanyCard";
import { Container } from "@/components/layout/Container";
import { FilterForm } from "@/components/search/FilterForm";
import { getJobsByCompanyId } from "@/lib/data-helpers";
import { filterCompanies, getActiveFilters } from "@/lib/filters";

export const metadata: Metadata = {
  title: "障害福祉にITで取り組む企業を探す | Glow Compass",
  description:
    "社会課題、事業領域、働き方などの条件から、障害福祉にITで取り組む企業や団体を探せます。",
};

type CompaniesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CompaniesPage({
  searchParams,
}: CompaniesPageProps) {
  const params = await searchParams;
  const filteredCompanies = filterCompanies(params);
  const activeFilters = getActiveFilters(params, "companies");
  const resultLabel =
    filteredCompanies.length === 0
      ? "条件に一致する企業は見つかりませんでした"
      : `${filteredCompanies.length}件の企業が見つかりました`;

  return (
    <Container className="py-10 sm:py-14 lg:py-16">
      <nav aria-label="パンくず" className="text-sm text-text/60">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link
              href="/"
              className="rounded-md text-primary outline-none hover:underline focus:ring-4 focus:ring-primary/15"
            >
              ホーム
            </Link>
          </li>
          <li aria-hidden="true">＞</li>
          <li aria-current="page" className="font-semibold text-text/75">
            企業を探す
          </li>
        </ol>
      </nav>

      <header className="mt-8 max-w-3xl">
        <p className="text-sm font-semibold tracking-[0.2em] text-primary">
          COMPANIES
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl">
          障害福祉にITで取り組む企業を探す
        </h1>
        <p className="mt-5 text-base leading-8 text-text/70 sm:text-lg">
          社会課題、事業領域、働き方などの条件から、障害福祉にITで取り組む企業や団体を探せます。
        </p>
      </header>

      <section
        aria-labelledby="company-search-title"
        className="mt-8 rounded-[2rem] border border-border bg-white p-5 shadow-sm sm:p-6 lg:p-8"
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="company-search-title" className="text-xl font-bold text-text">
              検索・絞り込み
            </h2>
            <p className="mt-2 text-sm leading-6 text-text/65">
              キーワードと既存の条件で、掲載中の企業・団体を絞り込めます。
            </p>
          </div>
        </div>
        <div className="mt-5">
          <FilterForm basePath="/companies" searchParams={params} target="companies" />
        </div>
      </section>

      <section aria-labelledby="company-results-title" className="mt-8">
        <div className="rounded-3xl border border-border bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h2
                id="company-results-title"
                className="text-2xl font-bold tracking-tight text-text"
              >
                検索結果
              </h2>
              <p
                className="mt-2 text-base font-semibold text-text/75"
                aria-live="polite"
              >
                {resultLabel}
              </p>
            </div>
            {activeFilters.length > 0 && (
              <div className="lg:max-w-xl">
                <p className="text-sm font-semibold text-text/70">現在の検索条件</p>
                <ul
                  className="mt-2 flex flex-wrap gap-2"
                  aria-label="適用中の検索条件"
                >
                  {activeFilters.map((filter) => (
                    <li
                      key={filter.key}
                      className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-sm font-semibold text-primary"
                    >
                      {filter.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {filteredCompanies.length > 0 ? (
          <ul className="mt-5 grid gap-5 lg:grid-cols-2">
            {filteredCompanies.map((company) => (
              <li key={company.id} className="min-w-0">
                <CompanyCard
                  company={company}
                  openJobCount={getJobsByCompanyId(company.id).length}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div
            className="mt-5 rounded-3xl border border-border bg-white p-6 text-center shadow-sm sm:p-8"
            role="status"
          >
            <h2 className="text-xl font-bold text-text">
              条件に一致する企業が見つかりませんでした。
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-text/70">
              検索条件を変えて、もう一度お試しください。
            </p>
            <Link
              href="/companies"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full border border-primary/25 bg-white px-5 text-sm font-bold text-primary outline-none transition hover:bg-primary/5 focus:ring-4 focus:ring-primary/15"
            >
              条件をリセットする
            </Link>
          </div>
        )}
      </section>
    </Container>
  );
}
