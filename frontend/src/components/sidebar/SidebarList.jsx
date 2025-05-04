// src/components/sidebar/SidebarList.jsx
import { useAuthContext } from "../../context/AuthContext";
import useGetConversations from "../../hooks/useGetConversations";
import useGetUsers from "../../hooks/useGetUsers";
import { getRandomEmoji } from "../../utils/emojis";
import ConversationRow from "./Conversation";

export default function SidebarList({ searchTerm = "" }) {
    const { authUser } = useAuthContext();
    const { conversations = [] } = useGetConversations();
    const { users = [] } = useGetUsers();

    // 1️⃣ build direct-message rows
    const dmRows = conversations
        .filter((c) => Array.isArray(c.participants))
        .map((c) => {
            const other = c.participants.find((p) => p._id !== authUser._id);
            if (!other) return null;
            return {
                _id: other._id,
                fullname: other.fullname,
                profilePic: other.profilePic,
                conversationId: c._id,
            };
        })
        .filter(Boolean);

    // 2️⃣ fresh users
    const chattedWith = new Set(dmRows.map((r) => r._id));
    const freshUsers = users.filter(
        (u) => u._id !== authUser._id && !chattedWith.has(u._id)
    );

    // 3️⃣ merge and then filter by searchTerm
    const allRows = [...dmRows, ...freshUsers];
    const term = searchTerm.trim().toLowerCase();
    const filtered = term
        ? allRows.filter((r) =>
            r.fullname.toLowerCase().includes(term)
        )
        : allRows;

    if (!filtered.length) {
        return (
            <p className="px-4 py-8 text-center text-slate-400">
                {term ? "No chats match your search." : "No one else is here yet."}
            </p>
        );
    }

    return (
        <div className="py-2 flex flex-col overflow-auto">
            {filtered.map((row, idx) => (
                <ConversationRow
                    key={row.conversationId || row._id}
                    conversation={row}
                    emoji={getRandomEmoji()}
                    lastIdx={idx === filtered.length - 1}
                />
            ))}
        </div>
    );
}
