import { Box, Slider } from "@mui/material";
import React from "react";

interface StepperMarksProps {
  steps: { value: number; label: string }[];
  currentStep: number;
}

/* function valuetext(value: number) {
  return `${value}°C`;
} */

const Stepper: React.FC<StepperMarksProps> = ({ steps, currentStep }) => {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Progress"
        defaultValue={currentStep}
        // getAriaValueText={valuetext}
        step={10}
        valueLabelDisplay="auto"
        marks={steps}
      />
    </Box>
  );
};

export default Stepper;
