import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation",
            required: true,
            index: true,
        },
        senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        text: { type: String, required: true },
        seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }          // ← typo fixed ("timestamps", not "timestemps") :contentReference[oaicite:2]{index=2}&#8203;:contentReference[oaicite:3]{index=3}
);

messageSchema.index({ conversationId: 1, createdAt: -1 });

export default mongoose.model("Message", messageSchema);
