import { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, Stack } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import {sendOtp, validate, resetPassword} from '../api';
import { setNotification } from "../slices/notificationSlice";
import { useDispatch } from "react-redux";
import { Password } from "@mui/icons-material";

export default function ForgotPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type') || 'forgot_password';
  
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailFromUrl = queryParams.get('email');
    const typeFromUrl = queryParams.get('type');
    if (typeFromUrl === 'signup' && emailFromUrl) {
      setEmail(emailFromUrl);
      setStep(2);
  }
  }, [location.search]); 

  const handleSendOTP = async() => {
    try {
      const response = await sendOtp({ email: email, type: type  });
      dispatch(setNotification({ message: response.message, severity: "success", open: true }));
      setStep(2);
    } catch (error) {
      const errorMessage = error.message || "Something went wrong";
      dispatch(setNotification({ message: errorMessage, severity: "error", open: true }));
    }
  };

  const handleVerifyOTP = async() => {
    try {
      const response = await validate({ email: email, otp : otp , type : type });
      dispatch(setNotification({ message: response.message, severity: "success", open: true }));
      if(type === 'signup'){
        navigate('/login')
      }else{
        setStep(3);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong";
      dispatch(setNotification({ message: errorMessage, severity: "error", open: true }));
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      dispatch(setNotification({ message: 'Both passwords donot match.', severity: "error", open: true }));
    }else{
      try {
        const response = await resetPassword({ email: email, password : newPassword });
        dispatch(setNotification({ message: response.message, severity: "success", open: true }));
        navigate('/login')
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(setNotification({ message: errorMessage, severity: "error", open: true }));
      }
    }
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
          <Button variant="contained" onClick={handleSendOTP}>Send OTP</Button>
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
