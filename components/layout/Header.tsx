import Link from "next/link";
import { Container } from "./Container";

export function Header() {
  return (
    <header className="border-b border-border bg-background/95">
      <Container className="flex h-20 items-center">
        <Link href="/" className="text-lg font-bold tracking-tight text-primary">
          Glow Compass
        </Link>
      </Container>
    </header>
  );
}
