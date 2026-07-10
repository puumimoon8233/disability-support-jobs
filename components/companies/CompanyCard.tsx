import { getCategoryName, supportAreaLabels } from "@/lib/labels";
import type { Company, CompanyCardProfile } from "@/types/company";

type CompanyCardProps = {
  company: CompanyCardProfile | Company;
};

function getInitial(name: string) {
  return name.trim().slice(0, 1);
}

function formatCompany(
  company: CompanyCardProfile | Company,
): CompanyCardProfile {
  if ("businessArea" in company) return company;

  const workStyles = [
    company.isRemoteFriendly ? "リモート可" : undefined,
    company.hasFlexibleHours ? "フレックス" : undefined,
    company.allowsSideJob ? "副業可" : undefined,
  ].filter((style): style is string => Boolean(style));

  return {
    id: company.id,
    name: company.name,
    description: company.shortDescription,
    businessArea: company.categories
      .map((category) => getCategoryName(category))
      .join("・"),
    supportAreas: company.supportAreas.map((area) => supportAreaLabels[area]),
    technologyRole: company.description,
    workStyles,
    location: company.location ?? "未設定",
    organizationType: "企業",
    foundedYear: company.foundedYear ?? 0,
    openJobCount: 0,
  };
}

function TagList({
  label,
  tags,
  tone,
}: {
  label: string;
  tags: string[];
  tone: "issue" | "work";
}) {
  const toneClass =
    tone === "issue"
      ? "border-primary/20 bg-primary/5 text-primary"
      : "border-accent/40 bg-accent/10 text-text";

  return (
    <div>
      <p className="text-xs font-bold tracking-[0.14em] text-text/55">
        {label}
      </p>
      <ul className="mt-2 flex flex-wrap gap-2" aria-label={label}>
        {tags.map((tag) => (
          <li key={tag}>
            <span
              className={`inline-flex min-h-8 items-center rounded-full border px-3 py-1 text-sm font-semibold leading-5 ${toneClass}`}
            >
              {tag}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CompanyCard({ company: rawCompany }: CompanyCardProps) {
  const company = formatCompany(rawCompany);

  return (
    <article className="flex h-full min-w-0 flex-col rounded-3xl border border-border bg-white p-6 shadow-[0_8px_28px_rgba(43,43,43,0.03)] sm:p-7">
      <div className="flex items-start gap-4">
        <div
          className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-primary/15 bg-primary/5 text-lg font-bold text-primary"
          aria-hidden="true"
        >
          {getInitial(company.name)}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-primary">
            {company.businessArea}
          </p>
          <h3 className="mt-1 text-xl font-bold leading-tight tracking-tight text-text">
            {company.name}
          </h3>
        </div>
      </div>

      <p className="mt-5 text-base leading-7 text-text/75">
        {company.description}
      </p>

      <div className="mt-6 grid gap-5">
        <TagList
          label="取り組む社会課題"
          tags={company.supportAreas}
          tone="issue"
        />

        <div>
          <p className="text-xs font-bold tracking-[0.14em] text-text/55">
            ITとの関わり
          </p>
          <p className="mt-2 rounded-2xl border border-border bg-background px-4 py-3 text-sm leading-7 text-text/75">
            {company.technologyRole}
          </p>
        </div>

        <TagList label="主な働き方" tags={company.workStyles} tone="work" />
      </div>

      <div className="mt-auto pt-6">
        <p className="text-sm font-semibold text-text/70">
          掲載中の求人{" "}
          <span className="text-base font-bold text-text">
            {company.openJobCount}
          </span>
          件
        </p>
        <dl className="mt-4 grid gap-2 border-t border-border pt-4 text-sm text-text/65 sm:grid-cols-3">
          <div>
            <dt className="font-semibold text-text">所在地</dt>
            <dd className="mt-1">{company.location}</dd>
          </div>
          <div>
            <dt className="font-semibold text-text">企業種別</dt>
            <dd className="mt-1">{company.organizationType}</dd>
          </div>
          <div>
            <dt className="font-semibold text-text">設立</dt>
            <dd className="mt-1">
              {company.foundedYear ? `${company.foundedYear}年` : "未設定"}
            </dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
