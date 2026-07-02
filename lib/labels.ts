import { categoryNameBySlug } from "@/data/categories";
import type { CategorySlug } from "@/types/category";
import type { EmploymentType, JobRole } from "@/types/job";

export const getCategoryName = (slug: CategorySlug) => categoryNameBySlug[slug];

export const supportAreaLabels = {
  "physical-disability": "身体障害",
  "intellectual-disability": "知的障害",
  "developmental-disability": "発達障害",
  "mental-disability": "精神障害",
  children: "子ども",
  "support-workers": "支援者",
};

export const jobRoleLabels: Record<JobRole, string> = {
  "frontend-engineer": "フロントエンドエンジニア",
  "backend-engineer": "バックエンドエンジニア",
  "software-engineer": "ソフトウェアエンジニア",
  "product-manager": "PdM",
  designer: "デザイナー",
  "customer-success": "カスタマーサクセス",
};

export const employmentTypeLabels: Record<EmploymentType, string> = {
  "full-time": "正社員",
  contract: "契約社員",
  "part-time": "パート・アルバイト",
  freelance: "業務委託",
};
