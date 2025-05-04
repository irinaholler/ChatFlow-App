import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout.js";

const LogoutButton = () => {
    const { loading, logout } = useLogout();

    return (
        <div className="mt-auto flex justify-left">
            {loading ? (
                <span className="loading loading-spinner"></span>
            ) : (
                <button
                    onClick={logout}
                    className="
            p-2 
            rounded-full 
            text-white 
            hover:bg-purple-600 
            transition-colors 
            duration-200 
            ease-in-out
          "
                    aria-label="Logout"
                >
                    <BiLogOut className="w-6 h-6" />
                </button>
            )}
        </div>
    );
};

export default LogoutButton;
