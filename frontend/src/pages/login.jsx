import React, { useState } from "react";
import { useAuthStore } from "../hooks/authUser.js";
import toast from "react-hot-toast";

const Login = () => {
  const { login, isLoggingIn } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const userlogin = () => {
    if (!formData.email) {
      toast.error("Please enter your email address");
      return false;
    }
    if (!formData.password) {
      toast.error("Please enter your password");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!userlogin()) return;

    try {
      await login(formData);
      toast.success("Logged in successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('https://i.pinimg.com/736x/13/45/2c/13452c287c83999f831ffe5388fb8c71.jpg')`,
      }}
    >
      <div className="bg-[#202C33] text-[#D1D7DB] w-[90%] sm:w-[400px] p-8 rounded-xl shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold">Welcome Back</h1>
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your Email"
            className="w-full px-4 py-2 bg-[#111B21] text-[#D1D7DB] rounded-md border border-[#2A3942] focus:outline-none focus:ring-2 focus:ring-[#00A884] placeholder-gray-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full px-4 py-2 bg-[#111B21] text-[#D1D7DB] rounded-md border border-[#2A3942] focus:outline-none focus:ring-2 focus:ring-[#00A884] placeholder-gray-500"
            disabled={isLoggingIn}
          />
        </div>

        <button
          onClick={handleLogin}
          className={`w-full py-2 rounded-md text-white shadow-md transition duration-200 ease-in-out
            ${
              isLoggingIn
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-[#00A884] hover:bg-[#007965]"
            }`}
          disabled={isLoggingIn}
        >
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
