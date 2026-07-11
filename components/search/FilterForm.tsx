import Link from "next/link";
import { categories } from "@/data/categories";

type FilterFormProps = {
  basePath: string;
  searchParams: Record<string, string | string[] | undefined>;
};

const valueOf = (params: FilterFormProps["searchParams"], key: string) => {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
};

export function FilterForm({ basePath, searchParams }: FilterFormProps) {
  const selectedCategory = valueOf(searchParams, "category") ?? "";

  return (
    <form action={basePath} className="rounded-3xl border border-border bg-background p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
        <label className="grid gap-2 text-sm font-semibold text-text/75">
          キーワード
          <input
            name="q"
            type="search"
            defaultValue={valueOf(searchParams, "q") ?? ""}
            placeholder="例: アクセシビリティ、Next.js、就労支援"
            className="min-h-12 w-full rounded-2xl border border-border bg-white px-4 py-3 text-base text-text outline-none transition placeholder:text-text/40 focus:border-primary focus:ring-4 focus:ring-primary/15"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-text/75">
          カテゴリ
          <select
            name="category"
            defaultValue={selectedCategory}
            className="min-h-12 w-full rounded-2xl border border-border bg-white px-4 py-3 text-base text-text outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
          >
            <option value="">すべて</option>
            {categories.map((category) => <option key={category.slug} value={category.slug}>{category.name}</option>)}
          </select>
        </label>
      </div>

      <fieldset className="mt-4">
        <legend className="text-sm font-semibold text-text/75">働き方</legend>
        <div className="mt-2 flex flex-wrap gap-3 text-sm text-text/70">
          <label className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-white px-3 py-2 font-medium outline-none focus-within:ring-4 focus-within:ring-primary/15">
            <input type="checkbox" name="remote" value="true" defaultChecked={valueOf(searchParams, "remote") === "true"} className="size-4 accent-primary" />
            リモート可
          </label>
          <label className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-white px-3 py-2 font-medium outline-none focus-within:ring-4 focus-within:ring-primary/15">
            <input type="checkbox" name="sideJob" value="true" defaultChecked={valueOf(searchParams, "sideJob") === "true"} className="size-4 accent-primary" />
            副業可
          </label>
          <label className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-white px-3 py-2 font-medium outline-none focus-within:ring-4 focus-within:ring-primary/15">
            <input type="checkbox" name="flex" value="true" defaultChecked={valueOf(searchParams, "flex") === "true"} className="size-4 accent-primary" />
            フレックス
          </label>
        </div>
      </fieldset>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <Link href={basePath} className="inline-flex min-h-12 items-center justify-center rounded-full border border-primary/25 bg-white px-5 text-sm font-bold text-primary outline-none transition hover:bg-primary/5 focus:ring-4 focus:ring-primary/15">
          条件をリセット
        </Link>
        <button className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-white outline-none transition hover:bg-primary/90 focus:ring-4 focus:ring-primary/25 focus:ring-offset-2 focus:ring-offset-background">
          絞り込む
        </button>
      </div>
    </form>
  );
}
