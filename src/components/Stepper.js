import { jsx as _jsx } from "react/jsx-runtime";
import { Box, Slider } from "@mui/material";
/* function valuetext(value: number) {
  return `${value}°C`;
} */
const Stepper = ({ steps, currentStep }) => {
    return (_jsx(Box, { sx: { width: 300 }, children: _jsx(Slider, { "aria-label": "Progress", defaultValue: currentStep, 
            // getAriaValueText={valuetext}
            step: 10, valueLabelDisplay: "auto", marks: steps }) }));
};
export default Stepper;
