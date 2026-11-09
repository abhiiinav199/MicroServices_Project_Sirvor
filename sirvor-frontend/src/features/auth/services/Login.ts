import { loginUserApi } from "../../../api/auth"
import type { loginPayload } from "../../../types/auth"

export const loginUserApiCall =async (data: loginPayload) =>{
    const res= await loginUserApi(data)

    if(!res.data.success){
        throw new Error("Error occured during jotp verify api call")
    }
    return res.data

}