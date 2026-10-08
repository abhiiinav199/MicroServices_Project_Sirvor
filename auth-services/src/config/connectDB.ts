import mongoose from "mongoose"

export const connectDB= async():Promise<void>=>{
try {
    if(!process.env.MONGO_URI){
       throw new Error("MONGO_URI not found in .env file")
    }
   const db = await mongoose.connect(process.env.MONGO_URI) 
   console.log("Auth service connected to db successfully")

} catch (error) {
    if(error instanceof Error){
        console.log("MongoDb connection error", error.message)
        process.exit(1)
    }else{
        console.log("Auth service db connection failed with unknown error", error)
        process.exit(1)
    }
}
}