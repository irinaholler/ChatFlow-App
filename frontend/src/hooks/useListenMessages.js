import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation.js";
import Message from "../components/messages/Message";
import MessageSkeleton from "../components/skeletons/MessageSkeleton";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages, selectedConversation, addUnread } = useConversation();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();
            // if it's *not* the currently‐viewed conversation, mark unread
            if (newMessage.conversationId !== selectedConversation?._id) {
                addUnread(newMessage.conversationId);
            }
            setMessages([...messages, newMessage]);
        });

        return () => socket?.off("newMessage");
    }, [socket, messages, selectedConversation]);
};
export default useListenMessages;
