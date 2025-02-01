import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#212121", // Dark Grey
    },
    secondary: {
      main: "#b0bec5", // Muted Blue-Grey
    },
    background: {
      default: "#121212", // Dark Background
      paper: "#212121", // Card Background
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0bec5",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#212121", // Ensures AppBar stays dark
        },
      },
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // Blue
    },
    secondary: {
      main: "#ff9800", // Orange
    },
    background: {
      default: "#ffffff", // Light Background
      paper: "#f5f5f5", // Paper Background
    },
    text: {
      primary: "#000000",
      secondary: "#757575",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1976d2", // Blue AppBar for Light Mode
        },
      },
    },
  },
});
