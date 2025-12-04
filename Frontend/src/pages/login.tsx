import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import Logo from "../assets/public/logo-dark.svg";
import { useUserProfile } from "../contexts/UserProfileContext";
import WalletConnector from "../Modal/Metamask";

// BACKEND URL
const API_BASE = "https://wallet-api-55mt.onrender.com";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export default function Login() {
  const { updateProfile } = useUserProfile();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validated = loginSchema.parse({ username, password });
      setIsLoading(true);

      const response = await fetch(`${API_BASE}/accounts/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validated),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        if (data.username) localStorage.setItem("username", data.username);
        if (data.email) localStorage.setItem("email", data.email);
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error(
          "Login failed: " + (data.detail || data.message || "Try again.")
        );
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.issues[0]?.message);
      } else {
        toast.error("Unexpected error during login. Try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-full lg:w-1/2 bg-linear-to-br from-primary via-blue-600 to-blue-800 p-6 sm:p-12 flex-col justify-between">
        <div className="flex items-center gap-3">
          <Link to="/">
            <img
              src={Logo}
              alt="SaveFi Logo"
              className="h-20 w-20 cursor-pointer"
            />
          </Link>
        </div>

        <div className="max-w-lg">
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
            Save Smarter, Grow Faster
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/80">
            Join thousands of users who trust SaveFi.
          </p>
        </div>

        <div className="flex gap-8 text-white/80 opacity-0"></div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="text-center lg:hidden">
            <Link to="/">
              <img
                src={Logo}
                alt="SaveFi Logo"
                className="h-16 w-16 cursor-pointer mx-auto"
              />
            </Link>
          </div>

          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold">Welcome back</h2>
            <p className="mt-2 text-gray-500 text-sm sm:text-base">
              Sign in to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                disabled={isLoading}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-full bg-blue-50 px-5 sm:px-6 py-3 focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  disabled={isLoading}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-full bg-blue-50 px-5 sm:px-6 py-3 focus:ring-2 focus:ring-primary"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-primary text-white font-semibold px-4 py-3 text-sm sm:text-base"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card">Or continue with</span>
              </div>
            </div>

            {/* MetaMask */}
            <button className="flex gap-2 items-center justify-center py-3 rounded-full border-2 border-blue w-full">
              <img
                src="https://cdn.worldvectorlogo.com/logos/metamask.svg"
                className="w-5"
              />
              <WalletConnector />
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-primary font-medium"
              >
                Sign up
              </button>
            </p>
          </div>

          <p className="text-center text-xs text-gray-500">
            By continuing, you agree to SaveFi’s Terms & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
