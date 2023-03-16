import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    errors: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loading: (state, action) => {
            state.isLoading = true;
        },
        loaduser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.errors = null;
            state.isLoading = false;
        },
        removeuser: (state, action) => {
            state.user = null;
            state.isAuthenticated = false;
            state.errors = null;
            state.isLoading = false;
        },
        _error: (state, action) => {
            state.errors = action.payload;
            state.loading = false;
        },
    },
});

export const { loaduser, _error, loading,removeuser} = userSlice.actions;

export default userSlice.reducer;
