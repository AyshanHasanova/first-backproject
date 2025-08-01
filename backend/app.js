import express from "express"
import dotenv from "dotenv"
import { connectDatabase } from "./config/dbConnect.js"
import cookieParser from "cookie-parser"
import errorMiddleware from "./middlewares/error.js"

const app = express ()

// Router (marsurutlarin daxil edilmesi)
import productRoutes from "./routes/product.js"
import userRoutes from "./routes/user.js"
import authRoutes from "./routes/authrouter.js"

dotenv.config({path: "config/config.env"})


connectDatabase()
app.use(express.json())
app.use(cookieParser())

app.use("/api/v1",productRoutes)
app.use("/api/v1",userRoutes)
app.use("/api/v1",authRoutes)


app.use(errorMiddleware)
app.listen(process.env.PORT, ()=>{
    console.log(`PORTUMUZ DINLENILIR : ${process.env.PORT} ve ${process.env.NODE_ENV} MUHITINDEDIR`)
})