import { Box, Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

interface StepperMarksProps {
  steps: { value: number; label: string }[];
  currentStep: number;
}

/* function valuetext(value: number) {
  return `${value}°C`;
} */

const CustomStepper: React.FC<StepperMarksProps> = ({ steps, currentStep }) => {
  return (
    <Box sx={{ width: 400 }}>
      <Stepper activeStep={currentStep - 1} alternativeLabel>
        {steps.map(({ label }) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default CustomStepper;
