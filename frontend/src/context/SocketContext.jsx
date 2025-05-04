import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useAuthContext } from "./AuthContext";
import useConversation from "../zustand/useConversation";

const SocketContext = createContext();

export const useSocketContext = () => {
    const ctx = useContext(SocketContext);
    if (!ctx) throw new Error("useSocketContext must be inside <SocketContextProvider>");
    return ctx;
};

export function SocketContextProvider({ children }) {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const socketRef = useRef(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        if (!authUser) {
            socketRef.current?.disconnect();
            socketRef.current = null;
            setOnlineUsers([]);
            return;
        }

        // Vite proxy: calling "/" on dev server goes to backend/socket.io
        const socket = io("/", {
            path: "/socket.io",
            withCredentials: true,
        });
        socketRef.current = socket;

        socket.on("getOnlineUsers", (list) =>
            setOnlineUsers(list.filter((id) => id !== authUser._id))
        );

        const join = () => {
            if (selectedConversation?._id) {
                socket.emit("join", selectedConversation._id);
            }
        };
        socket.on("connect", join);
        join();

        return () => {
            socket.off("getOnlineUsers");
            socket.off("connect", join);
            socket.disconnect();
        };
    }, [authUser, selectedConversation?._id]);

    return (
        <SocketContext.Provider value={{ socket: socketRef.current, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
}
