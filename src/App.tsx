import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Looks3Icon from "@mui/icons-material/Looks3";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import { Avatar, Button, createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import CustomStepper from "./components/CustomStepper";
import { MY_LINKEDIN_PROFILE, stepComponents, stepLabels } from "./constants";
import { RootState } from "./store/store";

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const { isValid, fields } = useSelector(
    (state: RootState) => state.personalData
  );
  const { summary } = useSelector((state: RootState) => state.optionalData);

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

  // Get the component for the current step
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
      (currentStep === 4 && !summary)
    );
  };

  console.log("isValid:", isValid);
  return (
    <ThemeProvider theme={theme}>
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
              Create and download your CV in PDF in a few simple steps:
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
        <div className="current-page-container">
          {currentStepComponent?.component ? (
            <currentStepComponent.component />
          ) : null}
        </div>

        {/* Navigation buttons */}
        <div className="navigation-bar">
          {currentStep > 0 && (
            <Button
              variant="contained"
              onClick={previousStep}
              disabled={currentStep === 1}
            >
              <ArrowBackIosIcon />
            </Button>
          )}
          {/* Progress bar */}
          {currentStep > 0 && (
            <CustomStepper currentStep={currentStep} steps={stepLabels} />
          )}
          <Button
            variant="contained"
            onClick={nextStep}
            disabled={isNextBtnDisabled()}
          >
            {currentStep === 0 ? "Start" : <ArrowForwardIosIcon />}
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
