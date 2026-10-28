import otpGenerator from "otp-generator";
import { UserModel } from "../models/user.model.js";
import { sendMailTemplate } from "../mail-template/mailTemplate.js";
import axios from "axios";
import { ApiError } from "../utils/ApiError.js";
import crypto from "crypto";
import { hashPassword } from "../utils/hashPassword.js";
import { comparePassword } from "../utils/comparePassword.js";
import { getRedisClient } from "../config/redis.config.js";

export interface IForgotPasswordData {
  email: string;
}

export interface IForgotPasswordVerifyOtpData extends IForgotPasswordData {
  otp: number;
}

export interface IResetPasswordData {
  password: string;
  token: string;
}

export interface IUpdatePasswordData {
  userId: string;
  password: string;
  oldPassword: string;
}
export const forgotPasswordServices = async (data: IForgotPasswordData) => {
  const { email } = data;

  // check user exist or not
  const isUserExist = await UserModel.findOne({ email: email });

  if (!isUserExist) {
    throw new ApiError("Please provide valid email, User not found", 404);
  }

  // generate new otp
  const otp = await otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  // save this otp in redis
  const redisClient = getRedisClient();
  const storedOtp = await redisClient.set(`forgot_password_otp:${email}`, otp,{
    EX: 300
  });   
 

  const mailData = {
    email: email,
    subject: "For Otp verification",
    body: sendMailTemplate(Number(storedOtp)),
    from: "Sirvor",
  };
  const mailServiceCall = await axios.post(
    "http://localhost:3002/api/v1/send-email",
    mailData,
  );

  return storedOtp;
};

export const forgotPasswordVerifyOtpService = async (
  data: IForgotPasswordVerifyOtpData,
) => {
  const { email, otp } = data;

   // 1. Verify forgot password OTP from Redis
   const redisClient = getRedisClient();
   const storedOtp = await redisClient.get(`forgot_password_otp:${email}`);

   if (!storedOtp) {
    throw new ApiError(
      "OTP expired or not found. Please request a new OTP.",
      404,
    );
  }
  if (storedOtp !== String(otp)) {
    throw new ApiError("Invalid OTP. Please try again.", 422);
  } 
  //genrate token using crypto
  const token = crypto.randomBytes(32).toString("hex");

  const updatedUser = await UserModel.findOneAndUpdate(
    { email: email },
    { resetToken: token, resetTokenExpiry: Date.now() + 10 * 60 * 1000 },
    { returnDocument: "after", runValidators: true },
  );


};

export const resetPasswordService = async (data: IResetPasswordData) => {
  const { password, token } = data;

  // find the user with the help of token
  const userDetails = await UserModel.findOne({ resetToken: token });

  // validation
  if (!userDetails) {
    throw new ApiError("Session expired", 404);
  }
  if (userDetails.resetTokenExpiry < Date.now()) {
    throw new ApiError("Session expired", 401);
  }

  const hashedPassword = await hashPassword(password);

  //update the user
  const updatedUser = await UserModel.findOneAndUpdate(
    { resetToken: token },
    {
      password: hashedPassword,
      $unset: { resetToken: 1, resetTokenExpiry: 1 },
    },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );

  return updatedUser;
};

export const updatePasswordService = async (data: IUpdatePasswordData) => {
  const { userId, password, oldPassword } = data;

  const userDetails = await UserModel.findById(userId).select("+password");

  if (!userDetails) {
    throw new ApiError("User not found", 404);
  }

  // verify old password
  const isMatchedPassword = await comparePassword({
    oldPassword,
    dbPassword: userDetails.password,
  });

  if (!isMatchedPassword) {
    throw new ApiError("Old password not matched", 422);
  }

  // hash password
  const hashedPassword = await hashPassword(password);

  // update user password
  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    {
      password: hashedPassword,
    },
    { returnDocument: "after", runValidators: true },
  );

  return { message: "Password updated successfully" };
};
