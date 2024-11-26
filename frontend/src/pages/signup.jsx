import React, { useState } from "react";
import { useAuthStore } from "../hooks/authUser.js";
import toast from "react-hot-toast";

const Signup = () => {
  const { signup, isSigningUp } = useAuthStore();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) return toast.error("Please enter a full name");
    if (!formData.email.trim()) return toast.error("Please enter an email");
    if (!formData.password.trim()) return toast.error("Please enter a password");

    try {
      await signup(formData);
      toast.success("Signup successful!");
    } catch (error) {
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://i.pinimg.com/736x/13/45/2c/13452c287c83999f831ffe5388fb8c71.jpg')`,
      }}
    >
      
      <div className="absolute inset-0 bg-black bg-opacity-5 backdrop-blur-sm"></div>

      <div className="relative z-10 bg-[#202C33] text-[#D1D7DB] w-[90%] sm:w-[400px] p-8 rounded-xl shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold">Create an Account</h1>
        </div>

        <div className="mb-4">
          <label
            htmlFor="fullname"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full px-4 py-2 bg-[#111B21] text-[#D1D7DB] rounded-md border border-[#2A3942] focus:outline-none focus:ring-2 focus:ring-[#00A884] placeholder-gray-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
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
          />
        </div>


        <button
          onClick={handleSignup}
          className={`w-full py-2 rounded-md text-white shadow-md transition duration-200 ease-in-out ${
            isSigningUp
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-[#00A884] hover:bg-[#007965]"
          }`}
          disabled={isSigningUp}
        >
          {isSigningUp ? (
            <div className="flex justify-center">
              <div className="w-6 h-6 border-t-4 border-b-4 border-white border-solid rounded-full animate-spin"></div>
            </div>
          ) : (
            "Sign Up"
          )}
        </button>
      </div>
    </div>
  );
};

export default Signup;
