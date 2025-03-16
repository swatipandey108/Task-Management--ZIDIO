import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: !!localStorage.getItem("token"), 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("id", action.payload.id); 
    },
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem("token"); 
      localStorage.removeItem("id");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
