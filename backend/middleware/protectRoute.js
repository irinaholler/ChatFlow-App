import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protectRoute = async (req, res, next) => {
    try {
        // 1. Find a token (cookie first, then Auth header)
        const token =
            req.cookies?.jwt ||
            req.headers.authorization?.split(" ")[1]; // "Bearer <token>"

        if (!token) {
            return res.status(401).json({ error: "Unauthorized: no token" });
        }

        // 2. Verify
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Fetch user
        const user = await User.findById(userId).select("-password").lean();
        if (!user) return res.status(401).json({ error: "Unauthorized: user not found" });

        // 4. Attach & continue
        req.user = user;
        next();
    } catch (err) {
        // JWT auth‑specific errors
        if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "Unauthorized: invalid or expired token" });
        }
        console.error("protectRoute:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default protectRoute;
