import Link from "next/link";
import { Container } from "./Container";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-slate-950">Glow Compass</Link>
        <nav className="flex gap-5 text-sm font-medium text-slate-700" aria-label="主要ナビゲーション">
          <Link href="/companies" className="hover:text-blue-700">企業を探す</Link>
          <Link href="/jobs" className="hover:text-blue-700">求人を探す</Link>
        </nav>
      </Container>
    </header>
  );
}
