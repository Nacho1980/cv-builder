import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EducationItem } from "../types";
import { compareDatesMMYYYY } from "../utils";

interface EducationState {
  items: EducationItem[];
  errors: string[];
}

const initialState: EducationState = {
  items: [],
  errors: [],
};

const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {
    setState: (state, action) => {
      return { ...state, ...action.payload };
    },
    addEducation: (state, action: PayloadAction<EducationItem>) => {
      state.items.push(action.payload);
      state.items.sort((a, b) => compareDatesMMYYYY(a.year, b.year));
    },
    updateEducation: (
      state,
      action: PayloadAction<{ index: number; item: EducationItem }>
    ) => {
      state.items[action.payload.index] = action.payload.item;
      state.items.sort((a, b) => compareDatesMMYYYY(a.year, b.year));
    },
    removeEducation: (state, action: PayloadAction<number>) => {
      state.items.splice(action.payload, 1);
    },
    validateEducation: (state) => {
      const errors: string[] = [];
      state.items.forEach((item, index) => {
        if (!item.year || !item.center || !item.degree) {
          errors.push(`Education item ${index + 1} is incomplete.`);
        }
      });
      state.errors = errors;
    },
  },
});

export const {
  setState,
  addEducation,
  updateEducation,
  removeEducation,
  validateEducation,
} = educationSlice.actions;
export default educationSlice.reducer;
