import Link from "next/link";
import { Container } from "./Container";
import { HeaderNavigation } from "./HeaderNavigation";

export function Header() {
  return (
    <header className="border-b border-border bg-background/95">
      <Container className="flex min-h-18 items-center justify-between gap-4 py-3 sm:min-h-20">
        <Link
          href="/"
          className="shrink-0 rounded-md text-lg font-bold tracking-tight text-primary outline-none transition-colors hover:text-primary/80 focus-visible:ring-4 focus-visible:ring-primary/15 sm:text-xl"
        >
          Glow Compass
        </Link>
        <HeaderNavigation />
      </Container>
    </header>
  );
}
