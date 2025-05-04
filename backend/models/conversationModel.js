import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants: [
        { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
    ],
    // keep this array if you want to push message IDs here:
    messages: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Message", default: [] }
    ]
}, { timestamps: true });

// enforce that combination of two users is unique:
conversationSchema.index(
    { participants: 1 },
    {
        unique: true,
        partialFilterExpression: { participants: { $size: 2 } }
    }
);

export default mongoose.model("Conversation", conversationSchema);
