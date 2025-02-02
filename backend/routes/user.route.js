import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import { getUserProfile, followUnfollowUser,getSuggestedUsers, updateUser } from "../controllers/user.controller.js";

//DECLARING the router
const router = express.Router();

//CREATING the routes
router.get('/profile/:username',protectRoute, getUserProfile)
router.get("/suggested",protectRoute, getSuggestedUsers)
router.post("/follow/:id",protectRoute, followUnfollowUser)
router.post("/update",protectRoute, updateUser)

export default router;