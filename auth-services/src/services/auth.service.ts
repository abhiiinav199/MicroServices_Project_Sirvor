import { OtpModel } from "../models/otp.model.js";
import { UserModel } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { generateAccessToken } from "../utils/generateAccessToken.js";
import { hashPassword } from "../utils/hashPassword.js";
import bcryptjs from "bcryptjs";

interface IUserSignupData {
  fullName: string;
  password: string;
  email: string;
  role: "User" | "Worker" | "Admin";
  otp: number;
}

interface ILoginData{
  email: string,
  password: string,

}

export const singUpService = async (data: IUserSignupData) => {
  const { fullName, email, password, role, otp } = data;
  const isUserRegistered = await UserModel.findOne({
    email: email,
  });

  if (isUserRegistered) {
    throw new ApiError("Email already registered", 409);
  }

  //find latest otp
  const latestOtp = await OtpModel.findOne({
    email: email,
  }).sort({ createdAt: -1 });

  if (!latestOtp) {
    throw new ApiError("Otp Not Found", 404);
  }
  if (latestOtp.otp !== Number(otp)) {
    throw new ApiError("Otp not found", 422);
  }

  //hashing password
  const hashedPassword = await hashPassword(password);
  // create new user
  const newUser = await UserModel.create({
    fullName: fullName,
    email: email,
    password: hashedPassword,
    role: role,
  });

  //delete otp from db
  await OtpModel.deleteMany({ email: email });

  const payload = {
    userId: newUser._id,
    email: email,
    role: role,
    fullName: fullName,
  };

  const token = await generateAccessToken(payload);
  return {
    user: newUser,
    token: token,
  };
};


export const loginService= async (data: ILoginData)=>{
  const {email,password} = data

  // check this email is registered or not
  const isUserExist = await UserModel.findOne({
    email: email
  })

  if(!isUserExist){
    throw new ApiError("User not exist",404)
  }
 //compare password using bcryptjs
 const checkPassword = await bcryptjs.compare(password, isUserExist.password)

 if(!checkPassword){
  throw new ApiError("Password not matched", 422)
 }

 const payload={
  email: email,
   userId: isUserExist._id,
   fullName: isUserExist.fullName,
   role: isUserExist.role 
 }

 const token= generateAccessToken(payload)

 return {
  user: isUserExist,
  token: token
 }
}