import express from "express";
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';
import notificationRouter from './routes/notification.route.js';
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
// DOTENV configuration
dotenv.config({
    path: ".env"
})

//CLOUDINARY configuration
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// SERVER creation
const app = express()

// PARSE req.body
app.use(express.json({ limit: "5mb" })); 

// PARSE form data(urlencoded)
app.use(express.urlencoded({ extended: true })); 

// PARSE cookies
app.use(cookieParser());

// PORT selection
const PORT = process.env.PORT || 5000
const __dirname = path.resolve();

// ROUTES handling
app.use("/api/auth", authRouter)
app.use('/api/users', userRouter)
app.use("/api/posts", postRouter);
app.use("/api/notifications", notificationRouter)

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

// LISTENING to the server
app.listen(PORT, ()=>{
	connectDB();
    console.log(`Server listening on port : ${PORT}`)
})

