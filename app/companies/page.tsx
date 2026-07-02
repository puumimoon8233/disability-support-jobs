import { CompanyCard } from "@/components/companies/CompanyCard";
import { Container } from "@/components/layout/Container";
import { FilterForm } from "@/components/search/FilterForm";
import { filterCompanies } from "@/lib/filters";

export default async function CompaniesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const filteredCompanies = filterCompanies(params);
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold">障害者支援に関わる企業を探す</h1>
      <p className="mt-3 text-slate-600">カテゴリや働き方で、ITを活用して障害者支援に取り組む企業を絞り込めます。</p>
      <div className="mt-8"><FilterForm basePath="/companies" searchParams={params} /></div>
      <p className="mt-6 text-sm text-slate-500">{filteredCompanies.length}件の企業</p>
      <div className="mt-4 grid gap-5 md:grid-cols-2">{filteredCompanies.map((company) => <CompanyCard key={company.id} company={company} />)}</div>
    </Container>
  );
}
