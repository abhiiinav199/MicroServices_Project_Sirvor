import axios from "axios";
import { UserModel } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import otpGenerator from "otp-generator"
import { sendMailTemplate } from "../mail-template/mailTemplate.js";
import { getRedisClient } from "../config/redis.config.js";
import dotenv from "dotenv"
dotenv.config()

export interface IUserData {
  email: string;
}
export const sendEmailUser = async (data: IUserData) => {
  const { email } = data;

  const isUserExist = await UserModel.findOne({ email: email });

  if(isUserExist){
    throw new ApiError("Email already registered", 409)
  }
const newOtp = await otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

// save otp in redis
const redisClient = getRedisClient()
await redisClient.set(`signup_otp:${email}`, newOtp,{
  EX: 300
})


const mailData= {
  email: email,
  subject: "For Otp verification",
  body:sendMailTemplate(Number(newOtp)),
  from: "Sirvor"
}
await axios.post(`${process.env.MAIL_SERVICE_URL}/api/v1/send-email`, mailData)

  
};
