import express, { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";
import { sendEmailUser } from "../services/otp.service.js";
import { ApiResponse } from "../types/apiResponse.types.js";
import { loginService, logoutSeviceCall, refreshTokenService, signUpService } from "../services/auth.service.js";
import {
  forgotPasswordServices,
  forgotPasswordVerifyOtpService,
  resetPasswordService,
  updatePasswordService,
} from "../services/password.service.js";
import { getRedisClient } from "../config/redis.config.js";

export const sendEmailController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { fullName, password, email, role, confirmPassword } = req.body;

    // validation
    if (!fullName || !password || !email || !role || !confirmPassword) {
      throw new ApiError("Please fill all the details", 400);
    }

    if (password.length < 3) {
      throw new ApiError(
        "Please add at least 3 characters, your password is too short",
        422,
      );
    }
    if (password !== confirmPassword) {
      throw new ApiError("Password and confirm password doesn't match", 422);
    }

    //service call
    const newOtp = await sendEmailUser({
      email,
    });

    //  return response
    res.status(201).json({
      success: true,
      error: false,
      message: "Otp sent on your email.",
    } as ApiResponse<null>);
  } catch (error) {
    next(error); // Error handler middleware
  }
};

export const signUpController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { fullName, email, password, role, confirmPassword, otp } = req.body;
    if (!fullName || !email || !password || !role || !confirmPassword) {
      throw new ApiError("Something went wrong", 400);
    }
    if (password !== confirmPassword) {
      throw new ApiError("Something went wrong", 400);
    }

    if (!otp) {
      throw new ApiError("Please fill the otp", 400);
    }

    if (String(otp).length < 4) {
      throw new ApiError("Please fill valid otp", 400);
    }

    // call signUp service

    const newUser = await signUpService({
      fullName,
      email,
      password,
      role,
      otp,
    });

    const cookieOptions = {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    } as const;

    res.cookie("refreshToken", newUser.refreshToken, cookieOptions);

    newUser.refreshToken = undefined;

    return res.status(201).json({
      success: true,
      error: false,
      message: "User registered successfully.",
      data: newUser,
    } as ApiResponse<typeof newUser>);
  } catch (error) {
    next(error);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError("Please fill all the details", 400);
    }

    //redis call
    const redisClient = getRedisClient();

    //fetch user ipAddress
    const clientIpAddress = req.ip;
    const key = `${clientIpAddress}:request_count`;

    const requestCount = await redisClient.incr(key);

    // Pehli request par TTL set (60 seconds ka window)
    if (requestCount === 1) {
      await redisClient.expire(key, 60);
    }
    // Check - limit exceed or not
    if (requestCount > 5) {
      throw new ApiError(
        "Too many login attempts. Please try again after 1 minute.",
        429,
      );
    }

    // call login service
    const user = await loginService({ email, password });

    const cookieOptions = {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    } as const;

    res.cookie("refreshToken", user.refreshToken, cookieOptions);

    user.refreshToken = undefined;

    res.status(200).json({
      error: false,
      success: true,
      message: "Login Successfull",
      data: user,
    } as ApiResponse<typeof user>);
  } catch (error) {
    next(error);
  }
};

export const forgotPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new ApiError("Please Provide email", 400);
    }

    //call the forgotPasswordServices
    const forgetPassword = await forgotPasswordServices({ email });

    res.status(200).json({
      error: false,
      success: true,
      message: "OTP sent to your mail",
    } as ApiResponse<null>);
  } catch (error) {
    next(error);
  }
};

export const forgotPasswordVerifyOtpController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      throw new ApiError("Please fill the otp", 400);
    }

    if (String(otp).length !== 4) {
      throw new ApiError("Please provide a valid 4-digit OTP", 400);
    }

    // call forgotPasswordVerifyOtpService
    const forgotPasswordVerify = await forgotPasswordVerifyOtpService({
      email,
      otp,
    });

    res.status(200).json({
      error: false,
      success: true,
      message: "Otp verification successfull",
      data: forgotPasswordVerify,
    } as ApiResponse<typeof forgotPasswordVerify>);
  } catch (error) {
    next(error);
  }
};

export const resetPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // fetch data
    const { password, confirmPassword, token } = req.body;

    if (!password || !confirmPassword) {
      throw new ApiError("Please fill all the details", 400);
    }

    if (!token) {
      throw new ApiError("Something went wrong while fetching token", 400);
    }

    if (password !== confirmPassword) {
      throw new ApiError("Password and Confirm Password does not matched", 422);
    }
    if (password.length < 3) {
      throw new ApiError("Password is too short", 422);
    }

    //call resetPasswordService
    const resetPassword = await resetPasswordService({ password, token });

    return res.status(200).json({
      error: false,
      success: true,
      message: "Pasword reset successfully ",
    } as ApiResponse<null>);
  } catch (error) {
    next(error);
  }
};

export const updatePasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // 1. Get verified userId directly from Gateway headers (do NOT JSON.parse)
    const userHeader = req.headers["x-user"] as string;
    const userData = userHeader ? JSON.parse(userHeader) : null;
    const userId = userData?.userId || userData?.id;
    if (!userId) {
      throw new ApiError("Unauthorized, user identification missing", 401);
    }

    const { password, oldPassword, confirmPassword } = req.body;

    if (!password || !oldPassword || !confirmPassword) {
      throw new ApiError("Please fill all the input fields", 400);
    }

    if (password !== confirmPassword) {
      throw new ApiError("Something went wrong", 400);
    }

    if (password === oldPassword) {
      throw new ApiError("Old and new password is same", 409);
    }

    // call updatePasswordService
    const updatedPassword = await updatePasswordService({
      userId,
      password,
      oldPassword,
    });

    return res.status(200).json({
      error: false,
      success: true,
      message: "Password changed successfully",
    } as ApiResponse<typeof updatedPassword>);
  } catch (error) {
    next(error);
  }
};

export const refreshTokenController= async(req: Request, res: Response, next: NextFunction)=>{
  try {
    const refreshToken = req.cookies.refreshToken

    //validation
    if(!refreshToken){
      throw new ApiError("Refresh token missing", 401)
    }
    
    // call refreshTokenService
    const refreshTokenServiceCall = await refreshTokenService({refreshToken})


    const cookieOptions = {
     maxAge:7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    } as const;

    // res.cookie("refreshToken", newUser.refreshToken, cookieOptions);
    res.cookie("refreshToken", refreshTokenServiceCall.newRefreshToken, cookieOptions)

return res.status(200).json({
  success: true,
  error: false,
  message: "New Access Token send successfully",
  data: {
    accessToken: refreshTokenServiceCall.accessToken,
  },
} as ApiResponse<{ accessToken: string }>);


  } catch (error) {
    next(error)
  }
}

export const logoutController= async (req : Request , res: Response, next: NextFunction)=>{
  try {
    const refreshToken= req.cookies.refreshToken

    if(!refreshToken){
       res.status(200).json({
      error: false,
      success: true,
      message:"Logout Successfully"
    }as ApiResponse<null>)
    }

    //logoutService call
    const logoutService = await logoutSeviceCall({refreshToken})
    
    res.clearCookie("refreshToken")

    res.status(200).json({
      error: false,
      success: true,
      message:"Logout Successfully"
    }as ApiResponse<null>)

  } catch (error) {
    next(error)
  }
}