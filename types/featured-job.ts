export type FeaturedJob = {
  id: string;
  title: string;
  companyName: string;
  sourceSite: string;
  location: string;
  employmentType: string;
  workStyle: string;
  itCategory: string;
  supportAreas: string[];
  technologyTags: string[];
  summary: string;
  checkedAt: string;
  detailPath?: string;
  externalUrl?: string;
  externalUrlNote?: string;
  detail?: {
    about: string;
    socialIssue: string;
    responsibilities: string[];
    technologies: string[];
    salary: string;
  };
};
