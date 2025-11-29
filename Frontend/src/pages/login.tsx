import { useState } from "react";
import Navbar from "../components/Landpage-header";
import Image from "../assets/img/Frame 1686563515.png";
import { useNavigate } from "react-router-dom";

const API_URL = "/api/accounts/login/"; // Proxy endpoint

export default function Login() {
  const navigate = useNavigate();
  // const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegistration = async () => {
    // 1. Client-Side Validation
    if (!username || !password) {
      // 👈 VALIDATION UPDATED
      alert("All fields are required.");
      return;
    }

    // if (password !== confirmPassword) {
    //   alert("Passwords do not match!");
    // return;
    //   }

    //  disable button after submission
    setIsSubmitting(true);

    // 2. Prepare Data for API (INCLUDING USERNAME)
    const requestData = {
      //email: email,
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

      const result = await response.json();

      if (response.ok) {
        // Success Handling
        console.log(" Registration successful!", result);
        alert("Account verified! Redirecting to dashboard...");
        navigate("/dashboard");
      } else {
        // Error Handling (API responded, but with an error status like 400)
        console.error(" Registration failed:", result);
        // The API error will now show if any other fields are missing
        alert(
          `Registration Failed: ${result.detail || JSON.stringify(result)}`
        );
        throw new Error(result.detail || "API registration failed.");
      }
    } catch (error) {
      // Network/Fetch Error Handling (e.g., connection lost or proxy error)
      console.error("An error occurred during the fetch operation:", error);
      alert("An unexpected network error occurred.");
    } finally {
      // Re-enable button regardless of success or failure
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Main Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 px-6 md:px-20 py-14 flex-1">
        {/* LEFT IMAGE BLOCK */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-full max-w-md h-[420px] bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
            <img src={Image} alt="" />
          </div>
        </div>

        {/* RIGHT LOGIN BLOCK */}
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
            {/* Username Input */}
            <input
              type="text" // 👈 Changed type to 'text' for username
              placeholder="Enter username"
              className="border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            {/* Password Input */}
            <input
              type="password"
              placeholder="Enter password"
              className="border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              />
              Continue with Metamask
            </button>
          </div>
        </div>
      </div>

      {/* Footer (unchanged) */}
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
