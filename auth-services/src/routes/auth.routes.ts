import express from "express"
import { signUpController } from "../controllers/auth.controller.js"

const authRouter= express.Router()

authRouter.post("/signup", signUpController)

export default authRouter