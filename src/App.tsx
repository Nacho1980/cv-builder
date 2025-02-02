import { createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import AdditionalSectionsForm from "./components/pages/AdditionalSectionsForm";
import DesignAndDownload from "./components/pages/DesignAndDownload";
import EducationForm from "./components/pages/EducationForm";
import ExperienceForm from "./components/pages/ExperienceForm";
import PersonalDataForm from "./components/pages/PersonalDataForm";
import WelcomePage from "./components/pages/WelcomePage";
import { RootState } from "./store/store";

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const { isValid, fields } = useSelector(
    (state: RootState) => state.personalData
  );
  const { summary } = useSelector((state: RootState) => state.additionalData);
  const education = useSelector((state: RootState) => state.education);

  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: "lightblue",
            "&.Mui-focused": {
              backgroundColor: "lightblue", // Ensures background color when focused
            },
          },
        },
      },
    },
  });

  /*   // Get the component for the current step
  const currentStepComponent = stepComponents.find(
    (step) => step.step === currentStep
  );

  const nextStep = () => {
    if (currentStep < stepComponents.length) setCurrentStep((prev) => prev + 1);
  };

  const previousStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const isNextBtnDisabled = () => {
    return (
      currentStep === stepComponents.length ||
      (currentStep === 1 &&
        (!isValid ||
          !fields.country ||
          !fields.fullName ||
          !fields.email ||
          !fields.city ||
          !fields.telephone)) ||
      (currentStep === 4 && !summary) ||
      (currentStep === 2 && education.items.length === 0)
    );
  }; */

  return (
    <ThemeProvider theme={theme}>
      <div className="main-body">
        <div className="current-page-container">
          <Router>
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/personal-data" element={<PersonalDataForm />} />
              <Route path="/education" element={<EducationForm />} />
              <Route path="/experience" element={<ExperienceForm />} />
              <Route
                path="/additional-info"
                element={<AdditionalSectionsForm />}
              />
              <Route path="/design-download" element={<DesignAndDownload />} />{" "}
            </Routes>
            <NavigationBar />
          </Router>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
