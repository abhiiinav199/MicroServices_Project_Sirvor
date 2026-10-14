import axios from "axios";
import { OtpModel } from "../models/otp.model.js";
import { UserModel } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import otpGenerator from "otp-generator"
import { sendMailTemplate } from "../mail-template/mailTemplate.js";

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

// save otp in db
const savedOtp = await OtpModel.create({email:email,otp: Number(newOtp)})

const mailData= {
  email: email,
  subject: "For Otp verification",
  body:sendMailTemplate(savedOtp.otp),
  from: "Sirvor"
}
const mailServiceCall = await axios.post("http://localhost:3002/api/v1/send-email",mailData)


return savedOtp;
  
};
