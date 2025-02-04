import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: JSON.parse(localStorage.getItem("theme")) || "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      localStorage.setItem("theme", JSON.stringify(state.mode === "dark" ? "light" : "dark"));
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
