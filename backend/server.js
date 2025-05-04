import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";
import connectToMongoDB from "./utils/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// 1️⃣ Cookies & JSON
app.use(cookieParser());
app.use(express.json());

// 2️⃣ CORS (for both REST & WebSocket)
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

// 3️⃣ Attach Socket.IO to the *same* HTTP server
const io = new Server(server, {
    path: "/socket.io",     // ← make sure this matches your client
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});

// 4️⃣ (Optional) If you do JWT auth on sockets
io.use((socket, next) => {
    const cookieHeader = socket.request.headers.cookie;
    if (!cookieHeader) return next(new Error("Auth error: no cookies"));
    const { jwt: token } = Object.fromEntries(
        cookieHeader.split("; ").map((c) => c.split("="))
    );
    if (!token) return next(new Error("Auth error: no token"));
    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = userId;
        next();
    } catch {
        next(new Error("Auth error: invalid token"));
    }
});

// 5️⃣ Track online users
const userSocketMap = {};
io.on("connection", (socket) => {
    const uid = socket.userId;
    userSocketMap[uid] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("join", (room) => socket.join(room));
    socket.on("leave", (room) => socket.leave(room));

    socket.on("disconnect", () => {
        delete userSocketMap[uid];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

// 6️⃣ Make `io` available inside your controllers via `req.io`
app.use((req, _, next) => {
    req.io = io;
    next();
});

// 7️⃣ Now mount your REST API
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/conversations", conversationRoutes);

// 8️⃣ Start listening
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
