import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Box, Select, MenuItem, Typography, FormControl, } from "@mui/material";
import useGetCountries from "../hooks/useGetCountries";
const CountrySelector = ({ handleChangeCountry, }) => {
    const [selectedCountry, setSelectedCountry] = useState("");
    const { countries, loading, error } = useGetCountries();
    const handleChange = (event) => {
        setSelectedCountry(event.target.value);
        handleChangeCountry(event);
    };
    if (loading) {
        return _jsx("div", { children: "Loading contries..." });
    }
    else if (error) {
        return _jsxs("div", { children: ["Error loading countries: ", error] });
    }
    else if (countries.length > 0) {
        return (_jsx(Box, { width: "300px", m: "20px", children: _jsx(FormControl, { fullWidth: true, children: _jsx(Select, { labelId: "country-select-label", value: selectedCountry, onChange: handleChange, renderValue: (value) => {
                        const selected = countries.find((country) => country.code === value);
                        return (_jsxs(Box, { display: "flex", alignItems: "center", children: [_jsx("img", { src: `https://flagcdn.com/w40/${selected?.code.toLowerCase()}.png`, alt: "", style: { width: 24, height: 16, marginRight: 8 } }), selected?.label] }));
                    }, children: countries.map((country) => (_jsx(MenuItem, { value: country.code, children: _jsxs(Box, { display: "flex", alignItems: "center", children: [_jsx("img", { src: `https://flagcdn.com/w40/${country.code.toLowerCase()}.png`, alt: "", style: { width: 24, height: 16, marginRight: 8 } }), _jsx(Typography, { children: country.label })] }) }, country.code))) }) }) }));
    }
};
export default CountrySelector;
