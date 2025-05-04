import { Link } from "react-router-dom";
import { useState } from "react";
import useSignup from "../../hooks/useSignup.js";

const SignUp = () => {
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const { loading, signup } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-xl">
                <h1 className="text-3xl font-extrabold text-center text-white mb-6">
                    Sign Up <span className="text-green-400">ChatApp</span>
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {[
                        { label: "Full Name", name: "fullName", type: "text" },
                        { label: "Username", name: "username", type: "text" },
                        { label: "Email", name: "email", type: "email" },
                        { label: "Password", name: "password", type: "password" },
                        { label: "Confirm Password", name: "confirmPassword", type: "password" },
                    ].map(({ label, name, type }) => (
                        <div key={name}>
                            <label className="block text-gray-300 mb-1 font-medium">
                                {label}
                            </label>
                            <input
                                type={type}
                                name={name}
                                value={inputs[name]}
                                onChange={(e) =>
                                    setInputs((prev) => ({ ...prev, [name]: e.target.value }))
                                }
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                                placeholder={label}
                                required
                            />
                        </div>
                    ))}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-green-500 hover:bg-green-400 disabled:bg-gray-600 text-white font-semibold rounded-lg transition"
                    >
                        {loading ? "Signing Up…" : "Create Account"}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-400 text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-green-400 hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
