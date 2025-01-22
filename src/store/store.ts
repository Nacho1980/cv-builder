import { configureStore } from "@reduxjs/toolkit";
import personalDataReducer from "../reducers/personalDataSlice";
import educationReducer from "../reducers/educationSlice";
import experienceReducer from "../reducers/experienceSlice";
import optionalDataReducer from "../reducers/optionalDataSlice";

const store = configureStore({
  reducer: {
    personalData: personalDataReducer,
    education: educationReducer,
    experience: experienceReducer,
    optionalData: optionalDataReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
