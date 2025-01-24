import { useState } from "react";
import "./App.css";
import { stepComponents } from "./components/StepComponents";
import { Avatar, Box, Button } from "@mui/material";
import Stepper from "./components/Stepper";
import { MY_LINKEDIN_PROFILE, stepLabels } from "./constants";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";

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
    <div className="main-body">
      {/* Welcome page */}
      {currentStep === 0 && (
        <div className="welcome">
          <Avatar
            alt="Ignacio Santos"
            sx={{ bgcolor: "lightblue", color: "bisque" }}
            className="avatar"
          >
            <a href={MY_LINKEDIN_PROFILE}>IS</a>
          </Avatar>
          <h1>Welcome to the CV Builder</h1>
          <div className="paragraph">
            Create a professional CV in a few simple steps:
          </div>
          <div className="paragraph space-between">
            <div>
              <LooksOneIcon
                sx={{
                  fontSize: 40,
                  backgroundColor: "lightblue",
                  color: "coral",
                }}
              />
              Fill in the required info
            </div>
            <div>
              <LooksTwoIcon
                sx={{
                  fontSize: 40,
                  backgroundColor: "lightblue",
                  color: "coral",
                }}
              />
              Customize the look
            </div>
            <div>
              <Looks3Icon
                sx={{
                  fontSize: 40,
                  backgroundColor: "lightblue",
                  color: "coral",
                }}
              />
              Download the CV
            </div>
          </div>
          <div className="paragraph">
            Unlike other online tools CV Builder is &nbsp;
            <span className="bold-text">FREE</span>&nbsp; and no personal
            information is stored anywhere :)
          </div>
        </div>
      )}

      {/* Render the step's component */}
      <div className="current-page-component">
        {currentStepComponent?.component ? (
          <currentStepComponent.component />
        ) : null}
      </div>

      {/* Navigation buttons */}
      <div className="navigation-bar">
        {currentStep > 0 && (
          <Button
            variant="outlined"
            onClick={previousStep}
            disabled={currentStep === 1}
          >
            {"<<"}
          </Button>
        )}
        {/* Progress bar */}
        {currentStep > 0 && (
          <Stepper currentStep={currentStep} steps={stepLabels} />
        )}
        <Button
          variant="contained"
          onClick={nextStep}
          disabled={
            currentStep === stepComponents.length ||
            (currentStep === 1 && !isValid)
          }
        >
          {currentStep === 0 ? "Start" : ">>"}
        </Button>
      </div>
    </div>
  );
}

export default App;
