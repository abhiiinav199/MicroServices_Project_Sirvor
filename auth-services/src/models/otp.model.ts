import mongoose from "mongoose";

interface IOtp{
    email: string,
    otp: number
}
const otpSchema = new mongoose.Schema<IOtp>({
    email:{
        type: String,
        required: [true, "Email is required"],
        trim: true
    },
    otp:{
        type: Number,
        required: [true,"Please provide otp."],
        trim: true,
        maxLength: [4, "Please provide valid otp"]
    }
})

export const OtpModel = mongoose.model("Otp", otpSchema)