import express from "express"
import { sendEmailController } from "../controllers/auth.controller.js"

const authRouter= express.Router()

authRouter.post("/send-mail-auth", sendEmailController)

export default authRouter