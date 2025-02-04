import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // blue color for light mode
    },
    background: {
      default: "#f5f5f5", // light background color
    },
    text: {
      primary: "#000", // black text in light mode
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // Override the default button style for light mode
          backgroundColor: '#1976d2',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#1565c0', // darker blue on hover
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#1976d2', // blue link color in light mode
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#fff', // white color for dark mode
    },
    background: {
      default: "#121212", // dark background color
    },
    text: {
      primary: "#fff", // white text in dark mode
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // Override the default button style for dark mode
          backgroundColor: '#fff', // white background for dark mode button
          color: '#000', // black text
          '&:hover': {
            backgroundColor: '#f0f0f0', // light gray on hover
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#fff', // white link color in dark mode
          '&:hover': {
            color: '#bb86fc', // purple hover color for links in dark mode
          },
        },
      },
    },
  },
});
