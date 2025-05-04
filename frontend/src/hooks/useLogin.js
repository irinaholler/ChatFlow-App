import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

export default function useLogin() {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const login = async (email, password) => {
		if (!email || !password) {
			toast.error("Please fill in all fields");
			return;
		}
		setLoading(true);
		try {
			const res = await fetch("/api/auth/login", {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),   // ← email + password
			});

			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error || `HTTP ${res.status}`);
			}

			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (err) {
			toast.error(err.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
}
