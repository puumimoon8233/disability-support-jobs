import { companies } from "@/data/companies";
import { jobs } from "@/data/jobs";
import type { CategorySlug } from "@/types/category";
import type { Company } from "@/types/company";
import type { Job } from "@/types/job";

type SearchParams = Record<string, string | string[] | undefined>;

const getValue = (params: SearchParams, key: string) => {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
};

const includesQuery = (values: Array<string | undefined>, query: string) =>
  values.filter(Boolean).join(" ").toLowerCase().includes(query.toLowerCase());

const parseCategories = (params: SearchParams) =>
  getValue(params, "category")?.split(",").filter(Boolean) as CategorySlug[] | undefined;

const hasFlag = (params: SearchParams, key: string) => getValue(params, key) === "true";

export const filterCompanies = (params: SearchParams): Company[] => {
  const query = getValue(params, "q")?.trim();
  const selectedCategories = parseCategories(params);
  const remote = hasFlag(params, "remote");
  const sideJob = hasFlag(params, "sideJob");
  const flex = hasFlag(params, "flex");

  return companies.filter((company) => {
    if (query && !includesQuery([company.name, company.shortDescription, company.description, company.location, ...company.technologies], query)) return false;
    if (selectedCategories?.length && !selectedCategories.some((category) => company.categories.includes(category))) return false;
    if (remote && !company.isRemoteFriendly) return false;
    if (sideJob && !company.allowsSideJob) return false;
    if (flex && !company.hasFlexibleHours) return false;
    return true;
  });
};

export const filterJobs = (params: SearchParams): Job[] => {
  const query = getValue(params, "q")?.trim();
  const selectedCategories = parseCategories(params);
  const remote = hasFlag(params, "remote");
  const sideJob = hasFlag(params, "sideJob");
  const flex = hasFlag(params, "flex");

  return jobs.filter((job) => {
    const company = companies.find((item) => item.id === job.companyId);
    if (query && !includesQuery([job.title, job.summary, job.description, company?.name, job.location, ...job.requiredSkills, ...job.preferredSkills], query)) return false;
    if (selectedCategories?.length && !selectedCategories.some((category) => job.categories.includes(category))) return false;
    if (remote && !job.isRemoteAvailable) return false;
    if (sideJob && !job.allowsSideJob) return false;
    if (flex && !job.hasFlexibleHours) return false;
    return true;
  });
};
