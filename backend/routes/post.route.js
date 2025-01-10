import express from "express";
import { getAllPosts,
         getFollowingPosts,
         getLikedPosts,
         getUserPosts,
         createPost,
         likeUnlikePost,
         commentOnPost,
         deletePost } from "../controllers/post.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

//DECLARING the router
const router = express.Router()

//CREATING the routes
router.post("/create", protectRoute, createPost);
router.get("/all", protectRoute, getAllPosts);
router.post("/like/:id", protectRoute, likeUnlikePost);
router.get("/following", protectRoute, getFollowingPosts);
router.get("/likes/:id", protectRoute, getLikedPosts);
router.get("/user/:username", protectRoute, getUserPosts);
router.post("/comment/:id", protectRoute, commentOnPost);
router.delete("/:id", protectRoute, deletePost);


export default router;