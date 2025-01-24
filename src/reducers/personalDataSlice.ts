import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormState } from "../constants";
import { validateInternationalPhoneNumber } from "../utils";

const initialState: FormState = {
  fields: {
    fullName: "",
    email: "",
    city: "",
    country: "",
    telephone: "",
  },
  errors: {},
  isValid: false,
};

const personalDataSlice = createSlice({
  name: "personalData",
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ field: string; value: string }>
    ) => {
      state.fields[action.payload.field] = action.payload.value;

      // Automatically validate the field
      const error = validateField(action.payload.field, action.payload.value);
      if (error) {
        state.errors[action.payload.field] = error;
      } else {
        delete state.errors[action.payload.field];
      }

      // Check overall form validity
      state.isValid = Object.keys(state.errors).length === 0;
    },
    validateAllFields: (state) => {
      Object.keys(state.fields).forEach((field) => {
        const error = validateField(field, state.fields[field]);
        if (error) {
          state.errors[field] = error;
        } else {
          delete state.errors[field];
        }
      });
      state.isValid = Object.keys(state.errors).length === 0;
    },
  },
});

// Field-level validation logic
const validateField = (field: string, value: string): string | null => {
  switch (field) {
    case "fullName":
      return value.trim() === "" ? "Full Name is required" : null;
    case "email":
      return /\S+@\S+\.\S+/.test(value) ? null : "Invalid email address";
    case "city":
      return value.trim() === "" ? "City is required" : null;
    case "country":
      return value.trim() === "" ? "Country is required" : null;
    case "telephone":
      return !validateInternationalPhoneNumber(value)
        ? "Invalid telephone"
        : null;
    default:
      return null;
  }
};

export const { updateField, validateAllFields } = personalDataSlice.actions;
export default personalDataSlice.reducer;
