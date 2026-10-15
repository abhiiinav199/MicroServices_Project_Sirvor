import otpGenerator from "otp-generator"
import { UserModel } from "../models/user.model.js"
import { OtpModel } from "../models/otp.model.js"
import { sendMailTemplate } from "../mail-template/mailTemplate.js"
import axios from "axios"

export interface IForgotPasswordData{
    email: string
}
export const forgotPasswordServices= async(data:IForgotPasswordData)=>{

    const {email} = data 

    // check user exist or not
    const isUserExist = await UserModel.findOne({email:email})

    // generate new otp
    const otp = await otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    

    // save this otp in db
    const newOtp = await OtpModel.create({
        otp:Number(otp),
        email: email
    })

    const mailData= {
  email: email,
  subject: "For Otp verification",
  body:sendMailTemplate(newOtp.otp),
  from: "Sirvor"
}
const mailServiceCall = await axios.post("http://localhost:3002/api/v1/send-email",mailData)

return newOtp;
}