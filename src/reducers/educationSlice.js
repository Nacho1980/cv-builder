import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    items: [],
    errors: [],
};
const educationSlice = createSlice({
    name: "education",
    initialState,
    reducers: {
        addEducation: (state, action) => {
            state.items.push(action.payload);
        },
        updateEducation: (state, action) => {
            state.items[action.payload.index] = action.payload.item;
        },
        removeEducation: (state, action) => {
            state.items.splice(action.payload, 1);
        },
        validateEducation: (state) => {
            const errors = [];
            state.items.forEach((item, index) => {
                if (!item.year || !item.center || !item.degree) {
                    errors.push(`Education item ${index + 1} is incomplete.`);
                }
            });
            state.errors = errors;
        },
    },
});
export const { addEducation, updateEducation, removeEducation, validateEducation, } = educationSlice.actions;
export default educationSlice.reducer;
