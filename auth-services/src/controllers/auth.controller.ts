import express,{NextFunction, Request, Response} from "express"
import { ApiError } from "../utils/ApiError.js";

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

     


} catch (error) {
      next(error); // Error handler middleware
}
}