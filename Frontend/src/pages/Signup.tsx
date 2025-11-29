import { useState } from "react";
import Navbar from "../components/Landpage-header";
import Image from "../assets/img/Frame 1686563515.png";
import { useNavigate } from "react-router-dom"; // Use useNavigate only

const API_URL = "/api/accounts/register/"; // Proxy endpoint

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false); // Success state can be used for local UI message

  const resetForm = () => {
    setEmail("");
    setUsername(""); // Reset username too
    setPassword("");
    setConfirmPassword("");
  };

  const handleRegistration = async () => {
    setServerError("");
    setSuccess(false);

    // 1. Client-Side Validation
    if (!email || !username || !password || !confirmPassword) {
      setServerError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setServerError("Passwords do not match!");
      return;
    }

    setIsSubmitting(true);

    const requestData = {
      email: email,
      username: username,
      password: password,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      // We must await the result regardless of response.ok to read the body
      const result = await response.json();

      if (response.ok) {
        // SUCCESS HANDLER
        console.log("Registration successful!", result);
        setSuccess(true);
        resetForm(); // Clear the form on success

        // 🚀 SUCCESSFUL NAVIGATION: Pass required data to the OTP page
        navigate("/otp", {
          state: { userEmail: email, userName: username },
        });
      } else {
        // ERROR HANDLING (API responded with an error status like 400/500)
        console.error("Registration failed:", result);

        // 💡 ROBUST ERROR MESSAGE: Check the different error formats the API sends
        let errorMessage = "Registration Failed. Please check your inputs.";

        if (result.detail) {
          errorMessage = `Registration Failed: ${result.detail}`;
        } else if (result.username && Array.isArray(result.username)) {
          // Catches the specific error from the screenshot: {"username":["This field is required."]}
          errorMessage = `Registration Failed: Username Error - ${result.username[0]}`;
        } else {
          // General fallback for unknown error formats
          errorMessage = `Registration Failed: ${JSON.stringify(result)}`;
        }

        setServerError(errorMessage);

        // Throwing the error here is generally unnecessary if you handle it with setServerError
        // throw new Error(errorMessage);
      }
    } catch (error) {
      // Network/Fetch Error Handling (e.g., connection lost or CORS)
      console.error("An error occurred during the fetch operation:", error);
      setServerError(
        "An unexpected network error occurred. Check your server status."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* ... (JSX remains the same, using serverError/success states) ... */}
      <Navbar />

      {/* Main Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 px-6 md:px-20 py-14 flex-1">
        {/* LEFT IMAGE BLOCK */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-full max-w-md h-[420px] bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
            <img src={Image} alt="Landing" />
          </div>
        </div>

        {/* RIGHT REGISTER BLOCK */}
        <div className="w-full md:w-1/2 max-w-md flex flex-col text-center md:text-left">
          <div className="flex flex-col justify-center items-center mb-24">
            <h2 className="text-3xl mb-6 font-semibold text-gray-800">
              Jump right in
            </h2>
            <p className="text-gray-500 mb-12">
              Sign Up / Login to access SaveFi benefits
            </p>
          </div>

          {/* Card */}
          <div className="w-full bg-[#E5E8EB] shadow-md rounded-xl px-6 py-20 flex flex-col gap-4">
            {/* Displaying Errors/Success */}
            {serverError && (
              <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
                {serverError}
              </div>
            )}

            {success && (
              <div className="mb-4 rounded border border-green-300 bg-green-50 p-3 text-sm text-green-700">
                Registration successful! Redirecting for verification...
              </div>
            )}

            {/* Email Input */}
            <input
              type="email"
              placeholder="Enter email address"
              className="border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />

            {/* Username Input */}
            <input
              type="text"
              placeholder="Enter username"
              className="border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isSubmitting} // Disabled while submitting
            />

            {/* Password Input */}
            <input
              type="password"
              placeholder="Enter password"
              className="border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
            />

            {/* Confirm Password Input */}
            <input
              type="password"
              placeholder="Confirm password"
              className="border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isSubmitting}
            />

            {/* Registration Button */}
            <button
              className="bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 disabled:opacity-50"
              onClick={handleRegistration}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Create Account"}
            </button>

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
                alt="Metamask logo"
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
