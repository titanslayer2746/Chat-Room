import express from "express";
import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path: "../.env"
})

const app = express()
const PORT = process.env.PORT || 5000

connectDB()

app.listen(PORT, ()=>{
    console.log(`Server listening on port : ${PORT}`)
})

