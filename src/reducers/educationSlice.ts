import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EducationItem {
  year: string;
  center: string;
  degree: string;
}

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
    addEducation: (state, action: PayloadAction<EducationItem>) => {
      state.items.push(action.payload);
    },
    updateEducation: (
      state,
      action: PayloadAction<{ index: number; item: EducationItem }>
    ) => {
      state.items[action.payload.index] = action.payload.item;
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
  addEducation,
  updateEducation,
  removeEducation,
  validateEducation,
} = educationSlice.actions;
export default educationSlice.reducer;
