import { Container } from "@/components/layout/Container";

export default function Home() {
  return (
    <Container className="py-16 sm:py-24 lg:py-28">
      <section aria-labelledby="home-hero-title" className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">Glow Compass</p>
        <h1 id="home-hero-title" className="mt-6 text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl">
          あなたの技術が、誰かの<span className="decoration-accent decoration-4 underline-offset-8 sm:underline">支援</span>になる。
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-text/70 sm:text-xl">障害福祉×ITの仕事を横断して探せるまとめサイト</p>

        <div className="mx-auto mt-12 max-w-2xl rounded-[1.75rem] border border-border bg-white p-3 shadow-[0_16px_48px_rgba(47,125,122,0.06)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex-1 text-left">
              <label htmlFor="hero-search" className="sr-only">
                キーワードや社会課題から探す
              </label>
              <input
                id="hero-search"
                type="search"
                readOnly
                placeholder="キーワードや社会課題から探す"
                className="min-h-14 w-full rounded-full border border-transparent bg-background px-5 text-base text-text placeholder:text-text/45 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
                aria-describedby="hero-search-note"
              />
              <p id="hero-search-note" className="sr-only">
                検索機能は今後実装予定です。
              </p>
            </div>
            <button
              type="button"
              className="min-h-14 rounded-full bg-primary px-8 text-base font-semibold text-white outline-none transition-colors hover:bg-primary/90 focus:ring-4 focus:ring-primary/25 focus:ring-offset-2 focus:ring-offset-white"
            >
              仕事を探す
            </button>
          </div>
        </div>
      </section>
    </Container>
  );
}
