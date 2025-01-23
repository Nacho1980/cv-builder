import React, { useEffect, useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  Typography,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import useGetCountries from "../hooks/useGetCountries";
import { Country } from "../types";

interface CountrySelectorProps {
  handleChangeCountry: (event: SelectChangeEvent<string>) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  handleChangeCountry,
}) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const { countries, loading, error } = useGetCountries();

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedCountry(event.target.value);
    handleChangeCountry(event);
  };
  if (loading) {
    return <div>Loading contries...</div>;
  } else if (error) {
    return <div>Error loading countries: {error}</div>;
  } else if (countries.length > 0) {
    return (
      <Box width="300px" m="20px">
        <FormControl fullWidth>
          <Select
            labelId="country-select-label"
            value={selectedCountry}
            onChange={handleChange}
            renderValue={(value) => {
              const selected = countries.find(
                (country: Country) => country.code === value
              );
              return (
                <Box display="flex" alignItems="center">
                  <img
                    src={`https://flagcdn.com/w40/${selected?.code.toLowerCase()}.png`}
                    alt=""
                    style={{ width: 24, height: 16, marginRight: 8 }}
                  />
                  {selected?.label}
                </Box>
              );
            }}
          >
            {countries.map((country: Country) => (
              <MenuItem key={country.code} value={country.code}>
                <Box display="flex" alignItems="center">
                  <img
                    src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                    alt=""
                    style={{ width: 24, height: 16, marginRight: 8 }}
                  />
                  <Typography>{country.label}</Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  }
};

export default CountrySelector;
