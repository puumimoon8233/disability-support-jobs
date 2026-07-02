import Link from "next/link";

const heroContent = {
  eyebrow: "障害福祉×ITの企業・求人をまとめて探せるサイト",
  serviceName: "Glow Compass",
  mainCopy: "あなたの技術が、誰かの支援になる。",
  description: "福祉DX、アクセシビリティ、就労支援、支援技術など、社会課題に向き合う企業・求人を見つけられるサービスです。",
};

export function Hero() {
  return (
    <section className="rounded-[2rem] bg-gradient-to-br from-blue-700 to-emerald-600 p-8 text-white md:p-14">
      <p className="text-sm font-semibold tracking-[0.18em] text-blue-100 md:text-base">{heroContent.eyebrow}</p>
      <h1 className="mt-4 text-5xl font-black leading-none tracking-tight md:text-7xl">{heroContent.serviceName}</h1>
      <p className="mt-5 max-w-3xl text-2xl font-bold leading-relaxed text-white md:text-4xl">{heroContent.mainCopy}</p>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-50">{heroContent.description}</p>
      <form action="/jobs" className="mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
        <input name="q" placeholder="キーワードで求人を検索" className="min-h-12 flex-1 rounded-full px-5 text-slate-900" />
        <button className="rounded-full bg-white px-6 py-3 font-bold text-blue-700">検索する</button>
      </form>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/jobs" className="rounded-full bg-white/15 px-5 py-3 font-semibold hover:bg-white/25">求人を探す</Link>
        <Link href="/companies" className="rounded-full bg-white/15 px-5 py-3 font-semibold hover:bg-white/25">企業を探す</Link>
      </div>
    </section>
  );
}
