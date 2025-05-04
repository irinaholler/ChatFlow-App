import { toast } from "react-hot-toast";
import useConversation from "../zustand/useConversation";

export default function useOpenConversation() {
    const { setSelectedConversation } = useConversation();

    return async (userId) => {
        const res = await fetch("/api/conversations", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
        });

        if (!res.ok) {
            const errText = await res.text();
            toast.error(errText || "Failed to open chat");
            return null;
        }

        const convo = await res.json();
        setSelectedConversation(convo);
        return convo;
    };
}
