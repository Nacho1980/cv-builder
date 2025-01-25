import * as React from "react";
import Box from "@mui/material/Box";
import { Slider } from "@mui/material";
import { Step } from "../types";
import { languageLevels } from "../constants";

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
