import { Container } from "@/components/layout/Container";
import { CompanyCard } from "@/components/companies/CompanyCard";
import { FeaturedJobCard } from "@/components/jobs/FeaturedJobCard";
import { featuredJobs } from "@/data/featuredJobs";
import { sampleCompanies } from "@/data/sampleCompanies";

const popularTags = [
  "React",
  "フロントエンド",
  "バックエンド",
  "PM",
  "リモート可",
  "副業可",
  "福祉DX",
  "就労支援",
  "発達障害支援",
  "精神障害支援",
  "教育",
  "医療",
];

const socialIssues = [
  { title: "就労支援", description: "働きたい気持ちに寄り添う仕組みづくり" },
  { title: "発達障害支援", description: "特性を理解し、力を発揮できる環境を支える" },
  { title: "精神障害支援", description: "安心して回復と挑戦を続けられる支援へ" },
  { title: "教育", description: "学びの選択肢を広げるサービス開発" },
  { title: "医療", description: "ケアの現場と利用者をつなぐIT活用" },
  { title: "NPO", description: "地域や社会に根ざした活動を技術で後押し" },
];

const jobTypes = ["Frontend", "Backend", "Full Stack", "UI/UX", "PM", "インフラ", "DevOps", "QA"];

export default function Home() {
  return (
    <Container className="py-16 sm:py-24 lg:py-28">
      <div className="space-y-20 sm:space-y-24">
        <section aria-labelledby="home-hero-title" className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">Glow Compass</p>
          <h1 id="home-hero-title" className="mt-6 text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl">
            あなたの技術が、誰かの<span className="decoration-accent decoration-4 underline-offset-8 sm:underline">支援</span>になる。
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-text/70 sm:text-xl">障害福祉×ITの仕事を横断して探せるまとめサイト</p>
        </section>

        <section aria-labelledby="search-first-view-title" className="mx-auto max-w-5xl">
          <div className="rounded-[2rem] border border-border bg-white p-6 shadow-[0_18px_54px_rgba(47,125,122,0.08)] sm:p-8 lg:p-10">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold tracking-[0.2em] text-primary">SEARCH</p>
              <h2 id="search-first-view-title" className="mt-3 text-2xl font-bold tracking-tight text-text sm:text-3xl">
                どんな仕事を探しますか？
              </h2>
              <p className="mt-4 text-base leading-7 text-text/70">技術、領域、働き方から、支援につながる仕事を見つけてみましょう。</p>
            </div>

            <div className="mx-auto mt-8 max-w-3xl">
              <div className="rounded-[1.5rem] border border-border bg-background p-2 shadow-inner shadow-primary/5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex-1">
                    <label htmlFor="home-search" className="sr-only">
                      探したい仕事のキーワード
                    </label>
                    <input
                      id="home-search"
                      type="search"
                      readOnly
                      placeholder="React、就労支援、リモート..."
                      className="min-h-14 w-full rounded-2xl border border-transparent bg-white px-5 text-base text-text placeholder:text-text/45 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
                      aria-describedby="home-search-note"
                    />
                    <p id="home-search-note" className="sr-only">
                      検索機能は今後実装予定です。
                    </p>
                  </div>
                  <button
                    type="button"
                    className="min-h-14 rounded-2xl bg-primary px-8 text-base font-semibold text-white outline-none transition hover:-translate-y-0.5 hover:bg-primary/90 focus:ring-4 focus:ring-primary/25 focus:ring-offset-2 focus:ring-offset-background"
                  >
                    仕事を探す
                  </button>
                </div>
              </div>

              <div className="mt-6" aria-labelledby="popular-tags-title">
                <h3 id="popular-tags-title" className="text-sm font-semibold text-text">
                  人気タグ
                </h3>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {popularTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className="rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-sm font-medium text-primary outline-none transition hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/10 focus:ring-4 focus:ring-primary/15"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="social-issues-title">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-primary">SOCIAL ISSUE</p>
              <h2 id="social-issues-title" className="mt-3 text-2xl font-bold tracking-tight text-text sm:text-3xl">
                社会課題から探す
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-text/70">関心のある支援領域から、あなたの技術が活きる場所を探せます。</p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {socialIssues.map((issue) => (
              <button
                key={issue.title}
                type="button"
                className="group flex min-h-36 w-full flex-col justify-between rounded-3xl border border-border bg-white p-6 text-left shadow-[0_10px_32px_rgba(43,43,43,0.04)] outline-none transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(47,125,122,0.1)] focus:ring-4 focus:ring-primary/15"
              >
                <span>
                  <span className="block text-lg font-bold text-text">{issue.title}</span>
                  <span className="mt-3 block text-sm leading-6 text-text/65">{issue.description}</span>
                </span>
                <span className="mt-5 self-end text-xl text-primary transition group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </button>
            ))}
          </div>
        </section>

        <section aria-labelledby="job-types-title">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-primary">ROLE</p>
              <h2 id="job-types-title" className="mt-3 text-2xl font-bold tracking-tight text-text sm:text-3xl">
                IT職種から探す
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-text/70">得意な職種やこれから挑戦したい役割から探せます。</p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {jobTypes.map((jobType) => (
              <button
                key={jobType}
                type="button"
                className="rounded-3xl border border-border bg-white px-5 py-6 text-left text-base font-semibold text-text shadow-[0_10px_32px_rgba(43,43,43,0.04)] outline-none transition hover:-translate-y-1 hover:border-primary/30 hover:text-primary hover:shadow-[0_16px_40px_rgba(47,125,122,0.1)] focus:ring-4 focus:ring-primary/15 sm:text-lg"
              >
                {jobType}
              </button>
            ))}
          </div>
        </section>

        <section aria-labelledby="featured-companies-title">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-primary">COMPANIES</p>
              <h2 id="featured-companies-title" className="mt-3 text-2xl font-bold tracking-tight text-text sm:text-3xl">
                掲載企業
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-text/70">障害福祉や社会課題にITで取り組む企業を紹介します。</p>
          </div>

          <ul className="mt-8 grid gap-5 lg:grid-cols-3">
            {sampleCompanies.map((company) => (
              <li key={company.id} className="min-w-0">
                <CompanyCard company={company} />
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="featured-jobs-title">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-primary">FEATURED JOBS</p>
              <h2 id="featured-jobs-title" className="mt-3 text-2xl font-bold tracking-tight text-text sm:text-3xl">
                注目の仕事
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-text/70">障害福祉の現場をITで支える仕事を紹介します。</p>
          </div>

          <ul className="mt-8 grid gap-5 lg:grid-cols-3">
            {featuredJobs.map((job) => (
              <li key={`${job.companyName}-${job.title}`} className="min-w-0">
                <FeaturedJobCard job={job} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Container>
  );
}
