import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import useGetCountries from "../hooks/useGetCountries";
import { Country } from "../types";

interface CountrySelectorProps {
  handleChangeCountry: (event: SelectChangeEvent<string>) => void;
  defaultValue: string;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  handleChangeCountry,
  defaultValue,
}) => {
  const [selectedCountry, setSelectedCountry] = useState(defaultValue || "");
  const { countries, loading, error } = useGetCountries();

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedCountry(event.target.value);
    handleChangeCountry(event);
  };
  if (loading) {
    return <div>Loading countries...</div>;
  } else if (error) {
    return <div>Error loading countries: {error}</div>;
  } else if (countries.length > 0) {
    return (
      <Box width="300px">
        <FormControl fullWidth variant="outlined">
          <InputLabel id="country-select-label">Country</InputLabel>
          <Select
            className="country-select"
            name="country-select"
            labelId="country-select-label"
            label="Country"
            inputProps={{
              "data-testid": "country-selector",
            }}
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
