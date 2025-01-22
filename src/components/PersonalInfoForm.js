import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { TextField, Box, } from "@mui/material";
import AodRoundedIcon from "@mui/icons-material/AodRounded";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CountrySelector from "./CountrySelector";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../reducers/personalDataSlice";
const PersonalInfoForm = () => {
    const dispatch = useDispatch();
    const { fields, errors } = useSelector((state) => state.personalData);
    // Action creator for updating the field
    const handleChange = (field) => (event) => {
        dispatch(updateField({ field, value: event.target.value }));
    };
    // Action creator for validating the field when leaving the field
    const handleBlur = (field) => () => {
        dispatch(updateField({ field, value: fields[field] }));
    };
    const handleChangeCountry = (event) => {
        dispatch(updateField({ field: "country", value: event.target.value }));
    };
    return (_jsx(_Fragment, { children: _jsxs(Box, { children: [_jsx("h2", { children: "Let's start with some basic personal information!" }), _jsxs(Box, { display: "flex", alignItems: "center", gap: 2, children: [_jsx(PersonRoundedIcon, { style: { fontSize: 40, color: "blue" } }), _jsx(TextField, { label: "Full Name", fullWidth: true, value: fields.fullName, onChange: handleChange("fullName"), onBlur: handleBlur("fullName"), error: !!errors.fullName, helperText: errors.fullName })] }), _jsxs(Box, { display: "flex", alignItems: "center", gap: 2, children: [_jsx(AlternateEmailRoundedIcon, { style: { fontSize: 40, color: "blue" } }), _jsx(TextField, { label: "Email Address", fullWidth: true, value: fields.email, onChange: handleChange("email"), onBlur: handleBlur("email"), error: !!errors.email, helperText: errors.email })] }), _jsxs(Box, { display: "flex", alignItems: "center", gap: 2, children: [_jsx(ApartmentRoundedIcon, { style: { fontSize: 40, color: "blue" } }), _jsx(TextField, { label: "City", fullWidth: true, value: fields.city, onChange: handleChange("city"), onBlur: handleBlur("city"), error: !!errors.city, helperText: errors.city }), _jsx(CountrySelector, { handleChangeCountry: handleChangeCountry })] }), _jsxs(Box, { display: "flex", alignItems: "center", gap: 2, children: [_jsx(AodRoundedIcon, { style: { fontSize: 40, color: "blue" } }), _jsx(TextField, { label: "Telephone", fullWidth: true, value: fields.telephone, onChange: handleChange("telephone"), onBlur: handleBlur("telephone"), error: !!errors.telephone, helperText: errors.telephone })] })] }) }));
};
export default PersonalInfoForm;
