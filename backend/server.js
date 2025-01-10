import express from "express";
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';
import notificationRouter from './routes/notification.route.js';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";



dotenv.config({
    path: "../.env"
})

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express()

app.use(express.json({ limit: "5mb" })); // to parse req.body
// limit shouldn't be too high to prevent DOS
app.use(express.urlencoded({ extended: true })); // to parse form data(urlencoded)


app.use(bodyParser.json())
app.use(cookieParser());

const PORT = process.env.PORT || 5000
connectDB()

app.use("/api/auth", authRouter)
app.use('/api/users', userRouter)
app.use("/api/posts", postRouter);
app.use("/api/notifications", notificationRouter)

app.listen(PORT, ()=>{
    console.log(`Server listening on port : ${PORT}`)
})

