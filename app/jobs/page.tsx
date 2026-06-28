import { Container } from "@/components/layout/Container";
import { JobCard } from "@/components/jobs/JobCard";
import { FilterForm } from "@/components/search/FilterForm";
import { filterJobs } from "@/lib/filters";

export default async function JobsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const filteredJobs = filterJobs(params);
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold">障害者支援に関わるIT求人を探す</h1>
      <p className="mt-3 text-slate-600">キーワード、カテゴリ、リモート可・副業可・フレックスで求人を絞り込めます。</p>
      <div className="mt-8"><FilterForm basePath="/jobs" searchParams={params} /></div>
      <p className="mt-6 text-sm text-slate-500">{filteredJobs.length}件の求人</p>
      <div className="mt-4 grid gap-5 md:grid-cols-2">{filteredJobs.map((job) => <JobCard key={job.id} job={job} />)}</div>
    </Container>
  );
}
