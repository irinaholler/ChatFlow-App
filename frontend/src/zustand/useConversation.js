import { create } from "zustand";

const useConversation = create((set, get) => ({
    /* ---------- state ---------- */
    selectedConversation: null,
    messages: [],
    unread: {},

    /* ---------- actions ---------- */
    setSelectedConversation: (conversation) => {
        set((state) => {
            const unread = { ...state.unread };
            if (conversation?._id) delete unread[conversation._id];
            return { selectedConversation: conversation, unread };
        });
    },

    setSelectedConversationById: async (id) => {
        // fetch the convo (your existing logic), then...
        const conversation = await fetchConvoById(id);
        set((state) => {
            const unread = { ...state.unread };
            delete unread[id];
            return { selectedConversation: conversation, unread };
        });
    },

    setMessages: (msgs) => set(() => ({ messages: msgs })),

    addUnread: (conversationId) =>
        set((state) => ({
            unread: {
                ...state.unread,
                [conversationId]: (state.unread[conversationId] || 0) + 1,
            },
        })),

    resetConversation: () =>
        set(() => ({ selectedConversation: null, messages: [] })),
}));

export default useConversation;
