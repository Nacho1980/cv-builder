import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    items: [],
    errors: [],
};
const experienceSlice = createSlice({
    name: "experience",
    initialState,
    reducers: {
        addExperience: (state, action) => {
            state.items.push(action.payload);
        },
        updateExperience: (state, action) => {
            state.items[action.payload.index] = action.payload.item;
        },
        removeExperience: (state, action) => {
            state.items.splice(action.payload, 1);
        },
        validateExperience: (state) => {
            const errors = [];
            state.items.forEach((item, index) => {
                if (!item.startDate || !item.companyName || !item.positionName) {
                    errors.push(`Experience item ${index + 1} is incomplete.`);
                }
            });
            state.errors = errors;
        },
    },
});
export const { addExperience, updateExperience, removeExperience, validateExperience, } = experienceSlice.actions;
export default experienceSlice.reducer;
