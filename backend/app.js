import express from "express"
import dotenv from "dotenv"
import { connectDatabase } from "./config/dbConnect.js"
const app = express ()
dotenv.config({path: "config/config.env"})


connectDatabase()
app.listen(process.env.PORT, ()=>{
    console.log(`PORTUMUZ DINLENILIR : ${process.env.PORT} ve ${process.env.NODE_ENV} MUHITINDEDIR`)
})