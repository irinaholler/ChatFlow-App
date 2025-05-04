import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import { CheckCheck } from "lucide-react";

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();

    // 1️⃣ who sent it?
    const senderId =
        typeof message.senderId === "object" ? message.senderId._id : message.senderId;
    const fromMe = senderId === authUser._id;

    // 2️⃣ avatar (other side)
    let profilePic = authUser.profilePic;
    if (!fromMe && selectedConversation?.participants) {
        const other = selectedConversation.participants.find(p => p._id !== authUser._id);
        profilePic = other?.profilePic || "/placeholder.jpg";
    }

    // 3️⃣ bubble colour
    const bubble = fromMe
        ? "bg-blue-600 text-white"
        : "bg-slate-700 text-slate-100";

    const formattedTime = message.createdAt
        ? extractTime(message.createdAt)
        : "??:??";

    return (
        <div className={`flex ${fromMe ? "justify-end" : "justify-start"}`}>
            {/* avatar */}
            {!fromMe && (
                <img
                    src={profilePic}
                    alt="avatar"
                    className="mr-2 h-8 w-8 rounded-full object-cover self-end"
                />
            )}

            {/* bubble */}
            <div
                className={`group relative max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow
          ${bubble} ${message.shouldShake ? "animate-shake" : ""}
        `}
            >
                {/* message text */}
                <span className="whitespace-pre-wrap break-words">
                    {message.text ?? message.message}
                </span>

                {/* sent‑tick & timestamp */}
                <span
                    className="absolute -bottom-4 right-0 flex items-center gap-1 text-[10px] text-slate-400
            opacity-0 transition-opacity group-hover:opacity-100"
                >
                    {fromMe && <CheckCheck size={12} />}
                    {formattedTime}
                </span>
            </div>

            {/* avatar on the right for my own msgs (optional) */}
            {fromMe && (
                <img
                    src={profilePic}
                    alt="avatar"
                    className="ml-2 h-8 w-8 rounded-full object-cover self-end opacity-0 md:opacity-100"
                />
            )}
        </div>
    );
};

export default Message;
