"use client";

import { useRouter } from "next/navigation";

export function HomeSearchForm() {
  const router = useRouter();

  return (
    <form
      action="/jobs"
      method="get"
      className="rounded-[1.5rem] border border-border bg-background p-2 shadow-inner shadow-primary/5"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const keyword = String(formData.get("q") ?? "").trim();
        const params = new URLSearchParams();

        if (keyword) params.set("q", keyword);

        const query = params.toString();
        router.push(query ? `/jobs?${query}` : "/jobs");
      }}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <label htmlFor="home-search" className="sr-only">
            探したい仕事のキーワード
          </label>
          <input
            id="home-search"
            name="q"
            type="search"
            placeholder="React、就労支援、リモート..."
            className="min-h-14 w-full rounded-2xl border border-transparent bg-white px-5 text-base text-text placeholder:text-text/45 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
          />
        </div>
        <button
          type="submit"
          className="min-h-14 rounded-2xl bg-primary px-8 text-base font-semibold text-white outline-none transition hover:-translate-y-0.5 hover:bg-primary/90 focus:ring-4 focus:ring-primary/25 focus:ring-offset-2 focus:ring-offset-background"
        >
          仕事を探す
        </button>
      </div>
    </form>
  );
}
