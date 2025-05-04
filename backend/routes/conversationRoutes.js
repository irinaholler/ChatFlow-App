import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getMyConversations, createOrGetDM } from "../controllers/conversationController.js";
import messageRoutes from "./messageRoutes.js";

const router = express.Router();

router.use(protectRoute);

router.get("/", getMyConversations);
router.post("/", createOrGetDM);

// this line now correctly mounts messageRoutes with mergeParams
router.use("/:conversationId/messages", messageRoutes);

export default router;
