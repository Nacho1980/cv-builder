import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import "./App.css";
import { stepComponents } from "./components/StepComponents";
import { Box, Button } from "@mui/material";
import Stepper from "./components/Stepper";
import { stepLabels } from "./constants";
import { useSelector } from "react-redux";
function App() {
    const [currentStep, setCurrentStep] = useState(0);
    const { isValid } = useSelector((state) => state.personalData);
    // Get the component for the current step
    const currentStepComponent = stepComponents.find((step) => step.step === currentStep);
    const nextStep = () => {
        if (currentStep < stepComponents.length)
            setCurrentStep((prev) => prev + 1);
    };
    const previousStep = () => {
        if (currentStep > 2)
            setCurrentStep((prev) => prev - 1);
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "header", children: "CV Builder" }), _jsxs("div", { className: "body", children: [currentStep === 0 && (_jsxs("div", { className: "welcome", children: [_jsx("h1", { children: "Welcome to the CV Builder" }), _jsx("div", { children: "This tool will help you create a professional CV in a few simple steps and unlike other tools you can find on Google it's completely FREE and no personal information is stored anywhere" }), _jsx("div", { children: "Once you have finished entering the required information, you can customize the look and download the CV in PDF format." })] })), currentStep > 0 && (_jsx(Stepper, { currentStep: currentStep, steps: stepLabels })), _jsx(Box, { sx: { marginTop: 4 }, children: currentStepComponent?.component ? (_jsx(currentStepComponent.component, {})) : null }), _jsxs(Box, { sx: {
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: 4,
                        }, children: [_jsx(Button, { variant: "outlined", onClick: previousStep, disabled: currentStep === 1, children: "Previous" }), _jsx(Button, { variant: "contained", onClick: nextStep, disabled: currentStep === stepComponents.length ||
                                    (currentStep === 1 && !isValid), children: "Next" })] })] })] }));
}
export default App;
