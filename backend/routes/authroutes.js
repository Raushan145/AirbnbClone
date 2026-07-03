import express from "express";
import { SignIn, SignUp, SignOut, sendOtp, verifyOtp, resetPassword, googleAuth } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", SignUp);
authRouter.post("/signin", SignIn);
authRouter.post("/logout", SignOut);
authRouter.get("/signout", SignOut);
authRouter.post("/send-otp", sendOtp);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/reset-password", resetPassword);
authRouter.post("/google-auth", googleAuth);




export default authRouter;