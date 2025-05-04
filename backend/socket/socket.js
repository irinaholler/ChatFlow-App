// backend/socket/socket.js
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";

let io;

/**
 * Call this once, after you call `const server = http.createServer(app)`.
 */
export function initSocket(server) {
	// 1️⃣ attach Socket.IO to the already-created HTTP server
	io = new Server(server, {
		cors: {
			origin: "http://localhost:3000",
			methods: ["GET", "POST"],
			credentials: true,
		},
	});

	// 2️⃣ parse cookies on the handshake so we can auth via JWT
	io.use((socket, next) => {
		const cookieHeader = socket.request.headers.cookie;
		if (!cookieHeader) return next(new Error("Auth error: no cookies"));

		const { jwt: token } = Object.fromEntries(
			cookieHeader.split("; ").map((c) => c.split("="))
		);
		if (!token) return next(new Error("Auth error: missing token"));

		try {
			const { userId } = jwt.verify(token, process.env.JWT_SECRET);
			socket.userId = userId;
			next();
		} catch {
			next(new Error("Auth error: invalid token"));
		}
	});

	// 3️⃣ track online users
	const userSocketMap = {}; // userId → socketId
	io.on("connection", (socket) => {
		const uid = socket.userId;
		userSocketMap[uid] = socket.id;
		io.emit("getOnlineUsers", Object.keys(userSocketMap));

		socket.on("join", (roomId) => socket.join(roomId));
		socket.on("leave", (roomId) => socket.leave(roomId));

		socket.on("disconnect", () => {
			delete userSocketMap[uid];
			io.emit("getOnlineUsers", Object.keys(userSocketMap));
		});
	});
}

/**
 * If you need to emit to a specific user by id elsewhere:
 */
export function getReceiverSocketId(id) {
	return Object.entries(io.sockets.sockets).find(
		([, sock]) => sock.userId === id
	)?.[0];
}
