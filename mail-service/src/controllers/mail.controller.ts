import express, {NextFunction, Request,Response} from "express"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../types/apiResponse.js"
import { sendEmailService } from "../services/mail.services.js"

export interface IMailData{
    email: string,
    subject: string,
    body: string,
    from: string
}
export const sendMailConroller= async (req: Request, res: Response, next: NextFunction)=>{
try {

    const {email, subject, body, from} = req.body as IMailData
    
    //validation
    if(!email || !subject|| !body || !from ){
        throw new ApiError("Data is not sufficient to send mail", 400)
    }

    // mail service
    const mailSend= await sendEmailService({email, subject, body, from})
    res.status(200).json({
        message: "Otp sent successfully"
    }as ApiResponse<null>)
} catch (error) {
    next(error)
}
}