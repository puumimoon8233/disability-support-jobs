import { companies } from "@/data/companies";
import { jobs } from "@/data/jobs";

export const getCompanyById = (id: string) => companies.find((company) => company.id === id);
export const getCompanyBySlug = (slug: string) => companies.find((company) => company.slug === slug);
export const getJobBySlug = (slug: string) => jobs.find((job) => job.slug === slug);
export const getJobsByCompanyId = (companyId: string) => jobs.filter((job) => job.companyId === companyId);
