// src/components/sidebar/Sidebar.jsx
import { useState } from "react";
import SearchInput from "./SearchInput";
import SidebarList from "./SidebarList";
import LogoutButton from "./LogoutButton";

export default function Sidebar() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700 p-4">
            {/* Search at the top */}
            <div className="mb-4">
                <SearchInput value={searchTerm} onChange={setSearchTerm} />
            </div>

            {/* Divider */}
            <div className="border-t border-slate-600 my-2" />

            {/* Conversations / Users list */}
            <div className="flex-1 overflow-auto">
                <SidebarList searchTerm={searchTerm} />
            </div>

            {/* Divider */}
            <div className="border-t border-slate-600 my-2" />

            {/* Logout at the bottom */}
            <div className="mt-2">
                <LogoutButton />
            </div>
        </div>
    );
}
