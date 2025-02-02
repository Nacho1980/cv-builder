import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import AodRoundedIcon from "@mui/icons-material/AodRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import LanguageIcon from "@mui/icons-material/Language";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { Box, SelectChangeEvent, TextField } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useGetCountries from "../../hooks/useGetCountries";
import { updateField } from "../../reducers/personalDataSlice";
import { RootState } from "../../store/store";
import CountrySelector from "../CountrySelector";

const PersonalDataForm: React.FC = () => {
  const dispatch = useDispatch();
  const { countries } = useGetCountries();
  const { fields, errors } = useSelector(
    (state: RootState) => state.personalData
  );

  // Action creator for updating the field
  const handleChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(updateField({ field, value: event.target.value }));
    };

  // Action creator for validating the field when leaving the field
  const handleBlur = (field: string) => () => {
    dispatch(updateField({ field, value: fields[field] }));
  };

  const handleChangeCountry = (event: SelectChangeEvent<string>) => {
    const countryLabel =
      countries.find((c) => c.code === event.target.value)?.label || "";
    dispatch(updateField({ field: "country", value: countryLabel }));
  };

  return (
    <>
      <Box className="page-header">Contact data</Box>
      <Box display="flex" flexDirection="column" gap={2}>
        <Box display="flex" alignItems="center" gap={2}>
          <PersonRoundedIcon style={{ fontSize: 40, color: "coral" }} />
          <TextField
            label="Full Name"
            name="fullName"
            fullWidth
            value={fields.fullName}
            onChange={handleChange("fullName")}
            onBlur={handleBlur("fullName")} // Validate on blur
            error={!!errors.fullName}
          />
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <AlternateEmailRoundedIcon style={{ fontSize: 40, color: "coral" }} />
          <TextField
            label="Email Address"
            name="emailAddress"
            fullWidth
            value={fields.email}
            onChange={handleChange("email")}
            onBlur={handleBlur("email")}
            error={!!errors.email}
            //helperText={errors.email}
            sx={{
              backgroundColor: "transparent", // Ensures background doesn't change
              "& .MuiInputBase-root": {
                backgroundColor: "transparent",
              },
            }}
          />
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <ApartmentRoundedIcon style={{ fontSize: 40, color: "coral" }} />
          <TextField
            label="City"
            name="city"
            fullWidth
            value={fields.city}
            onChange={handleChange("city")}
            onBlur={handleBlur("city")}
            error={!!errors.city}
          />
          <CountrySelector
            handleChangeCountry={handleChangeCountry}
            defaultValue={
              countries.find((c) => c.label === fields.country)?.code || ""
            }
          />
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <AodRoundedIcon style={{ fontSize: 40, color: "coral" }} />
          <TextField
            label="Telephone"
            name="telephone"
            fullWidth
            value={fields.telephone}
            onChange={handleChange("telephone")}
            onBlur={handleBlur("telephone")}
            error={!!errors.telephone}
            sx={{
              backgroundColor: "transparent", // Ensures background doesn't change
              "& .MuiInputBase-root": {
                backgroundColor: "transparent",
              },
            }}
          />
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <LanguageIcon style={{ fontSize: 40, color: "coral" }} />
          <TextField
            label="Web (optional)"
            name="web"
            fullWidth
            value={fields.web}
            onChange={handleChange("web")}
            sx={{
              backgroundColor: "transparent", // Ensures background doesn't change
              "& .MuiInputBase-root": {
                backgroundColor: "transparent",
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default PersonalDataForm;
