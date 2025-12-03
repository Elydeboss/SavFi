import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import Logo from "../assets/public/logo-dark.svg";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(50),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validated = registerSchema.parse({ username, email, password });
      setIsLoading(true);

      const response = await fetch("/api/accounts/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validated),
      });

      const data = await response.json();

      if (response.status === 201) {
        // Auto-login after successful registration
        const loginResponse = await fetch("/api/accounts/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const loginData = await loginResponse.json();

        if (loginResponse.ok) {
          // Store auth tokens and user data
          const accessToken = loginData.access;
          localStorage.setItem("authToken", accessToken);
          localStorage.setItem("refreshToken", loginData.refresh);
          localStorage.setItem("username", loginData.username || username);
          localStorage.setItem("email", loginData.email || email);

          // Create wallet for user
          try {
            const walletResponse = await fetch("/api/wallets/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            });

            const walletData = await walletResponse.json();

            if (walletResponse.ok) {
              localStorage.setItem("walletAddress", walletData.walletAddress);
              console.log("Wallet created:", walletData.walletAddress);
            } else {
              console.warn("Wallet creation failed:", walletData);
            }
          } catch (walletError) {
            console.warn("Wallet error:", walletError);
          }

          // Mark as new user to trigger welcome modal
          localStorage.setItem("isNewUser", "true");
          localStorage.removeItem("profileCompleted");

          toast.success("Registration successful!");

          navigate("/dashboard");
        }
      } else {
        toast.error("Registration failed", {
          description: data.message || data.error || "An error occurred.",
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.issues[0]?.message || "Validation error";
        toast.error(firstError);
      } else {
        toast.error("Registration error", {
          description: (error as Error).message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleMetaMaskConnect = async () => {
    toast.info("MetaMask integration coming soon!");
  };

  return (
    <div className="flex min-h-screen">
      {/* LEFT SIDE */}
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
            future.
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

      {/* RIGHT SIDE */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          {/* MOBILE LOGO */}
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
            <h2 className="text-3xl font-bold">Create account</h2>
            <p className="mt-2 text-foreground">Start saving today</p>
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
                placeholder="Enter username"
                className="w-full rounded-full bg-blue-50 px-6 py-3 focus:outline-0 focus:ring-2 focus:ring-primary"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-full bg-blue-50 px-6 py-3 focus:outline-0 focus:ring-2 focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
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
                  placeholder="Enter password"
                  className="w-full rounded-full bg-blue-50 px-6 py-3 focus:outline-0 focus:ring-2 focus:ring-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-primary px-4 py-2.5 border-2 border-primary text-white font-semibold hover:bg-primary/90 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? "Creating account..." : "Create account"}
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

            {/* MetaMask Button */}
            <button
              onClick={handleMetaMaskConnect}
              className=" w-full cursor-pointer border-2 border-blue text-blue py-3 rounded-full font-medium hover:bg-blue-50 flex items-center justify-center gap-2"
            >
              <img
                src="https://cdn.worldvectorlogo.com/logos/metamask.svg"
                className="w-5"
              />
              Continue with Metamask
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center text-sm">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-primary font-medium cursor-pointer"
            >
              Sign in
            </button>
          </div>

          {/* Terms */}
          <p className="text-center text-xs text-muted-foreground">
            By continuing, you agree to SaveFi's{" "}
            <a className="text-primary" href="/terms-of-service">
              Terms of Service
            </a>{" "}
            and{" "}
            <a className="text-primary" href="/privacy-policy">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
