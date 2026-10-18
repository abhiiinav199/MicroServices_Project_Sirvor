import express from "express"
import { forgotPasswordController, forgotPasswordVerifyOtpController, loginController, resetPasswordController, sendEmailController, signUpController } from "../controllers/auth.controller.js"

const authRouter= express.Router()

authRouter.post("/send-mail-auth", sendEmailController)
authRouter.post('/signUp', signUpController)
authRouter.post("/login", loginController)
authRouter.post("/forgot-password", forgotPasswordController)
authRouter.put("/forgot-password-verify-otp", forgotPasswordVerifyOtpController)
authRouter.put("/reset-password",resetPasswordController)
export default authRouter