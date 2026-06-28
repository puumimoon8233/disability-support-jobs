import type { CategorySlug } from "./category";

export type SupportArea =
  | "physical-disability"
  | "intellectual-disability"
  | "developmental-disability"
  | "mental-disability"
  | "children"
  | "support-workers";

export type Company = {
  id: string;
  slug: string;
  name: string;
  logoUrl?: string;
  websiteUrl?: string;
  shortDescription: string;
  description: string;
  categories: CategorySlug[];
  supportAreas: SupportArea[];
  technologies: string[];
  location?: string;
  isRemoteFriendly: boolean;
  allowsSideJob: boolean;
  hasFlexibleHours: boolean;
  foundedYear?: number;
  employeeCount?: string;
  createdAt: string;
  updatedAt: string;
};
