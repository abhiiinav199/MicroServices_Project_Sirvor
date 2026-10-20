import express, { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";
import { sendEmailUser } from "../services/otp.service.js";
import { ApiResponse } from "../types/apiResponse.types.js";
import { loginService, singUpService } from "../services/auth.service.js";
import {
  forgotPasswordServices,
  forgotPasswordVerifyOtpService,
  resetPasswordService,
  updatePasswordService,
} from "../services/password.service.js";
import { error } from "console";

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
      message: "Otp sent on your email.",
      data: newOtp,
    } as ApiResponse<typeof newOtp>);
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

    const newUser = await singUpService({
      fullName,
      email,
      password,
      role,
      otp,
    });

    const cookieOptions = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    } as const;

    res.cookie("token", newUser.token, cookieOptions);

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

    // call login service
    const user = await loginService({ email, password });

    const cookieOptions = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    } as const;

    res.cookie("token", user.token, cookieOptions);

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
      data: forgetPassword,
    } as ApiResponse<typeof forgetPassword>);
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
    const userHeader = req.headers["x-user"] as string ;
    const userData =userHeader ? JSON.parse(userHeader) : null;
    const userId = userData?.id
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
