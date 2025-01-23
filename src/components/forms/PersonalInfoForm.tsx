import React from "react";
import {
  TextField,
  Button,
  Box,
  Modal,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import AodRoundedIcon from "@mui/icons-material/AodRounded";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CountrySelector from "../CountrySelector";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { updateField } from "../../reducers/personalDataSlice";

const PersonalInfoForm: React.FC = () => {
  const dispatch = useDispatch();
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
    dispatch(updateField({ field: "country", value: event.target.value }));
  };

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Let's start with some basic personal information!
      </Typography>
      <Box display="flex" alignItems="center" gap={2}>
        <PersonRoundedIcon style={{ fontSize: 40, color: "blue" }} />
        <TextField
          label="Full Name"
          fullWidth
          value={fields.fullName}
          onChange={handleChange("fullName")}
          onBlur={handleBlur("fullName")} // Validate on blur
          error={!!errors.fullName}
          helperText={errors.fullName}
        />
      </Box>
      <Box display="flex" alignItems="center" gap={2}>
        <AlternateEmailRoundedIcon style={{ fontSize: 40, color: "blue" }} />
        <TextField
          label="Email Address"
          fullWidth
          value={fields.email}
          onChange={handleChange("email")}
          onBlur={handleBlur("email")}
          error={!!errors.email}
          helperText={errors.email}
        />
      </Box>
      <Box display="flex" alignItems="center" gap={2}>
        <ApartmentRoundedIcon style={{ fontSize: 40, color: "blue" }} />
        <TextField
          label="City"
          fullWidth
          value={fields.city}
          onChange={handleChange("city")}
          onBlur={handleBlur("city")}
          error={!!errors.city}
          helperText={errors.city}
        />
        <CountrySelector handleChangeCountry={handleChangeCountry} />
      </Box>
      <Box display="flex" alignItems="center" gap={2}>
        <AodRoundedIcon style={{ fontSize: 40, color: "blue" }} />
        <TextField
          label="Telephone"
          fullWidth
          value={fields.telephone}
          onChange={handleChange("telephone")}
          onBlur={handleBlur("telephone")}
          error={!!errors.telephone}
          helperText={errors.telephone}
        />
      </Box>
    </Box>
  );
};

export default PersonalInfoForm;
