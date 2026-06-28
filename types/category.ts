export type CategorySlug =
  | "employment-support"
  | "welfare-dx"
  | "accessibility"
  | "assistive-technology"
  | "mental-health"
  | "education";

export type Category = {
  slug: CategorySlug;
  name: string;
  description: string;
};
