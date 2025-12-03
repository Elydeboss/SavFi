import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Landpage-header';

// API endpoint for OTP verification
const VERIFY_API_URL = '/api/accounts/verify-otp/';

interface LocationState {
  userEmail?: string;
  userName?: string;
}

export default function OTPPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const userEmail = state?.userEmail || 'unknown';
  const userName = state?.userName || 'User';

  // OTP state
  const [otpCode, setOtpCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  const handleOTPVerification = async () => {
    if (otpCode.length !== 6 || isNaN(+otpCode)) {
      setError('Please enter a valid 6-digit numeric code.');
      return;
    }

    setIsVerifying(true);
    setError('');

    const requestData = { email: userEmail, otp_code: otpCode };

    try {
      const response = await fetch(VERIFY_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Account verified! Redirecting to login page...');
        navigate('/login');
      } else {
        setError(result.detail || 'Invalid code. Please try again.');
      }
    } catch (err) {
      console.error('Verification error:', err);
      setError('Could not connect to the server. Check your connection.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="flex flex-col items-center justify-center flex-1 px-6 py-14">
        <div className="w-full max-w-sm bg-[#E5E8EB] shadow-md rounded-xl px-6 py-10 flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Verify Your Email
          </h2>
          <p className="text-gray-500 text-center text-sm">
            Hi <strong>{userName}</strong>, please enter the 6-digit code sent
            to <strong>{userEmail}</strong>.
          </p>

          {/* OTP Input */}
          <input
            type="tel"
            maxLength={6}
            placeholder="Enter 6-digit code"
            className="text-center border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none tracking-[1em]"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value.slice(0, 6))}
          />

          {/* Error message */}
          {error && (
            <p className="text-red-500 text-sm font-medium text-center">
              {error}
            </p>
          )}

          {/* Verification button */}
          <button
            className="bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 disabled:opacity-50"
            onClick={handleOTPVerification}
            disabled={isVerifying || otpCode.length !== 6}
          >
            {isVerifying ? 'Verifying...' : 'Verify Account'}
          </button>

          {/* Resend code */}
          <button className="text-blue-600 text-sm hover:text-blue-700 font-medium mt-2">
            Resend Code
          </button>
        </div>
      </div>

      <footer className="w-full text-center py-4 text-gray-600 text-sm">
        <span>© 2025 SaveFi</span>
      </footer>
    </div>
  );
}
