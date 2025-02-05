import { useState } from "react";
import { Grid, TextField, Box, Button, Typography, Link, CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { setNotification } from '../slices/notificationSlice'
import { InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { signUp } from '../api'
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const userData = { email, name, password };
      const type = "signup";
      try {
        const response = await signUp(userData);
        dispatch(setNotification({ message: response.message, severity: "success", open: true }));
        navigate(`/fgt-psd?email=${encodeURIComponent(email)}&type=${encodeURIComponent(type)}`);
      } catch (error) {
        // Safely destructure error
        const errorMessage = error.message || "Something went wrong";
        dispatch(setNotification({ message: errorMessage, severity: "error", open: true }));
      }
    } else {
      dispatch(setNotification({ message: "Passwords do not match", severity: "error", open: true }));
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
            backgroundColor: "background.paper",
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmitSignUp}>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              variant="outlined"
              required
              onChange={handleEmailChange}
            />
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              variant="outlined"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={password}
              onChange={handlePasswordChange}
              margin="normal"
              variant="outlined"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              margin="normal"
              variant="outlined"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
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
              Sign Up
            </Button>
            <Grid container justifyContent="center" marginTop={2}>
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUpPage;
