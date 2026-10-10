import express from "express"
import { sendEmailController } from "../controllers/auth.controller.js"

const authRouter= express.Router()

authRouter.post("/send-mail", sendEmailController)

export default authRouter