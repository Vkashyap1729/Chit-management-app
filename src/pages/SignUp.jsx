import { useState } from "react";
import { Grid, TextField, Box, Button, Typography, Link } from "@mui/material";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSubmitSignUp = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      console.log("Signing up with", email, password);
    } else {
      console.error("Passwords don't match");
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
            Sign Up
          </Typography>

          <Box component="form" onSubmit={handleSubmitSignUp}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            variant="outlined"
            required
            sx={{
                "& label.Mui-focused": {
                color: (theme) =>
                    theme.palette.mode === "dark" ? theme.palette.primary.light : theme.palette.primary.main,
                },
                "& .MuiOutlinedInput-root": {
                "& fieldset": {
                    borderColor: (theme) =>
                    theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.23)",
                },
                "&:hover fieldset": {
                    borderColor: (theme) =>
                    theme.palette.mode === "dark" ? theme.palette.primary.light : theme.palette.primary.dark,
                },
                "&.Mui-focused fieldset": {
                    borderColor: (theme) =>
                    theme.palette.mode === "dark" ? theme.palette.primary.main : theme.palette.primary.dark,
                },
                },
            }}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={handlePasswordChange}
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              margin="normal"
              variant="outlined"
              required
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
