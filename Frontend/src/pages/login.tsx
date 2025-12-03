import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import Logo from "../assets/public/logo-dark.svg";
import { useUserProfile } from "../contexts/UserProfileContext";
import WalletConnector from "../Modal/Metamask";

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

      const response = await fetch("/api/accounts/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validated),
      });

      const data = await response.json();

      if (response.status === 200 || response.ok) {
        // Store user data and token - backend returns "access" and "refresh" tokens
        localStorage.setItem("authToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        localStorage.setItem("username", data.username || username);
        localStorage.setItem("email", data.email || "");

        // Clear new user flag on login (existing users)
        // localStorage.removeItem("isNewUser");

        updateProfile({
          username: data.username,
          email: data.email,
          first_name: data.first_name,
          second_name: data.second_name,
          avatar: data.avatar,
        });

        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error(
          "Login failed: " +
            (data.message || data.error || "Invalid username or password")
        );
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(
          "Login failed: " +
            (error instanceof z.ZodError
              ? error.issues[0]?.message
              : "An unexpected error occurred")
        );
      } else {
        toast.error(
          "An unexpected error occurred during login.Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="hidden w-1/2 bg-linear-to-br from-primary via-blue-600 to-blue-800 p-12 lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3">
          <Link to="/">
            <img
              src={Logo}
              alt="SaveFi Logo"
              className="h-30 w-30 cursor-pointer"
            />
          </Link>
        </div>

        <div className="max-w-md">
          <h1 className="mb-4 text-4xl font-bold text-white">
            Save Smarter, Grow Faster
          </h1>
          <p className="text-lg text-white/80">
            Join thousands of users who trust SaveFi to secure their financial
            future with flexible savings plans and competitive interest rates.
          </p>
        </div>

        <div className="flex gap-8 text-white/80 opacity-0">
          <div>
            <p className="text-3xl font-bold text-white">10K+</p>
            <p className="text-sm">Active Users</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">$2M+</p>
            <p className="text-sm">Saved</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">8%</p>
            <p className="text-sm">Max Interest</p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div className="flex items-center justify-center gap-3 lg:hidden">
            <Link to="/">
              <img
                src={Logo}
                alt="SaveFi Logo"
                className="h-25 w-25 cursor-pointer"
              />
            </Link>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold">Welcome back</h2>
            <p className="mt-2 text-gray-500">
              Sign in to continue to your account
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                className="w-full rounded-full bg-blue-50 px-6 py-3 focus:outline-0 focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full rounded-full bg-blue-50 px-6 py-3 focus:outline-0 focus:ring-2 focus:ring-primary"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary cursor-pointer"
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
              className="w-full rounded-full bg-primary px-4 py-2.5 border-2 border-primary text-white font-semibold hover:bg-primary/90 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>

            {/* Divider */}
            <div className="relative mt-4 mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card font-medium text-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            {/* MetaMask */}
            <button className=" w-full cursor-pointer border-2 border-blue text-blue py-3 rounded-full font-medium hover:bg-blue-50 flex items-center justify-center gap-2">
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
                className="font-medium text-primary cursor-pointer"
              >
                Sign up
              </button>
            </p>
          </div>

          <p className="text-center text-xs text-gray-500">
            By continuing, you agree to SaveFi’s{" "}
            <a href="/terms-of-service" className="text-primary underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy-policy" className="text-primary underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
