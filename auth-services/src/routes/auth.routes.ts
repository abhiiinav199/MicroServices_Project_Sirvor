import express from "express"
import { sendEmailController } from "../controllers/auth.controller.js"

const authRouter= express.Router()

authRouter.post("/signup", sendEmailController)

export default authRouter