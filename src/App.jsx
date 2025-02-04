import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { darkTheme, lightTheme } from "./theme";
import SearchAppBar from "./components/SearchAppBar"; // Header Component
import { useSelector } from "react-redux";
import ListAllChits from "./pages/ListAllChits";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ListAllChitMembers from "./pages/ListAllChitMembers";
import ChitMemberDetails from "./pages/ChitMemberDetails";

function App() {
  const themeMode = useSelector((state) => state.theme.mode);
  
  return (
    <ThemeProvider theme={themeMode === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      <SearchAppBar />
      <Router>
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/fgt-psd" element={<ForgotPassword />} />
          <Route path="/list-all-chits" element={<ListAllChits />} />
          <Route path="/list-all-members" element={<ListAllChitMembers />} />
          <Route path="/chit-member" element={<ChitMemberDetails />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
