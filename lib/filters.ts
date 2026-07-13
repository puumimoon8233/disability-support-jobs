import { categories } from "@/data/categories";
import { companies } from "@/data/companies";
import { jobs } from "@/data/jobs";
import type { CategorySlug } from "@/types/category";
import type { Company } from "@/types/company";
import type { EmploymentType, Job, JobRole } from "@/types/job";
import { employmentTypeLabels, getCategoryName, jobRoleLabels, supportAreaLabels } from "./labels";

type SearchParams = Record<string, string | string[] | undefined>;
type FilterTarget = "jobs" | "companies";

type ActiveFilter = {
  key: string;
  label: string;
};

const categorySlugs = new Set<string>(categories.map((category) => category.slug));
const jobRoles = new Set(Object.keys(jobRoleLabels));
const employmentTypes = new Set(Object.keys(employmentTypeLabels));

const getValue = (params: SearchParams, key: string) => {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
};

const getTrimmedValue = (params: SearchParams, key: string) => getValue(params, key)?.trim();

const includesQuery = (values: Array<string | undefined>, query: string) => {
  const normalizedQuery = query.trim().toLowerCase();
  return values.filter(Boolean).join(" ").toLowerCase().includes(normalizedQuery);
};

const getValidCategory = (params: SearchParams) => {
  const category = getTrimmedValue(params, "category");
  return category && categorySlugs.has(category) ? (category as CategorySlug) : undefined;
};

const getValidJobRole = (params: SearchParams) => {
  const role = getTrimmedValue(params, "role");
  return role && jobRoles.has(role) ? (role as JobRole) : undefined;
};

const getValidEmploymentType = (params: SearchParams) => {
  const employmentType = getTrimmedValue(params, "employmentType");
  return employmentType && employmentTypes.has(employmentType) ? (employmentType as EmploymentType) : undefined;
};

const hasFlag = (params: SearchParams, key: string) => getValue(params, key) === "true";

export const hasActiveFilters = (params: SearchParams, target: FilterTarget) => getActiveFilters(params, target).length > 0;

export const getActiveFilters = (params: SearchParams, target: FilterTarget): ActiveFilter[] => {
  const keyword = getTrimmedValue(params, "q");
  const category = getValidCategory(params);
  const role = target === "jobs" ? getValidJobRole(params) : undefined;
  const employmentType = target === "jobs" ? getValidEmploymentType(params) : undefined;

  return [
    keyword ? { key: "q", label: keyword } : undefined,
    category ? { key: "category", label: getCategoryName(category) } : undefined,
    role ? { key: "role", label: jobRoleLabels[role] } : undefined,
    employmentType ? { key: "employmentType", label: employmentTypeLabels[employmentType] } : undefined,
    hasFlag(params, "remote") ? { key: "remote", label: "リモート可" } : undefined,
    hasFlag(params, "sideJob") ? { key: "sideJob", label: "副業可" } : undefined,
    hasFlag(params, "flex") ? { key: "flex", label: "フレックス" } : undefined,
  ].filter((item): item is ActiveFilter => Boolean(item));
};

export const filterCompanies = (params: SearchParams): Company[] => {
  const query = getTrimmedValue(params, "q");
  const selectedCategory = getValidCategory(params);
  const remote = hasFlag(params, "remote");
  const sideJob = hasFlag(params, "sideJob");
  const flex = hasFlag(params, "flex");

  return companies.filter((company) => {
    const categoryLabels = company.categories.map((category) => getCategoryName(category));
    if (query && !includesQuery([company.name, company.shortDescription, company.description, company.location, ...categoryLabels, ...company.supportAreas.map((area) => supportAreaLabels[area]), ...company.technologies], query)) return false;
    if (selectedCategory && !company.categories.includes(selectedCategory)) return false;
    if (remote && !company.isRemoteFriendly) return false;
    if (sideJob && !company.allowsSideJob) return false;
    if (flex && !company.hasFlexibleHours) return false;
    return true;
  });
};

export const filterJobs = (params: SearchParams): Job[] => {
  const query = getTrimmedValue(params, "q");
  const selectedCategory = getValidCategory(params);
  const selectedRole = getValidJobRole(params);
  const selectedEmploymentType = getValidEmploymentType(params);
  const remote = hasFlag(params, "remote");
  const sideJob = hasFlag(params, "sideJob");
  const flex = hasFlag(params, "flex");

  return jobs.filter((job) => {
    const company = companies.find((item) => item.id === job.companyId);
    const categoryLabels = job.categories.map((category) => getCategoryName(category));
    if (query && !includesQuery([job.title, job.summary, company?.name, jobRoleLabels[job.role], ...categoryLabels, ...job.supportAreas.map((area) => supportAreaLabels[area]), ...job.requiredSkills, ...job.preferredSkills], query)) return false;
    if (selectedCategory && !job.categories.includes(selectedCategory)) return false;
    if (selectedRole && job.role !== selectedRole) return false;
    if (selectedEmploymentType && job.employmentType !== selectedEmploymentType) return false;
    if (remote && !job.isRemoteAvailable) return false;
    if (sideJob && !job.allowsSideJob) return false;
    if (flex && !job.hasFlexibleHours) return false;
    return true;
  });
};
