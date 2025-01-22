import { useState } from "react";
import "./App.css";
import { stepComponents } from "./components/StepComponents";
import { Box, Button } from "@mui/material";
import Stepper from "./components/Stepper";
import { stepLabels } from "./constants";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const { isValid } = useSelector((state: RootState) => state.personalData);

  // Get the component for the current step
  const currentStepComponent = stepComponents.find(
    (step) => step.step === currentStep
  );

  const nextStep = () => {
    if (currentStep < stepComponents.length) setCurrentStep((prev) => prev + 1);
  };

  const previousStep = () => {
    if (currentStep > 2) setCurrentStep((prev) => prev - 1);
  };

  return (
    <>
      <div className="header">CV Builder</div>
      <div className="body">
        {currentStep === 0 && (
          <div className="welcome">
            <h1>Welcome to the CV Builder</h1>
            <div>
              This tool will help you create a professional CV in a few simple
              steps and unlike other tools you can find on Google it's
              completely FREE and no personal information is stored anywhere
            </div>
            <div>
              Once you have finished entering the required information, you can
              customize the look and download the CV in PDF format.
            </div>
          </div>
        )}
        {/* Progress bar */}
        {currentStep > 0 && (
          <Stepper currentStep={currentStep} steps={stepLabels} />
        )}

        {/* Render the step's component */}
        <Box sx={{ marginTop: 4 }}>
          {currentStepComponent?.component ? (
            <currentStepComponent.component />
          ) : null}
        </Box>

        {/* Navigation buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 4,
          }}
        >
          <Button
            variant="outlined"
            onClick={previousStep}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            onClick={nextStep}
            disabled={
              currentStep === stepComponents.length ||
              (currentStep === 1 && !isValid)
            }
          >
            Next
          </Button>
        </Box>
      </div>
    </>
  );
}

export default App;
