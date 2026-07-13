"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { label: "仕事を探す", href: "/jobs", activePathPrefix: "/jobs" },
  { label: "企業を探す", href: "/companies", activePathPrefix: "/companies" },
];

function isActivePath(pathname: string, activePathPrefix: string) {
  return pathname === activePathPrefix || pathname.startsWith(`${activePathPrefix}/`);
}

export function HeaderNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="主要ナビゲーション" className="min-w-0">
      <ul className="flex items-center gap-1.5 sm:gap-2">
        {navigationItems.map((item) => {
          const isActive = isActivePath(pathname, item.activePathPrefix);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex min-h-11 items-center rounded-full px-3 py-2 text-sm font-semibold underline-offset-8 outline-none transition-colors hover:bg-primary/5 hover:text-primary focus-visible:ring-4 focus-visible:ring-primary/15 sm:px-4 sm:text-base ${
                  isActive ? "bg-primary/5 text-primary underline decoration-2" : "text-text/70"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
