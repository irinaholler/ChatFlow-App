import { useEffect, useState } from "react";
import toast from "react-hot-toast";

/**
 * Fetches every user except the logged‑in one.
 * Used when there are zero conversations so you can start a new chat.
 */
export default function useGetUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // skip if we already have the list (prevents double fetch)
        if (users.length) return;

        const controller = new AbortController();

        (async () => {
            setLoading(true);

            try {
                const res = await fetch("/api/users", {
                    credentials: "include",
                    signal: controller.signal,
                });

                const data = await res.json();

                if (data.error) throw new Error(data.error);
                setUsers(data);

            } catch (err) {
                if (err.name !== "AbortError") {
                    toast.error(err.message || "Failed to load users");
                }
            } finally {
                setLoading(false);
            }
        })();

        return () => controller.abort();
    }, [users.length]);

    return { users, loading };
}
