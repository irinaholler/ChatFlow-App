import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

export default function useSignup() {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async ({ fullName, username, email, password, confirmPassword }) => {
        if (!fullName || !username || !email || !password || !confirmPassword) {
            return toast.error("Please fill in all fields");
        }
        if (password !== confirmPassword) {
            return toast.error("Passwords must match");
        }
        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullname: fullName,
                    username,
                    email,
                    password,
                    confirmPassword,
                }),
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);

            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
}
