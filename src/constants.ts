export type Step = {
  value: number;
  label: string;
};
export type Country = {
  code: string;
  label: string;
};
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
  isValid: boolean; // Form validity
}
