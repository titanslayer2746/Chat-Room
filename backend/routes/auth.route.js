import express from "express";
import { login, logout, signup, getMe } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

//DECLARING the router
const router = express.Router();

//CREATING routes for authentication
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protectRoute, getMe);

export default router;