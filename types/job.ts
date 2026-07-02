import type { CategorySlug } from "./category";
import type { SupportArea } from "./company";

export type JobRole =
  | "frontend-engineer"
  | "backend-engineer"
  | "software-engineer"
  | "product-manager"
  | "designer"
  | "customer-success";

export type EmploymentType = "full-time" | "contract" | "part-time" | "freelance";

export type Job = {
  id: string;
  slug: string;
  companyId: string;
  title: string;
  summary: string;
  description: string;
  role: JobRole;
  employmentType: EmploymentType;
  categories: CategorySlug[];
  supportAreas: SupportArea[];
  requiredSkills: string[];
  preferredSkills: string[];
  location?: string;
  isRemoteAvailable: boolean;
  allowsSideJob: boolean;
  hasFlexibleHours: boolean;
  salaryMin?: number;
  salaryMax?: number;
  salaryNote?: string;
  applicationUrl: string;
  publishedAt: string;
  updatedAt: string;
};
