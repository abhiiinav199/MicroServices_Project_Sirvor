import dotenv from "dotenv"
dotenv.config()
import app from "./app.js";

const PORT= process.env.PORT || 4003

const startServer = async()=>{
    try {
        
        app.listen(PORT, ()=>{
            console.log(`Mail service is successfully running at port number: "http://localhost:${process.env.PORT}"`)
        })
        
    } catch (error) {
        console.log(error)
    }
}
startServer()