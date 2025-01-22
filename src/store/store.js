import { configureStore } from "@reduxjs/toolkit";
import personalDataReducer from "../reducers/personalDataSlice";
import educationReducer from "../reducers/educationSlice";
import experienceReducer from "../reducers/experienceSlice";
const store = configureStore({
    reducer: {
        personalData: personalDataReducer,
        education: educationReducer,
        experience: experienceReducer,
    },
});
export default store;
