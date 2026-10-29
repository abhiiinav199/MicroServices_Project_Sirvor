import { getRedisClient } from "../config/redis.config.js";
import { UserModel } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { generateAccessToken } from "../utils/generateAccessToken.js";
import { generateRefreshToken } from "../utils/generateRefreshToken.js";
import { hashPassword } from "../utils/hashPassword.js";
import bcryptjs from "bcryptjs";

interface IUserSignupData {
  fullName: string;
  password: string;
  email: string;
  role: "User" | "Worker" | "Admin";
  otp: number;
}

interface ILoginData {
  email: string;
  password: string;
}

export const signUpService = async (data: IUserSignupData) => {
  const { fullName, email, password, role, otp } = data;
  const isUserRegistered = await UserModel.findOne({
    email: email,
  });

  if (isUserRegistered) {
    throw new ApiError("Email already registered", 409);
  }

  // 1. Verify OTP from Redis
  const redisClient = getRedisClient();
  const storedOtp = await redisClient.get(`signup_otp:${email}`);

  if (!storedOtp) {
    throw new ApiError(
      "OTP expired or not found. Please request a new OTP.",
      404,
    );
  }
  if (storedOtp !== String(otp)) {
    throw new ApiError("Invalid OTP. Please try again.", 422);
  }

  // 2. After matching OTP delete it from redis
  await redisClient.del(`signup_otp:${email}`);

  //hashing password
  const hashedPassword = await hashPassword(password);
  // create new user
  const newUser = await UserModel.create({
    fullName: fullName,
    email: email,
    password: hashedPassword,
    role: role,
  });

  const payload = {
    userId: newUser._id.toString(),
    email: email,
    role: role,
    fullName: fullName,
  };

  const refreshTokenPayload= {
    userId : newUser._id
  }
  const accessToken = await generateAccessToken(payload);
  const refreshToken = await generateRefreshToken(refreshTokenPayload);

  //save refresh token redis
  await redisClient.set(`session:${newUser._id}`, refreshToken, {
    EX: 604800,
  });
  // Sensitive data sanitize
  const userResponse = newUser.toObject();
  delete (userResponse as any).password;
  return {
    user: userResponse,
    accessToken: accessToken,
    refreshToken: refreshToken as string | undefined,
  };
};

export const loginService = async (data: ILoginData) => {
  const { email, password } = data;

  // check this email is registered or not
  const isUserExist = await UserModel.findOne({
    email: email,
  }).select("+password");

  if (!isUserExist) {
    throw new ApiError("Invalid email or password", 401);
  }
  //compare password using bcryptjs
  const checkPassword = await bcryptjs.compare(password, isUserExist.password);

  if (!checkPassword) {
    throw new ApiError("Invalid email or password", 401);
  }

  const payload = {
    email: isUserExist.email,
    userId: isUserExist._id.toString(),
    fullName: isUserExist.fullName,
    role: isUserExist.role,
  };

  const accessToken = generateAccessToken(payload);
  const refreshTokenPayload = {
    userId : isUserExist._id.toString()
  }
  const refreshToken = generateRefreshToken(refreshTokenPayload);

  //redis client
  const redisClient= getRedisClient()
  //save refresh token redis
  await redisClient.set(`session:${isUserExist._id}`, refreshToken, {
    EX: 604800,
  });

  //Sensitive data sanitize
  const userResponse = isUserExist.toObject();
  delete (userResponse as any).password;

  return {
    user: userResponse,
    accessToken: accessToken,
    refreshToken: refreshToken as string | undefined,
  };
};
