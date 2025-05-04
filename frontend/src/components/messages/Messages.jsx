import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";

const Messages = () => {
    const { messages, loading } = useGetMessages();
    useListenMessages();

    const bottomRef = useRef(null);

    // auto‑scroll
    useEffect(() => {
        const id = setTimeout(() => {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 50);
        return () => clearTimeout(id);
    }, [messages]);

    return (
        <div className="px-4 p-4 flex-1 overflow-auto">
            {loading &&
                [...Array(3)].map((_, i) => <MessageSkeleton key={i} />)}

            {!loading && messages.length === 0 && (
                <p className="text-center">Send a message to start the conversation</p>
            )}

            {!loading &&
                messages.map((msg, i) => (
                    <div
                        key={msg._id}
                        ref={i === messages.length - 1 ? bottomRef : undefined}
                    >
                        <Message message={msg} />
                    </div>
                ))}
        </div>
    );
};

export default Messages;
