import { useState } from "react";
import Navbar from "../components/Landpage-header";
import { useNavigate } from "react-router-dom";

// You will need to confirm the correct path from your API documentation.
const VERIFY_API_URL = "/api/accounts/verify-otp/";

export default function OTPPage() {
  const navigate = useNavigate();
  // State to hold the 6-digit OTP code entered by the user
  const [otpCode, setOtpCode] = useState("");

  // State to manage button loading/disabling
  const [isVerifying, setIsVerifying] = useState(false);
  // State to hold and display any error messages
  const [error, setError] = useState("");

  const handleOTPVerification = async () => {
    // 1. Client-Side Validation
    if (otpCode.length !== 6 || isNaN(Number(otpCode))) {
      // Note: You can also use the unary plus operator: isNaN(+otpCode)
      setError("Please enter a valid 6-digit numeric code.");
      return;
    }

    // This is a placeholder for the user's email or ID, which the API needs
    // In a real app, this would be retrieved from local storage or passed as a prop
    const userIdentifier = "user@example.com";

    setIsVerifying(true);
    setError("");

    // 2. Prepare Data for API
    const requestData = {
      email: userIdentifier,
      otp_code: otpCode, // Send the user-entered code
    };

    try {
      const response = await fetch(VERIFY_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (response.ok) {
        // Success Handling
        console.log("OTP verified successfully!", result);
        alert("Account verified! Redirecting to login page...");
        navigate("/login");
        // Example: window.location.href = '/dashboard';
      } else {
        // Error Handling (e.g., code expired or invalid)
        console.error(" Verification failed:", result);
        setError(result.detail || "Invalid code. Please try again.");
      }
    } catch (fetchError) {
      // Network Error Handling
      console.error("An error occurred during verification:", fetchError);
      setError("Could not connect to the server. Check your connection.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Assuming Navbar is correct */}
      <Navbar />

      <div className="flex flex-col items-center justify-center flex-1 px-6 py-14">
        <div className="w-full max-w-sm bg-[#E5E8EB] shadow-md rounded-xl px-6 py-10 flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Verify Your Email
          </h2>
          <p className="text-gray-500 text-center text-sm">
            Please enter the 6-digit code sent to **user@example.com**.
          </p>

          {/* OTP Input Field */}
          <input
            type="tel" // Use tel for mobile keyboard on phones
            maxLength={6}
            placeholder="Enter 6-digit code"
            className="text-center border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none tracking-[1em]"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value.slice(0, 6))}
          />

          {/* Error Message Display */}
          {error && (
            <p className="text-red-500 text-sm font-medium text-center">
              {error}
            </p>
          )}

          {/* Verification Button */}
          <button
            className="bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 disabled:opacity-50"
            onClick={handleOTPVerification}
            disabled={isVerifying || otpCode.length !== 6}
          >
            {isVerifying ? "Verifying..." : "Verify Account"}
          </button>

          {/* Resend Link */}
          <button className="text-blue-600 text-sm hover:text-blue-700 font-medium mt-2">
            Resend Code
          </button>
        </div>
      </div>

      {/* Footer Placeholder */}
      <footer className="w-full text-center py-4 text-gray-600 text-sm">
        <span>© 2025 SaveFi</span>
      </footer>
    </div>
  );
}
