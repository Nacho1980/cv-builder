import React from "react";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import EducationForm from "./forms/EducationForm";
import ExperienceForm from "./forms/ExperienceForm";
import OptionalSectionsForm from "./forms/OptionalSectionsForm";
import DesignAndDownload from "./DesignAndDownload";

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
