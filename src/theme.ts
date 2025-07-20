import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    // mode: "dark",
    primary: {
      main: "#43DDE6",
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: "#FFFFFF",
      paper: "#F0F0F0",
    },
    text: {
      primary: "#000",
      secondary: "#364F6B",
    },
    action: {
      hover: "#cbcbcbff",
      active: "#364F6B",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "24px",
    },
    h2: {
      fontSize: "1rem",
    },
    body1: {
      fontSize: "14px",
    },
    subtitle1: {
      fontSize: "0.6875rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "30px",
          textTransform: "none",
        },
        containedSecondary: {
          backgroundColor: "#000000",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#43DDE6",
          },
        },
        sizeLarge: {
          padding: "8px 32px",
          fontWeight: 700,
          fontSize: "16px",
        },
      },
    },
  },
});

export default theme;
