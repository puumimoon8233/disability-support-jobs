import type { Category } from "@/types/category";

export const categories: Category[] = [
  { slug: "employment-support", name: "就労支援", description: "障害のある人の就職・定着・キャリア形成を支援する領域。" },
  { slug: "welfare-dx", name: "福祉DX", description: "福祉事業所、支援者、行政向けの業務効率化・データ活用領域。" },
  { slug: "accessibility", name: "アクセシビリティ", description: "誰もが使いやすいWeb・アプリ・プロダクトをつくる領域。" },
  { slug: "assistive-technology", name: "支援技術", description: "コミュニケーション、移動、生活を支える技術領域。" },
  { slug: "mental-health", name: "メンタルヘルス", description: "精神障害、発達障害、メンタルケアに関わる領域。" },
  { slug: "education", name: "教育・療育", description: "特別支援教育、療育、学習支援に関わる領域。" },
];

export const categoryNameBySlug = Object.fromEntries(categories.map((category) => [category.slug, category.name])) as Record<Category["slug"], string>;
