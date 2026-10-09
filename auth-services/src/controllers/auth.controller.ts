import express,{NextFunction, Request, Response} from "express"
import { ApiError } from "../utils/ApiError.js";
import { registerUser } from "../services/auth.service.js";
import { ApiResponse } from "../types/apiResponse.types.js";

const signUpController= async (req: Request , res: Response, next: NextFunction)=>{
try {
    const {fullName,password,email,role} =req.body;
     
    // validation
    if(!fullName || !password || !email || !role){
       throw new ApiError("Please fill all the details",400)
    }

     if(password.length< 3){
         throw new ApiError("Please add at least 3 characters, your password is too short", 422);
     }

     //service call
     const newOtp = await registerUser({fullName,password,email,role})

    //  return response
    res.status(201).json({
        message: "Otp sent on your email.",
        data: newOtp
    }as ApiResponse<typeof newOtp>)

} catch (error) {
      next(error); // Error handler middleware
}
}