import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormState } from "../constants";
import { validInternationalPhoneNumber } from "../utils";

const initialState: FormState = {
  fields: {
    fullName: "",
    email: "",
    city: "",
    country: "",
    telephone: "",
    web: "",
  },
  errors: {},
  isValid: false,
};

const personalDataSlice = createSlice({
  name: "personalData",
  initialState,
  reducers: {
    setState: (state, action) => {
      return { ...state, ...action.payload };
    },
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
      return !validInternationalPhoneNumber(value) ? "Invalid telephone" : null;
    default:
      return null;
  }
};

export const { setState, updateField, validateAllFields } =
  personalDataSlice.actions;
export default personalDataSlice.reducer;
