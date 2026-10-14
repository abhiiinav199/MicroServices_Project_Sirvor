import express from "express"
import { loginController, sendEmailController, signUpController } from "../controllers/auth.controller.js"

const authRouter= express.Router()

authRouter.post("/send-mail-auth", sendEmailController)
authRouter.post('/signUp', signUpController)
authRouter.post("/login", loginController)

export default authRouter