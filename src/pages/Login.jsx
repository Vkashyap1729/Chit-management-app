import { useState } from "react";
import { Grid, TextField, Box, Button, Typography, Link } from "@mui/material";
import { InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { setNotification } from "../slices/notificationSlice";
import {login} from '../api'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);  // Toggle the value of showPassword
  };
  const handleSubmitLogin = async(e) => {
    e.preventDefault();
    try {
      const response = await login({ email: email, password : password });
      dispatch(setNotification({ message: response.message, severity: "success", open: true }));
      navigate('/list-all-chits')
    } catch (error) {
      const errorMessage = error.message || "Something went wrong";
      dispatch(setNotification({ message: errorMessage, severity: "error", open: true }));
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh", padding: "20px" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box
          sx={{
            backgroundColor: "background.paper", // Responsive background for both themes
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            Login
          </Typography>

          <Box component="form" onSubmit={handleSubmitLogin}>
            <TextField
              label="Email"
              fullWidth
              value={email}
              onChange={handleEmailChange}
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}  // Toggle between text and password
              fullWidth
              value={password}
              onChange={handlePasswordChange}
              margin="normal"
              variant="outlined"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Log In
            </Button>
            <Grid container justifyContent="space-between" marginTop={2}>
              <Grid item>
                <Link href="/signup" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
              <Grid item>
                <Link href="/fgt-psd" variant="body2">
                  Forgot Password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
