// controllers/conversationController.js
import mongoose from "mongoose";
import Conversation from "../models/conversationModel.js";
import User from "../models/userModel.js";

export const getMyConversations = async (req, res) => {
    try {
        const me = req.user._id;
        const convos = await Conversation.find({ participants: me })
            .sort("-updatedAt")
            .populate("participants", "fullname username profilePic")
            .lean();
        res.json(convos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const createOrGetDM = async (req, res) => {
    try {
        const { userId } = req.body;
        const me = req.user._id.toString();
        if (!mongoose.Types.ObjectId.isValid(userId) || userId === me) {
            return res.status(400).json({ error: "Invalid user id" });
        }

        const other = await User.findById(userId).lean();
        if (!other) {
            return res.status(404).json({ error: "User not found" });
        }

        // either fetch existing or create a new one:
        let convo = await Conversation.findOne({
            participants: { $all: [me, userId], $size: 2 }
        })
            .populate("participants", "fullname username profilePic")
            .lean();

        if (!convo) {
            const newC = await Conversation.create({
                participants: [me, userId]
            });
            convo = await Conversation.findById(newC._id)
                .populate("participants", "fullname username profilePic")
                .lean();
        }

        res.status(201).json(convo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};
