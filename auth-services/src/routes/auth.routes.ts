import express from "express"
import { forgotPasswordController, loginController, sendEmailController, signUpController } from "../controllers/auth.controller.js"

const authRouter= express.Router()

authRouter.post("/send-mail-auth", sendEmailController)
authRouter.post('/signUp', signUpController)
authRouter.post("/login", loginController)
authRouter.post("/forgot-password", forgotPasswordController)
export default authRouter