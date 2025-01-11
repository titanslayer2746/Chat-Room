import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import { deleteNotifications, getNotifications } from "../controllers/notification.controller.js";

//DECLARING router
const router = express.Router();

//CREATING routes for notifications
router.get("/", protectRoute, getNotifications);
router.delete("/", protectRoute, deleteNotifications);

export default router;