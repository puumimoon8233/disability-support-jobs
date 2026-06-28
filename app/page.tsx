import Link from "next/link";
import { CompanyCard } from "@/components/companies/CompanyCard";
import { Container } from "@/components/layout/Container";
import { JobCard } from "@/components/jobs/JobCard";
import { categories } from "@/data/categories";
import { companies } from "@/data/companies";
import { jobs } from "@/data/jobs";

export default function Home() {
  return (
    <Container className="py-12">
      <section className="rounded-[2rem] bg-gradient-to-br from-blue-700 to-emerald-600 p-8 text-white md:p-14">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-100">Disability Support × IT</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">ITで、障害者支援に関わる仕事を探そう。</h1>
        <p className="mt-6 max-w-2xl text-lg text-blue-50">福祉DX、アクセシビリティ、就労支援、支援技術など、社会課題に向き合う企業・求人を見つけられるサービスです。</p>
        <form action="/jobs" className="mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
          <input name="q" placeholder="キーワードで求人を検索" className="min-h-12 flex-1 rounded-full px-5 text-slate-900" />
          <button className="rounded-full bg-white px-6 py-3 font-bold text-blue-700">検索する</button>
        </form>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/jobs" className="rounded-full bg-white/15 px-5 py-3 font-semibold hover:bg-white/25">求人を探す</Link>
          <Link href="/companies" className="rounded-full bg-white/15 px-5 py-3 font-semibold hover:bg-white/25">企業を探す</Link>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">カテゴリから探す</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {categories.map((category) => <Link key={category.slug} href={`/jobs?category=${category.slug}`} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md"><span className="font-bold text-slate-950">{category.name}</span><p className="mt-2 text-sm text-slate-600">{category.description}</p></Link>)}
        </div>
      </section>

      <section className="mt-12">
        <div className="flex items-end justify-between gap-4"><h2 className="text-2xl font-bold">注目求人</h2><Link href="/jobs" className="text-sm font-semibold text-blue-700">すべて見る</Link></div>
        <div className="mt-5 grid gap-5 md:grid-cols-2">{jobs.slice(0, 2).map((job) => <JobCard key={job.id} job={job} />)}</div>
      </section>

      <section className="mt-12">
        <div className="flex items-end justify-between gap-4"><h2 className="text-2xl font-bold">注目企業</h2><Link href="/companies" className="text-sm font-semibold text-blue-700">すべて見る</Link></div>
        <div className="mt-5 grid gap-5 md:grid-cols-2">{companies.slice(0, 2).map((company) => <CompanyCard key={company.id} company={company} />)}</div>
      </section>
    </Container>
  );
}
