import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);

			try {
				const res = await fetch("/api/conversations", {
					credentials: "include",
				});

				if (!res.ok) {
					const err = await res.text();
					throw new Error(err || `HTTP ${res.status}`);
				}
				const data = await res.json();

				if (data.error) throw new Error(data.error);

				setConversations(data);
			} catch (err) {
				toast.error(err.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};

export default useGetConversations;
