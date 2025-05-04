import { useState } from "react";
import useConversation from "../zustand/useConversation.js";
import toast from "react-hot-toast";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (message) => {
        const conversationId = selectedConversation?._id || selectedConversation?.conversationId;

        if (!conversationId) {
            toast.error("Please select a conversation first");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(
                `/api/conversations/${conversationId}/messages`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ text: message }),
                }
            );

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(
                    `HTTP error ${res.status}: ${errorText || res.statusText}`
                );
            }

            const data = await res.json();
            setMessages([...messages, data]);
        } catch (err) {
            console.error("Error sending message:", err);
            toast.error("Failed to send message. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};

export default useSendMessage;
