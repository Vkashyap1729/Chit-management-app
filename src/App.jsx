import { ThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme, lightTheme } from "./theme";
import SearchAppBar from "./components/SearchAppBar"; // Header Component
import { useSelector } from "react-redux";
import ListAllChits from "./pages/ListAllChits";
function App() {
  const themeMode = useSelector((state) => state.theme.mode)

  return (
    <ThemeProvider theme={themeMode === "dark" ? darkTheme : lightTheme}>
      <CssBaseline /> {/* Ensures global styles match the theme */}
      <SearchAppBar />
      <ListAllChits />
    </ThemeProvider>
  );
}

export default App;
