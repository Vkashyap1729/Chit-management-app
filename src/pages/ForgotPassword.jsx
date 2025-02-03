import { useState } from "react";
import { Box, TextField, Button, Typography, Stack } from "@mui/material";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSendOTP = () => {
    console.log("Sending OTP to", email);
    setStep(2);
  };

  const handleVerifyOTP = () => {
    console.log("Verifying OTP", otp);
    setStep(3);
  };

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Password Reset Successful");
    setStep(1);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "background.paper" }}>
      <Typography variant="h5" gutterBottom>
        {step === 1 ? "Forgot Password" : step === 2 ? "Enter OTP" : "Reset Password"}
      </Typography>
      {step === 1 && (
        <Stack spacing={2}>
          <TextField label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button variant="contained" onClick={handleSendOTP}>Send OTP</Button>
        </Stack>
      )}
      {step === 2 && (
        <Stack spacing={2}>
          <TextField label="Enter OTP" fullWidth value={otp} onChange={(e) => setOtp(e.target.value)} />
          <Button variant="contained" onClick={handleVerifyOTP}>Verify OTP</Button>
        </Stack>
      )}
      {step === 3 && (
        <Stack spacing={2}>
          <TextField label="New Password" type="password" fullWidth value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <TextField label="Confirm Password" type="password" fullWidth value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <Button variant="contained" onClick={handleResetPassword}>Reset Password</Button>
        </Stack>
      )}
    </Box>
  );
}
