import { transporter } from "../config/mail.config.js";
import { IMailData } from "../controllers/mail.controller.js";

export const sendEmailService= async(data:IMailData) =>{
    const {email, subject, body, from} = data

     let info= await transporter.sendMail({
            from: data.from,
            to: data.email,
            subject: data.subject,
            html: data.body 
        })
        return info
}