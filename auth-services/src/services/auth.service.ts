import { OtpModel } from "../models/otp.model.js";
import { UserModel } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import otpGenerator from "otp-generator"

interface IUserData {
  fullName: string;
  password: string;
  email: string;
  role: "User" | "Worker" | "Admin";
}
export const registerUser = async (data: IUserData) => {
  const { email, password, fullName, role } = data;

  const isUserExist = await UserModel.findOne({ email: email });

  if(isUserExist){
    throw new ApiError("Email already registered", 409)
  }
const newOtp = await otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

// save otp in db
const savedOtp = await OtpModel.create({email:email,otp: Number(newOtp)})

return savedOtp;
  
};
