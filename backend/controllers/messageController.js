import mongoose from "mongoose";
import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";


export const sendMessage = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const { text } = req.body;
        const senderId = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(conversationId))
            return res.status(400).json({ error: "Invalid conversation id" });

        const conv = await Conversation.findOne({
            _id: conversationId,
            participants: senderId,
        });
        if (!conv) return res.status(403).json({ error: "Not a participant" });

        const msg = await Message.create({ conversationId, senderId, text });
        // update last message preview
        await Conversation.findByIdAndUpdate(conversationId, {
            lastMessage: { text, senderId, createdAt: msg.createdAt },
        });

        // emit via socket.io
        req.io.to(conversationId).emit("newMessage", msg);

        res.status(201).json(msg);
    } catch (err) {
        console.error("sendMessage error:", err);
        res.sendStatus(500);
    }
};

export const getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const { cursor, limit = 30 } = req.query;
        if (!mongoose.Types.ObjectId.isValid(conversationId))
            return res.status(400).json({ error: "Invalid conversation id" });

        const conv = await Conversation.findOne({
            _id: conversationId,
            participants: req.user._id,
        });
        if (!conv) return res.status(403).json({ error: "Not a participant" });

        const query = { conversationId };
        if (cursor) query.createdAt = { $lt: cursor };

        const msgs = await Message.find(query)
            .sort("-createdAt")
            .limit(+limit)
            .lean();

        res.json(msgs.reverse());
    } catch (err) {
        console.error("getMessages error:", err);
        res.sendStatus(500);
    }
};
