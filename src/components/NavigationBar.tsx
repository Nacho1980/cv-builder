import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { stepLabels, stepPaths } from "../constants";
import useIsPhone from "../hooks/useIsPhone";
import { RootState } from "../store/store";
import CustomStepper from "./CustomStepper";

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isPhone = useIsPhone();

  const currentStep = stepPaths.indexOf(location.pathname) + 1; // Determine current step based on URL

  const { isValid, fields } = useSelector(
    (state: RootState) => state.personalData
  );
  const { summary } = useSelector((state: RootState) => state.additionalData);
  const education = useSelector((state: RootState) => state.education);

  const isNextBtnDisabled = () => {
    return (
      currentStep === stepPaths.length || // Disable if at the last step
      (currentStep === 1 &&
        (!isValid ||
          !fields.country ||
          !fields.fullName ||
          !fields.email ||
          !fields.city ||
          !fields.telephone)) ||
      (currentStep === 4 && !summary) || // Additional Info step validation
      (currentStep === 2 && education.items.length === 0) // Education step validation
    );
  };

  const handleNext = () => {
    if (currentStep === -1) {
      // If on WelcomePage, start at personal data
      navigate(stepPaths[0]);
    } else if (currentStep < stepPaths.length) {
      navigate(stepPaths[currentStep]);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      navigate(stepPaths[currentStep - 2]);
    } else {
      navigate("/"); // Go back to WelcomePage if at the first step
    }
  };

  const BackButton = () =>
    currentStep > 1 && (
      <Button
        name="previousStepBtn"
        variant="contained"
        onClick={handleBack}
        disabled={currentStep === 1}
      >
        {isPhone ? (
          <>
            <ArrowBackIosIcon /> <span className="navigation-text">BACK</span>
          </>
        ) : (
          <ArrowBackIosIcon />
        )}
      </Button>
    );

  const NextButton = () => (
    <Button
      name="nextStepBtn"
      variant="contained"
      onClick={handleNext}
      disabled={isNextBtnDisabled()}
    >
      {currentStep < 1 ? (
        <span className="navigation-text">START</span>
      ) : isPhone ? (
        <>
          <span className="navigation-text">NEXT </span>
          <ArrowForwardIosIcon />
        </>
      ) : (
        <ArrowForwardIosIcon />
      )}
    </Button>
  );

  return (
    <div className={isPhone ? "navigation-bar" : "navigation-bar desktop"}>
      {!isPhone && <BackButton />}
      {isPhone && <NextButton />}
      {currentStep > 0 && (
        <CustomStepper currentStep={currentStep} steps={stepLabels} />
      )}
      {!isPhone && <NextButton />}
      {isPhone && <BackButton />}
    </div>
  );
};

export default NavigationBar;
