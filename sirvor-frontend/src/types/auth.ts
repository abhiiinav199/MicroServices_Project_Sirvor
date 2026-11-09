export interface signUpPayload{
    fullName: string,
    role:string,
    email: string,
    password: string,
    confirmPassword: string,
    otp?: string
}

export interface loginPayload{
    email: string,
    password: string,
}