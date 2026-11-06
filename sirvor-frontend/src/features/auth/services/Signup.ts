import { signUpMailSendApi } from "../../../api/auth";
import type { signUpPayload } from "../../../types/auth";


export const signUpMailSendApiCall =async (data: signUpPayload) =>{
    const res= await signUpMailSendApi(data)

    if(!res.data.success){
        throw new Error("Error occured during signup mail send api call")
    }
    return res.data

}