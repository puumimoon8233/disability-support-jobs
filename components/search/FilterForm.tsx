"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { categories } from "@/data/categories";
import { employmentTypeLabels, jobRoleLabels } from "@/lib/labels";
import { hasActiveFilters } from "@/lib/filters";

type FilterTarget = "jobs" | "companies";

type FilterFormProps = {
  basePath: string;
  searchParams: Record<string, string | string[] | undefined>;
  target: FilterTarget;
};

const valueOf = (params: FilterFormProps["searchParams"], key: string) => {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
};

const fieldClass = "min-h-12 w-full rounded-2xl border border-border bg-white px-4 py-3 text-base text-text outline-none transition placeholder:text-text/40 focus:border-primary focus:ring-4 focus:ring-primary/15";
const checkboxClass = "inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-white px-3 py-2 font-medium outline-none focus-within:ring-4 focus-within:ring-primary/15";

export function FilterForm({ basePath, searchParams, target }: FilterFormProps) {
  const router = useRouter();
  const selectedCategory = valueOf(searchParams, "category") ?? "";
  const selectedRole = valueOf(searchParams, "role") ?? "";
  const selectedEmploymentType = valueOf(searchParams, "employmentType") ?? "";
  const hasFilters = hasActiveFilters(searchParams, target);
  const isJobs = target === "jobs";

  return (
    <form
      action={basePath}
      className="rounded-3xl border border-border bg-background p-4 sm:p-5"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const params = new URLSearchParams();

        for (const [key, value] of formData.entries()) {
          const text = String(value).trim();
          if (text) params.set(key, text);
        }

        const query = params.toString();
        router.push(query ? `${basePath}?${query}` : basePath);
      }}
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-text/75 lg:col-span-2">
          キーワード
          <input
            name="q"
            type="search"
            defaultValue={valueOf(searchParams, "q")?.trim() ?? ""}
            placeholder={isJobs ? "例: React、フロントエンド、就労支援" : "例: SaaS、東京都、福祉DX"}
            className={fieldClass}
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-text/75">
          {isJobs ? "社会課題" : "事業カテゴリ"}
          <select name="category" defaultValue={selectedCategory} className={fieldClass}>
            <option value="">すべて</option>
            {categories.map((category) => <option key={category.slug} value={category.slug}>{category.name}</option>)}
          </select>
        </label>

        {isJobs && (
          <label className="grid gap-2 text-sm font-semibold text-text/75">
            IT職種
            <select name="role" defaultValue={selectedRole} className={fieldClass}>
              <option value="">すべて</option>
              {Object.entries(jobRoleLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
        )}

        {isJobs && (
          <label className="grid gap-2 text-sm font-semibold text-text/75">
            雇用形態
            <select name="employmentType" defaultValue={selectedEmploymentType} className={fieldClass}>
              <option value="">すべて</option>
              {Object.entries(employmentTypeLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
        )}
      </div>

      <fieldset className="mt-4">
        <legend className="text-sm font-semibold text-text/75">働き方</legend>
        <div className="mt-2 flex flex-wrap gap-3 text-sm text-text/70">
          <label className={checkboxClass}>
            <input type="checkbox" name="remote" value="true" defaultChecked={valueOf(searchParams, "remote") === "true"} className="size-4 accent-primary" />
            リモート可
          </label>
          {target === "companies" && (
            <label className={checkboxClass}>
              <input type="checkbox" name="sideJob" value="true" defaultChecked={valueOf(searchParams, "sideJob") === "true"} className="size-4 accent-primary" />
              副業可
            </label>
          )}
          <label className={checkboxClass}>
            <input type="checkbox" name="flex" value="true" defaultChecked={valueOf(searchParams, "flex") === "true"} className="size-4 accent-primary" />
            フレックス
          </label>
        </div>
      </fieldset>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        {hasFilters && (
          <Link href={basePath} className="inline-flex min-h-12 items-center justify-center rounded-full border border-primary/25 bg-white px-5 text-sm font-bold text-primary outline-none transition hover:bg-primary/5 focus:ring-4 focus:ring-primary/15">
            条件をリセット
          </Link>
        )}
        <button className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-white outline-none transition hover:bg-primary/90 focus:ring-4 focus:ring-primary/25 focus:ring-offset-2 focus:ring-offset-background">
          絞り込む
        </button>
      </div>
    </form>
  );
}
