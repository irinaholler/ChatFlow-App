import User from "../models/userModel.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        // Only pull the fields you actually need, and use lean() for a plain JS object
        const users = await User.find(
            { _id: { $ne: loggedInUserId } },
            "fullname username profilePic"
        )
            .sort("fullname")   // optional: alphabetical list
            .lean();

        res.status(200).json(users);
    } catch (error) {
        console.error("Error in getUsersForSidebar:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
