import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { darkTheme, lightTheme } from "./theme";
import SearchAppBar from "./components/SearchAppBar"; // Header Component
import { useSelector } from "react-redux";
import ListAllChits from "./pages/ListAllChits";

function App() {
  const themeMode = useSelector((state) => state.theme.mode);
  
  return (
    <ThemeProvider theme={themeMode === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      <SearchAppBar />
      <Router>
        <Routes>
          <Route path="/" element={<ListAllChits />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
