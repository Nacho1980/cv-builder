export type Step = {
  value: number;
  label: string;
};
export type Country = {
  code: string;
  label: string;
};
export type LanguageItem = {
  language: string;
  level: number;
};
export type EducationItem = {
  year: string;
  center: string;
  degree: string;
};
export type ExperienceItem = {
  startDate: string;
  finishDate?: string;
  currentlyWorking?: boolean;
  companyName: string;
  positionName: string;
  summary: string;
};
