import { Step } from "./types";

export const stepLabels: Step[] = [
  { value: 1, label: "Personal Info" },
  { value: 2, label: "Education" },
  { value: 3, label: "Work Experience" },
  { value: 4, label: "Others" },
  { value: 5, label: "Customize design" },
];
export interface FormState {
  fields: { [key: string]: string }; // Field values
  errors: { [key: string]: string }; // Field errors
  isValid: boolean;
}

export const months = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

export const languageLevels = [
  { value: 1, label: "A1 or basic" },
  { value: 2, label: "A2 or upper elementary" },
  { value: 3, label: "B1 or medium" },
  { value: 4, label: "B2 or medium-high" },
  { value: 5, label: "C1 or advanced" },
  { value: 6, label: "C2 or proficient" },
  { value: 7, label: "Native" },
];

export enum TemplateTypes {
  ONE_COLUMN = "1col",
  TWO_COLUMNS = "2col",
}

export const MY_LINKEDIN_PROFILE =
  "https://www.linkedin.com/in/ignacio-santos-alonso-90b1b633/";
