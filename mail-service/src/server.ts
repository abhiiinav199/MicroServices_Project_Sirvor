import app from "./app.js";
import dotenv from "dotenv"
dotenv.config()

const PORT= process.env.PORT || 4002

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