import * as React from "react";
import Box from "@mui/material/Box";
import { Slider } from "@mui/material";
import { Step } from "../types";

interface DiscreteSliderProps {
  marks: Step[];
  onChange: (value: number) => void;
}

const DiscreteSlider: React.FC<DiscreteSliderProps> = ({ marks, onChange }) => {
  const valuetext = (value: number) => {
    return `${value}`;
  };
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Select your level"
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        marks={marks}
        defaultValue={marks[0].value}
        onChange={(e, val) => {
          if (typeof val === "number") {
            onChange(val); // Only single selection is allowed
          }
        }}
      />
    </Box>
  );
};

export default DiscreteSlider;
