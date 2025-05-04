import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
    const { messages, setMessages, selectedConversation } = useConversation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // no convo selected → reset & exit
        if (!selectedConversation?._id) {
            setMessages([]);
            return;
        }

        const controller = new AbortController();

        const fetchMessages = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `/api/conversations/${selectedConversation._id}/messages`,
                    {
                        credentials: "include",
                        signal: controller.signal,
                    }
                );
                if (!res.ok) {
                    const { error } = await res.json();
                    throw new Error(error || `HTTP ${res.status}`);
                }
                const data = await res.json();
                setMessages(data);
            } catch (err) {
                if (err.name !== "AbortError") toast.error(err.message);
            } finally {
                setLoading(false);
            }
        };

        // clear old messages immediately
        setMessages([]);
        fetchMessages();

        return () => controller.abort();
    }, [selectedConversation?._id, setMessages]);

    return { messages, loading };
};

export default useGetMessages;
