import PersonalInfoForm from "./PersonalInfoForm";
import EducationForm from "./components/EducationForm";
import WorkExperienceForm from "./components/WorkExperienceForm";
export const stepComponents = [
    { step: 1, component: PersonalInfoForm },
    { step: 2, component: EducationForm },
    { step: 3, component: WorkExperienceForm },
    { step: 4, component: OptionalSectionsForm },
    { step: 5, component: DesignAndDownload },
];
