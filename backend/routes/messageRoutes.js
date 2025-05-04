import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getMessages, sendMessage } from "../controllers/messageController.js";

const router = express.Router({ mergeParams: true });

// everything here also requires auth
router.use(protectRoute);

/**
 * GET  /api/conversations/:conversationId/messages
 * POST /api/conversations/:conversationId/messages
 */
router.use(protectRoute);
router.get("/", getMessages);
router.post("/", sendMessage);

export default router;
