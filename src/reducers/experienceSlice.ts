import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExperienceItem } from "../types";
import { compareDatesMMYYYY } from "../utils";

interface ExperienceState {
  items: ExperienceItem[];
  errors: string[];
}

const initialState: ExperienceState = {
  items: [],
  errors: [],
};

const experienceSlice = createSlice({
  name: "experience",
  initialState,
  reducers: {
    setState: (state, action) => {
      return { ...state, ...action.payload };
    },
    addExperience: (state, action: PayloadAction<ExperienceItem>) => {
      state.items.push(action.payload);
      state.items.sort((a, b) => compareDatesMMYYYY(a.startDate, b.startDate));
    },
    updateExperience: (
      state,
      action: PayloadAction<{ index: number; item: ExperienceItem }>
    ) => {
      state.items[action.payload.index] = action.payload.item;
      state.items.sort((a, b) => compareDatesMMYYYY(a.startDate, b.startDate));
    },
    removeExperience: (state, action: PayloadAction<number>) => {
      state.items.splice(action.payload, 1);
    },
    validateExperience: (state) => {
      const errors: string[] = [];
      state.items.forEach((item, index) => {
        if (!item.startDate || !item.companyName || !item.positionName) {
          errors.push(`Experience item ${index + 1} is incomplete.`);
        }
      });
      state.errors = errors;
    },
  },
});

export const {
  setState,
  addExperience,
  updateExperience,
  removeExperience,
  validateExperience,
} = experienceSlice.actions;
export default experienceSlice.reducer;
