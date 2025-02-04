import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000", // Set the correct base URL for your backend
  baseURL: "http://13.126.166.15", // Set the correct base URL for your backend
});

// Reusable API function for POST requests
const apiPost = async (url, data) => {
  try {
    const response = await api.post(url, data); // Use the axios instance with the base URL
    return response.data;
  } catch (error) {
    console.error("Error in API call:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const signUp = async (userData) => {
  const url = "/signUp";  // URL for your signUp API endpoint
  return await apiPost(url, userData);
};

export const sendOtp = async (userData) => {
  const url = "/send-otp";  // URL for your signUp API endpoint
  return await apiPost(url, userData);
};

export const validate = async (userData) => {
  const url = "/validate";  // URL for your signUp API endpoint
  return await apiPost(url, userData);
};

export const login = async (userData) => {
  const url = "/login";  // URL for your signUp API endpoint
  return await apiPost(url, userData);
};

export const resetPassword = async (userData) => {
  const url = "/resetPassword";  // URL for your signUp API endpoint
  return await apiPost(url, userData);
};