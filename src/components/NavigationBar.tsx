import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { stepComponents, stepLabels } from "../constants";
import useIsPhone from "../hooks/useIsPhone";
import { RootState } from "../store/store";
import CustomStepper from "./CustomStepper";

interface NavigationBarProps {
  currentStep: number;
  onNextStep: () => void;
  onPreviousStep: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  currentStep,
  onNextStep,
  onPreviousStep,
}) => {
  const { isValid, fields } = useSelector(
    (state: RootState) => state.personalData
  );
  const { summary } = useSelector((state: RootState) => state.additionalData);
  const education = useSelector((state: RootState) => state.education);
  const isPhone = useIsPhone();

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
  };

  const BackButton = () => {
    if (currentStep > 0) {
      return (
        <Button
          name="previousStepBtn"
          variant="contained"
          onClick={onPreviousStep}
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
    }
  };

  const NextButton = () => {
    if (currentStep < stepLabels.length) {
      return (
        <Button
          name="nextStepBtn"
          variant="contained"
          onClick={onNextStep}
          disabled={isNextBtnDisabled()}
        >
          {currentStep === 0 ? (
            <span className="navigation-text">START</span>
          ) : isPhone ? (
            <>
              <span className="navigation-text">NEXT </span>{" "}
              <ArrowForwardIosIcon />
            </>
          ) : (
            <ArrowForwardIosIcon />
          )}
        </Button>
      );
    }
  };

  return (
    <div className={isPhone ? "navigation-bar" : "navigation-bar desktop"}>
      {!isPhone && <BackButton />}
      {isPhone && <NextButton />}
      {/* Progress bar */}
      {currentStep > 0 && (
        <CustomStepper currentStep={currentStep} steps={stepLabels} />
      )}
      {!isPhone && <NextButton />}
      {isPhone && <BackButton />}
    </div>
  );
};

export default NavigationBar;
