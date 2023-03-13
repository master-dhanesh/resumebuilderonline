import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    apperror: [],
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loaduser: (state, action) => {},
        apperror: (state, action) => {
            state.apperror.push(action.payload);
        },
    },
});

export const { loaduser, apperror } = userSlice.actions;

export default userSlice.reducer;
