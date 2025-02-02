import { Slider } from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import { languageLevels } from "../constants";
import { Step } from "../types";

interface DiscreteSliderProps {
  marks: Step[];
  onChange: (value: number) => void;
}

const DiscreteSlider: React.FC<DiscreteSliderProps> = ({ marks, onChange }) => {
  const valuetext = (value: number) => {
    return `${value}`;
  };
  const valueLabelFormat = (value: number) => {
    return languageLevels.find((mark) => mark.value === value)?.label;
  };
  return (
    <Box
      sx={{
        width: "80%",
        paddingRight: "16px",
        display: "flex",
        alignContent: "center",
      }}
      className="slider-container"
    >
      <Slider
        aria-label="Select your level"
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        valueLabelFormat={valueLabelFormat}
        min={marks[0].value}
        max={marks[marks.length - 1].value}
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
