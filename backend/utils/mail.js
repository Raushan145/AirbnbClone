import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE || "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendOtpMail =async (to,otp)=>{
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject:"Reset Your Password",
        html:`
        <p>
            Hello,
            We received a request to reset your password.
            Your OTP code is: <b>${otp}</b>
            This OTP is valid for 5 minutes. Please do not share this code with anyone.
            If you did not request a password reset, you can safely ignore this message. </br>
            Thanks,
            Airbnb Clone Raushan Team
        </p>`
    })
}