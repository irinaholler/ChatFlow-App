// src/components/auth/Login.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin.js";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loading, login } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-full p-8 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className="text-3xl pb-6 font-semibold text-center text-gray-300">
                    Login<span className="text-red-500"> ChatApp</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div>
                        <label className="label p-2">
                            <span className="text-green-600 text-base label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full input input-bordered h-10"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="label">
                            <span className="text-green-600 text-base label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            className="w-full input input-bordered h-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <Link
                        to="/signup"
                        className="text-green-600 text-sm pt-6 hover:underline hover:text-red-600 mt-2 inline-block"
                    >
                        {"Don't"} have an account?
                    </Link>

                    <div>
                        <button className="btn btn-block btn-sm mt-2" disabled={loading}>
                            {loading ? <span className="loading loading-spinner" /> : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
