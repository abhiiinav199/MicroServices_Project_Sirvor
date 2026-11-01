import express from "express"
import { sendMailConroller } from "../controllers/mail.controller.js"

const mailRouter = express.Router()
 
mailRouter.post("/send-email", sendMailConroller)

export default mailRouter