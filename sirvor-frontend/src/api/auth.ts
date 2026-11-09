import type { loginPayload, signUpPayload } from "../types/auth"
import api from "./axios"



export const signUpMailSendApi = (data: signUpPayload) =>{
    return api.post("/send-mail-auth", data)
}

export const registerUser = (data:signUpPayload)=>{
    return api.post("/signUp", data)
}

export const loginUserApi= (data: loginPayload)=>{
    return api.post("/login", data)
}