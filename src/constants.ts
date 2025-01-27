import DesignAndDownload from "./components/pages/DesignAndDownload";
import EducationForm from "./components/pages/EducationForm";
import ExperienceForm from "./components/pages/ExperienceForm";
import OptionalSectionsForm from "./components/pages/OptionalSectionsForm";
import PersonalInfoForm from "./components/pages/PersonalInfoForm";
import { Step } from "./types";

export const stepLabels: Step[] = [
  { value: 1, label: "Personal Info" },
  { value: 2, label: "Education" },
  { value: 3, label: "Work Experience" },
  { value: 4, label: "Additional" },
  { value: 5, label: "Customize design" },
];
interface StepComponent {
  step: number;
  component: React.FC;
}

export const stepComponents: StepComponent[] = [
  { step: 1, component: PersonalInfoForm },
  { step: 2, component: EducationForm },
  { step: 3, component: ExperienceForm },
  { step: 4, component: OptionalSectionsForm },
  { step: 5, component: DesignAndDownload },
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
  { value: 1, label: "A1" },
  { value: 2, label: "A2" },
  { value: 3, label: "B1" },
  { value: 4, label: "B2" },
  { value: 5, label: "C1" },
  { value: 6, label: "C2" },
  { value: 7, label: "Native" },
];

export enum TemplateTypes {
  ONE_COLUMN = "1col",
  TWO_COLUMNS = "2col",
}

export const MY_LINKEDIN_PROFILE =
  "https://www.linkedin.com/in/ignacio-santos-alonso-90b1b633/";
