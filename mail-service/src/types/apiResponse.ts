
export interface ApiResponse<T>{
    error: false,
    success: true,
    message?: string
    data?: T
}