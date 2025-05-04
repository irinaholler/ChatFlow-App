import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import useOpenConversation from "../../hooks/useOpenConversation";

export default function ConversationRow({ conversation, lastIdx, emoji }) {
    const { selectedConversation, unread } = useConversation();
    const openConversation = useOpenConversation();
    const { onlineUsers } = useSocketContext();

    const userId = conversation._id;
    const convoId = conversation.conversationId || conversation._id;

    const isSelected = selectedConversation?._id === convoId;
    const isOnline = onlineUsers.includes(userId);
    const unreadCount = unread[convoId] || 0;

    const handleClick = async () => {
        await openConversation(userId);
    };

    return (
        <>
            <button
                onClick={handleClick}
                className={`flex w-full items-center gap-3 rounded-xl p-3 transition-colors
          ${isSelected
                        ? "bg-gradient-to-r from-indigo-600 to-indigo-500 ring-2 ring-indigo-400"
                        : "hover:bg-slate-600/60"
                    }`}
            >
                <div className="relative shrink-0">
                    <img
                        src={conversation.profilePic}
                        alt={`${conversation.fullname}’s avatar`}
                        className="h-12 w-12 rounded-full object-cover"
                    />
                    {isOnline && (
                        <span
                            className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-gray-800 bg-emerald-400"
                            aria-label="online"
                        />
                    )}
                </div>

                <span className="flex-1 truncate text-left font-medium text-slate-100">
                    {conversation.fullname}
                </span>

                {/* unread badge */}
                {unreadCount > 0 && (
                    <span className="inline-flex items-center justify-center h-5 min-w-[1.25rem] px-1.5 bg-red-500 text-white text-xs font-semibold rounded-full">
                        {unreadCount}
                    </span>
                )}

                <span className="text-xl">{emoji}</span>
            </button>

            {!lastIdx && <div className="my-1 h-px w-full bg-slate-700/60" />}
        </>
    );
}