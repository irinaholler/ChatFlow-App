import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage.js";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const { loading, sendMessage } = useSendMessage();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) return;
        await sendMessage(message);
        setMessage("");
    };

    return (
        <form className="px-4 my-3" onSubmit={handleSubmit}>
            <div className="w-full relative">
                <input
                    required
                    type="text"
                    className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white disabled:opacity-60"
                    placeholder="Send a message"
                    autoComplete="off"
                    autoFocus
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={loading}
                />
                <button
                    type="submit"
                    className="absolute inset-y-0 end-0 flex items-center pe-3 disabled:cursor-not-allowed"
                    disabled={loading}
                >
                    {loading ? (
                        <div className="loading loading-spinner" />
                    ) : (
                        <BsSend />
                    )}
                </button>
            </div>
        </form>
    );
};
export default MessageInput;