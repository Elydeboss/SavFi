import React from "react";
import Navbar from "../components/Navbar";
import Image from "../assets/img/Frame 1686563515.png";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Main Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 px-6 md:px-20 py-14 flex-1">
        {/* LEFT IMAGE BLOCK */}
        <div className="w-full md:w-1/2 flex justify-center">
          {/* 🔵 IMAGE PLACEHOLDER (REPLACE THIS WITH YOUR IMAGE) */}
          <div className="w-full max-w-md h-[420px] bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
            {/* 👉 Replace this div with your <img src="..." /> */}
            <img src={Image} alt="" />
          </div>
        </div>

        {/* RIGHT LOGIN BLOCK */}
        <div className="w-full md:w-1/2 max-w-md flex flex-col text-center md:text-left">
          <h2 className="text-3xl font-semibold text-gray-800">
            Jump right in
          </h2>

          <p className="text-gray-500 mt-1 mb-6">
            Sign Up / Login to access SaveFi benefits
          </p>

          {/* Card */}
          <div className="w-full bg-[#E5E8EB] shadow-md rounded-xl p-6 pb-12 flex flex-col gap-4">
            {/* Google Button */}
            <button className="bg-blue-600 text-white py-3 rounded-full mt-24 font-medium hover:bg-blue-700 flex items-center justify-center gap-2">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-5"
              />
              Continue with Google
            </button>

            {/* Email Input */}
            <input
              type="email"
              placeholder="Enter email address"
              className="border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-500 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Metamask Button */}
            <button className="border border-blue-400 text-blue-600 py-3 rounded-full font-medium hover:bg-blue-50 flex items-center justify-center gap-2">
              <img
                src="https://cdn.worldvectorlogo.com/logos/metamask.svg"
                className="w-5"
              />
              Continue with Metamask
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center py-4 text-gray-600 text-sm flex flex-col md:flex-row items-center justify-center gap-4">
        <span>© 2025 SaveFi</span>
        <span className="hidden md:inline">•</span>
        <a href="#" className="hover:text-gray-800">
          Privacy policy
        </a>
        <span className="hidden md:inline">•</span>
        <a href="#" className="hover:text-gray-800">
          Terms of Service
        </a>
      </footer>
    </div>
  );
}
