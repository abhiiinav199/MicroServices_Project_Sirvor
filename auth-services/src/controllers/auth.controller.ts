import express, { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";
import { sendEmailUser } from "../services/otp.service.js";
import { ApiResponse } from "../types/apiResponse.types.js";

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

    if (password.length < 3 ) {
      throw new ApiError(
        "Please add at least 3 characters, your password is too short",
        422,
      );
    }
    if(password !== confirmPassword){

        throw new ApiError("Password and confirm password doesn't match",422)
    }

    //service call
    const newOtp = await sendEmailUser({
      fullName,
      password,
      email,
      role,
      confirmPassword,
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

export const signUpController= async(req: Request , res: Response , next: NextFunction)=>{
  try {
    const {fullName, email , password, role, confirmPassword, otp} = req.body
    if(!fullName || !email || !password || !role || !confirmPassword){
      throw new ApiError("Something went wrong", 400)
    }

    if(!otp){
      throw new ApiError("Please fill the otp",400)
    }

    if(otp.length < 4){
      throw new ApiError("Please fill valid otp", 400)

    }

    // call signUp service
  } catch (error) {
    next(error)
  }
}
