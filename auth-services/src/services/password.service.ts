import otpGenerator from "otp-generator"
import { UserModel } from "../models/user.model.js"
import { OtpModel } from "../models/otp.model.js"
import { sendMailTemplate } from "../mail-template/mailTemplate.js"
import axios from "axios"
import { ApiError } from "../utils/ApiError.js"
import crypto from "crypto"
import { hashPassword } from "../utils/hashPassword.js"
import { comparePassword } from "../utils/comparePassword.js"

export interface IForgotPasswordData{
    email: string
}

export interface IForgotPasswordVerifyOtpData extends IForgotPasswordData{
    otp: number
}

export interface IResetPasswordData{
    password: string,
    token:string
}

export interface IUpdatePasswordData{
    userId: string,
    password: string,
    oldPassword: string
}
export const forgotPasswordServices= async(data:IForgotPasswordData)=>{

    const {email} = data 

    // check user exist or not
    const isUserExist = await UserModel.findOne({email:email})

    if(!isUserExist){
        throw new ApiError("Please provide valid email, User not found",404)
    }



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

export const forgotPasswordVerifyOtpService= async(data:IForgotPasswordVerifyOtpData)=>{

    const {email, otp}= data;

    const [latestOtp] = await Promise.all([
        OtpModel.findOne({email:email}).sort({
            createdAt: -1
        })
    ])

    if(!latestOtp){
        throw new ApiError("Otp not found or expired", 404)
    }

    if(latestOtp.otp !== Number(otp)){
        throw new ApiError("Otp not matched", 422)
    }

    //genrate token using crypto
    const token = crypto.randomBytes(32).toString("hex")

    const updatedUser =await UserModel.findOneAndUpdate({email: email}, {resetToken: token, resetTokenExpiry: Date.now()+ 10*60 *1000}, {returnDocument: "after", runValidators: true})

    await OtpModel.deleteMany({ email: email });

    return updatedUser
}


export const resetPasswordService= async(data: IResetPasswordData)=>{

    const {password , token} = data

    // find the user with the help of token
    const userDetails = await UserModel.findOne({resetToken:token})

    // validation
    if(!userDetails){
        throw new ApiError("Session expired", 404)
    }
    if(userDetails.resetTokenExpiry < Date.now()){
        throw new ApiError("Session expired",401)
    }

    const hashedPassword= await hashPassword(password)

    //update the user   
    const updatedUser = await UserModel.findOneAndUpdate(
  { resetToken: token },
  {
    password: hashedPassword,
    $unset: { resetToken: 1, resetTokenExpiry: 1 }
  },
  {
    returnDocument: "after",
    runValidators: true
  }
);

return updatedUser
}

export const updatePasswordService = async(data:IUpdatePasswordData)=>{
    const {userId, password, oldPassword,}= data

    const userDetails= await UserModel.findById(userId).select("+password")

    if(!userDetails){
        throw new ApiError("User not found", 404)
    }

    // verify old password
    const isMatchedPassword = await comparePassword({
        oldPassword,
        dbPassword: userDetails.password
    });

    if(!isMatchedPassword){
        throw new ApiError("Old password not matched",422)
    }

    // hash password
    const hashedPassword= await hashPassword(password)

    // update user password
    const updatedUser= await UserModel.findByIdAndUpdate(userId, {
        password:hashedPassword
    },{returnDocument:"after", runValidators: true})

    return {message: "Password updated successfully"}
}