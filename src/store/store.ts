import { configureStore } from "@reduxjs/toolkit";
import additionalDataReducer from "../reducers/additionalDataSlice";
import educationReducer from "../reducers/educationSlice";
import experienceReducer from "../reducers/experienceSlice";
import personalDataReducer from "../reducers/personalDataSlice";

const store = configureStore({
  reducer: {
    personalData: personalDataReducer,
    education: educationReducer,
    experience: experienceReducer,
    additionalData: additionalDataReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
