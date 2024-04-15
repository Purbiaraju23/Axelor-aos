import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const axelor = {
  colors: {
    blue: "rgba(41, 56, 71)",
    grey: "rgba(158, 158, 158)",
    green: "rgba(62, 207, 142)",
    lightGreen: "rgba(62, 207, 142, 0.1)",
    white: "rgba(255, 255, 255)",
  },
};

const theme = createTheme({
  palette: {
    primary: {
      main: axelor.colors.blue,
    },
    secondary: {
      light: axelor.colors.lightGreen,
      main: axelor.colors.green,
      contrastText: axelor.colors.white,
    },
  },
  axelor,
});

export function Theme({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default Theme;
