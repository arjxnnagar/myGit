import React, { useState , useEffect } from "react";
import axios from "axios";

import logo from "../assets/github-mark-white.svg";
import useAuth from "../context/useAuth";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCurrentUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post("http://localhost:3000/user/login", {
        email: email,
        password: password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);

      setCurrentUser(response.data.userId);

      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Login Failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1117] px-4">
      {/* Login Card */}
      <div className="w-full max-w-md bg-[#161b22] border border-[#30363d] rounded-2xl shadow-2xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img className="w-20 h-20 object-contain" src={logo} alt="Logo" />
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Login</h1>

          <p className="text-gray-400 mt-2">Login into your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Username */}
          <div>
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email
            </label>

            <input
              autoComplete="off"
              name="Email"
              id="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="w-full px-4 py-3 bg-[#0d1117] border border-[#30363d] text-white rounded-xl outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition placeholder-gray-500"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="Password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>

            <input
              autoComplete="off"
              name="Password"
              id="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 bg-[#0d1117] border border-[#30363d] text-white rounded-xl outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition placeholder-gray-500"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-400">
          <p>
            Create an Account?{" "}
            <Link
              to="/signup"
              className="text-blue-400 font-semibold hover:underline"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
