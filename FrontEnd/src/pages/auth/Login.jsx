import React, { useState, useEffect } from "react";
import image from "../../assets/image.png";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/AuthContext"; // Import the AuthContext

const Login = () => {
    const [data, setData] = useState({ email: "", password: "", rememberMe: false });
    const [loading, setLoading] = useState(false);
    const { login, logout, user, error } = useAuth(); // Use the context to get the login function

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        await logout(); // Ensure the user is logged out before logging in again
        await login(data);
        setLoading(false);
    };

    return (
        <>
            <Header />
            <NavBar />
            <section className="min-h-screen flex items-center justify-center font-mono">
                <div className="flex shadow-md rounded-2xl">
                    {/* Login Form */}
                    <div className="flex flex-col items-center justify-center text-center p-20 gap-8 bg-white rounded-2xl xl:rounded-tr-none xl:rounded-br-none">
                        <h1 className="text-5xl font-bold">Welcome</h1>

                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col text-2xl text-left gap-3 w-full"
                        >
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                className="rounded-md p-1 border-2 outline-none focus:border-cyan-400 focus:bg-slate-50"
                                required
                            />

                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                className="rounded-md p-1 border-2 outline-none focus:border-cyan-400 focus:bg-slate-50"
                                required
                            />

                            <div className="flex gap-2 items-center">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={data.rememberMe}
                                    onChange={(e) => setData({ ...data, rememberMe: e.target.checked })}
                                />
                                <span className="text-base">Remember Me</span>
                            </div>

                            {/* Display error message correctly */}
                            {error && (
                                <p className="text-red-600 text-sm mt-2">
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                className="px-10 py-2 text-2xl rounded-md bg-[rgb(0,122,255)] hover:bg-[rgb(10,75,145)] text-white transition duration-300 disabled:opacity-50"
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>
                        </form>
                    </div>

                    {/* Image */}
                    <img
                        src={image}
                        alt="Login Avatar"
                        className="w-[450px] object-cover xl:rounded-tr-2xl xl:rounded-br-2xl xl:block hidden"
                    />
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Login;
