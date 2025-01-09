import express from "express";
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js'
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";



dotenv.config({
    path: "../.env"
})

const app = express()

app.use(bodyParser.json())
app.use(cookieParser());

const PORT = process.env.PORT || 5000
connectDB()

app.use("/api/auth", authRouter)
app.use('/api/users', userRouter)

app.listen(PORT, ()=>{
    console.log(`Server listening on port : ${PORT}`)
})

