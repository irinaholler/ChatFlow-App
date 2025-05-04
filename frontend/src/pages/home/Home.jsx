// src/pages/Home.jsx
import { useAuthContext } from "../../context/AuthContext";
import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";

export default function Home() {
    const { authUser } = useAuthContext();

    return (
        <div className="flex h-[95vh] rounded-lg overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl border border-slate-700">
            {/* Sidebar */}
            <div className="w-[300px]">
                <Sidebar />
            </div>

            {/* Chat area */}
            <div className="flex-1 flex flex-col bg-gradient-to-br from-slate-800 to-slate-900 min-w-[800px]">
                {/* Header with centered welcome */}
                <header className="flex items-center justify-center py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 shadow-lg">
                    <h1 className="text-3xl font-bold text-white tracking-wide">
                        Welcome, {authUser.fullname}!
                    </h1>
                </header>

                {/* Messages or welcome placeholder */}
                <main className="flex-1 overflow-auto p-4">
                    <div className="w-full max-w-[150%] mx-auto h-full">
                        <MessageContainer />
                    </div>
                </main>
            </div>
        </div>
    );
}
