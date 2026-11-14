import { forgotPasswordApi, forgotPasswordOtpVerifyApi } from "../../../api/auth"
import type { forgotPasswordOtpVerifyPayload, forgotPasswordPayload } from "../../../types/auth"



export const forgotPasswordApiCall =async (data: forgotPasswordPayload) =>{
    const res= await forgotPasswordApi(data)

    if(!res?.data?.success){
        throw new Error("Error occured during forgot password api call")
    }
    return res.data

}

export const forgotPasswordOtpApiCall = async(data: forgotPasswordOtpVerifyPayload)=>{
    const res = await forgotPasswordOtpVerifyApi(data)
    if(!res?.data?.success){
        throw new Error("Error occured during forgot password api call")
    }
    return res.data
}