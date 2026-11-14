import { forgotPasswordApi } from "../../../api/auth"
import type { forgotPasswordPayload } from "../../../types/auth"



export const forgotPasswordApiCall =async (data: forgotPasswordPayload) =>{
    const res= await forgotPasswordApi(data)

    if(!res?.data?.success){
        throw new Error("Error occured during forgot password api call")
    }
    return res.data

}