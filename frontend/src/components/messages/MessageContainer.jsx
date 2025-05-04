import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";

const MessageContainer = () => {
    const { authUser } = useAuthContext();
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { onlineUsers } = useSocketContext();

    // Clear selection when unmounting
    useEffect(() => () => setSelectedConversation(null), [setSelectedConversation]);

    // Who we’re chatting with
    const peer = selectedConversation?.participants?.find(
        (p) => p._id !== authUser._id
    );
    const headerName = peer?.fullname ?? "";
    const headerPic = peer?.profilePic ?? "";
    const isOnline = peer ? onlineUsers.includes(peer._id) : false;

    return (
        <div className="flex-1 flex flex-col bg-slate-800 h-full">
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    {/* — Header */}
                    <header className="bg-slate-700 flex items-center gap-3 px-6 py-3 border-b border-slate-600">
                        <div className="relative">
                            <img
                                src={headerPic}
                                alt={headerName}
                                className="h-8 w-8 rounded-full object-cover"
                            />
                            {isOnline && (
                                <span
                                    className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 border-2 border-slate-800"
                                    aria-label="online"
                                />
                            )}
                        </div>
                        <h2 className="text-2xl font-semibold text-white">{headerName}</h2>
                    </header>

                    {/* — Messages */}
                    <section className="flex-1 overflow-auto p-4">
                        <Messages />
                    </section>

                    {/* — Input bar */}
                    <footer className="bg-slate-700 border-t border-slate-600 px-6 py-4">
                        <MessageInput />
                    </footer>
                </>
            )}
        </div>
    );
};
export default MessageContainer;

const NoChatSelected = () => {
    const { authUser } = useAuthContext();
    return (
        <div className="flex-1 flex items-center justify-center bg-slate-800">
            <div className="bg-slate-700 rounded-2xl shadow-lg p-8 max-w-md w-full text-center space-y-4">
                <TiMessages className="mx-auto text-5xl text-indigo-400" />
                <h2 className="text-2xl font-semibold text-white">
                    Welcome, {authUser.fullname}!
                </h2>
                <p className="text-white">Select a conversation to begin chatting.</p>
            </div>
        </div>
    );
};
