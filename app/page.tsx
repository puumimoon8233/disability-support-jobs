import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { CompanyCard } from "@/components/companies/CompanyCard";
import { Container } from "@/components/layout/Container";
import { JobCard } from "@/components/jobs/JobCard";
import { categories } from "@/data/categories";
import { companies } from "@/data/companies";
import { jobs } from "@/data/jobs";

export default function Home() {
  return (
    <Container className="py-12">
      <Hero />

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
