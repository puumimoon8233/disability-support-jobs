import { Container } from "@/components/layout/Container";

export default function Home() {
  return (
    <Container className="py-20 sm:py-28 lg:py-32">
      <section className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-semibold tracking-[0.28em] text-primary uppercase">Glow Compass</p>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl">あなたの技術が、誰かの支援になる。</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-text/70 sm:text-xl">障害福祉×ITの仕事を横断して探せるまとめサイト</p>

        <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-4 rounded-[2rem] border border-border bg-white p-3 shadow-[0_20px_60px_rgba(47,125,122,0.08)] sm:flex-row sm:items-center">
          <div className="flex min-h-14 flex-1 items-center rounded-full bg-background px-6 text-left text-sm text-text/45 sm:text-base" aria-label="検索キーワード入力欄の見た目">
            キーワードや職種を入力
          </div>
          <button type="button" className="min-h-14 rounded-full bg-primary px-8 text-base font-semibold text-white transition-colors hover:bg-primary/90">
            仕事を探す
          </button>
        </div>
      </section>
    </Container>
  );
}
