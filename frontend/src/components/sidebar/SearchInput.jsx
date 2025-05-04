import { IoSearchOutline, IoCloseCircle } from "react-icons/io5";

export default function SearchInput({ value, onChange }) {
    return (
        <div className="relative w-full">
            <input
                type="text"
                placeholder="Search chats..."
                className="w-full bg-slate-700/50 text-slate-200 placeholder-slate-400 px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />

            {/* reset button */}
            {value && (
                <button
                    type="button"
                    onClick={() => onChange("")}
                    className="absolute right-10 top-1/2 -translate-y-1/2 text-slate-400 hover:text-purple-400"
                    aria-label="Clear search"
                >
                    <IoCloseCircle className="w-5 h-5" />
                </button>
            )}

            <IoSearchOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
    );
}
