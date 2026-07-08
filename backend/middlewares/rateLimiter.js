import rateLimit from "express-rate-limit";

// Login
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many login attempts. Try again after 15 minutes."
  }
});

// Register
export const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: {
    success: false,
    message: "Too many registration attempts. Try again after 15 minutes."
  }
});

// Send OTP
export const sendOtpLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 1,
  message: {
    success: false,
    message: "Please wait 1 minute before requesting another OTP."
  }
});

// Verify OTP
export const verifyOtpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many OTP verification attempts."
  }
});

// Forgot Password
export const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: {
    success: false,
    message: "Too many password reset requests."
  }
});

// Contact Form
export const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many contact requests."
  }
});

// Reviews
export const reviewLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many review submissions."
  }
});

// General API
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests. Please try again later."
  }
});

