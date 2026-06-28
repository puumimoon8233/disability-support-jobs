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
    <form action={basePath} className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[1fr_220px_auto]">
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        キーワード
        <input name="q" defaultValue={valueOf(searchParams, "q") ?? ""} placeholder="例: アクセシビリティ、Next.js、就労支援" className="rounded-2xl border border-slate-300 px-4 py-3" />
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        カテゴリ
        <select name="category" defaultValue={selectedCategory} className="rounded-2xl border border-slate-300 px-4 py-3">
          <option value="">すべて</option>
          {categories.map((category) => <option key={category.slug} value={category.slug}>{category.name}</option>)}
        </select>
      </label>
      <div className="flex flex-wrap items-end gap-3 text-sm text-slate-700">
        <label className="flex items-center gap-2"><input type="checkbox" name="remote" value="true" defaultChecked={valueOf(searchParams, "remote") === "true"} />リモート可</label>
        <label className="flex items-center gap-2"><input type="checkbox" name="sideJob" value="true" defaultChecked={valueOf(searchParams, "sideJob") === "true"} />副業可</label>
        <label className="flex items-center gap-2"><input type="checkbox" name="flex" value="true" defaultChecked={valueOf(searchParams, "flex") === "true"} />フレックス</label>
        <button className="rounded-full bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800">絞り込む</button>
      </div>
    </form>
  );
}
