import { combineReducers, configureStore } from "@reduxjs/toolkit";
import additionalDataReducer from "../reducers/additionalDataSlice";
import educationReducer from "../reducers/educationSlice";
import experienceReducer from "../reducers/experienceSlice";
import personalDataReducer from "../reducers/personalDataSlice";

// Combine reducers
const appReducer = combineReducers({
  personalData: personalDataReducer,
  education: educationReducer,
  experience: experienceReducer,
  additionalData: additionalDataReducer,
});

// Root reducer to handle RESET_STATE action
const rootReducer = (state: RootState | undefined, action: any) => {
  if (action.type === "SET_STATE") {
    return { ...state, ...action.payload }; // Reset the state
  }
  return appReducer(state, action); // Default behavior
};

// Create store with optional preloaded state
export const createStore: any = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export const store = createStore();

// Infer RootState and AppDispatch from store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Expose store to window for Cypress
if (process.env.NODE_ENV === "development" || window.Cypress) {
  (window as any).store = store;
}

export default store;
