import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LanguageItem } from "../types";

interface OptionalDataState {
  summary: string;
  languages: LanguageItem[];
  skills: string[];
}

const initialState: OptionalDataState = {
  summary: "",
  languages: [],
  skills: [],
};

const optionalDataSlice = createSlice({
  name: "optionalData",
  initialState,
  reducers: {
    updateSummary: (state, action: PayloadAction<string>) => {
      state.summary = action.payload;
    },
    addLanguage: (state, action: PayloadAction<LanguageItem>) => {
      state.languages.push(action.payload);
    },
    updateLanguage: (
      state,
      action: PayloadAction<{ index: number; item: LanguageItem }>
    ) => {
      state.languages[action.payload.index] = action.payload.item;
    },
    removeLanguage: (state, action: PayloadAction<number>) => {
      state.languages.splice(action.payload, 1);
    },
    addSkill: (state, action: PayloadAction<string>) => {
      state.skills.push(action.payload);
    },
    removeSkill: (state, action: PayloadAction<number>) => {
      state.skills.splice(action.payload, 1);
    },
  },
});

export const {
  updateSummary,
  addLanguage,
  updateLanguage,
  removeLanguage,
  addSkill,
  removeSkill,
} = optionalDataSlice.actions;
export default optionalDataSlice.reducer;
