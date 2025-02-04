import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  autoHideDuration: 3000,
  severity: "error",
  message: '',
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {  
      const { open, autoHideDuration, severity, message } = action.payload; 
      state.open = open;
      state.autoHideDuration = autoHideDuration;
      state.severity = severity;
      state.message = message;
    },
  },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
