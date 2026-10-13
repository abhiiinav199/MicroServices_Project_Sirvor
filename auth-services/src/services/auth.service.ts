import { OtpModel } from "../models/otp.model.js";
import { UserModel } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { IUserData } from "./otp.service.js";

interface IUserSignupData {
  fullName: string;
  password: string;
  confirmPassword: string;
  email: string;
  role: "User" | "Worker" | "Admin";
  otp: number;
}

export const singUpService = async (data: IUserSignupData) => {
  const {fullName, email , password, role, confirmPassword, otp} = data
  const isUserRegistered= await UserModel.findOne({
    email:email
  })

  if(isUserRegistered){
    throw new ApiError("Email already registered", 409)
  }

  //find latest otp
  const latestOtp = await OtpModel.findOne({
    email: email
  }).sort({createdAt: -1})

  if(!latestOtp ){
     throw new ApiError("Otp Not Found", 404)
  }
  if(latestOtp.otp !== otp){
    throw new ApiError("Otp not found", 422)
  }

  // create new user
  const newUser= await UserModel.create({
    fullName: fullName,
    email: email,
    password: password,
    role: role

  })





};
