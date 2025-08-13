import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  palette: {
    primary: {
      main: '#000000ff', // Dark red
    },
    secondary: {
      main: '#000000', // Black
    },
    background: {
      default: '#ffffff', // White
    },
  },
});

export default theme;
