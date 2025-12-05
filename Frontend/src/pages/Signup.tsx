import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import Logo from "../assets/public/logo-dark.svg";
import Logo2 from "../assets/SavFi-logo.png";
import Wallets from "../Modal/Metamask";
import { useUserProfile } from "../contexts/UserProfileContext";
import { ethers } from "ethers";

const API_BASE = "https://wallet-api-55mt.onrender.com";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { clearProfile, refreshProfile, setWallet } = useUserProfile();
  const wallet = ethers.Wallet.createRandom();

  const walletAddress = wallet.address;

  console.log(walletAddress);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validated = registerSchema.parse({ username, email, password });
      setIsLoading(true);

      clearProfile();

      // REGISTER
      const registerRes = await fetch(`${API_BASE}/accounts/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      const registerData = await registerRes.json();
      console.log("REGISTER:", registerData);

      if (registerRes.status !== 201) {
        toast.error("Registration failed", {
          description: registerData.message || registerData.error,
        });
        return;
      }

      // LOGIN
      const loginRes = await fetch(`${API_BASE}/accounts/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      console.log("Login REQ:", { username, password });

      console.log("LOGIN RES:", loginRes);

      const loginData = await loginRes.json();
      console.log("LOGIN:", loginData);
      console.log(loginData.username);

      if (!loginRes.ok) {
        toast.error("Login failed after registration");
        return;
      }

      const accessToken = loginData.access;
      localStorage.setItem("authToken", accessToken);
      localStorage.setItem("refreshToken", loginData.refresh);
      localStorage.setItem("username", loginData.username);
      localStorage.setItem("email", loginData.email);

      // CREATE WALLET
      const walletRes = await fetch(`${API_BASE}/wallets/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          owner: loginData.username,
          address: [walletAddress],
          idempotency_key: `wallet-${Date.now()}-${loginData.username}`,
        }),
      });

      const walletData = await walletRes.json();
      console.log("WALLET:", walletData);

      if (walletRes.ok && walletData?.address) {
        localStorage.setItem("walletAddress", walletData.address);
        setWallet(walletData);
      } else {
        toast.error("Wallet creation failed");
        console.error("Wallet creation error:", walletData);
      }

      localStorage.setItem("isNewUser", "true");
      localStorage.removeItem("profileCompleted");

      await refreshProfile();

      toast.success("Account created!");
      navigate("/dashboard");
    } catch (err: any) {
      if (err instanceof z.ZodError) toast.error(err.issues[0].message);
      else toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* LEFT SIDE (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-primary via-blue-600 to-blue-800 p-6 sm:p-12 flex-col justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={Logo} alt="SaveFi Logo" className="h-20 w-20" />
        </Link>

        <div className="max-w-md">
          <h1 className="text-4xl font-bold text-white">
            Save Smarter, Grow Faster
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Join thousands of users who trust SaveFi to secure their future.
          </p>
        </div>

        <div className="opacity-0">
          This keeps layout balanced — intentional
        </div>
      </div>

      {/* RIGHT SIDE (main content) */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-10 sm:px-10">
        <div className="w-full max-w-md space-y-8">
          {/* MOBILE LOGO */}
          <div className="lg:hidden flex justify-center mb-2">
            <Link to="/" className=" flex justify-center mb-6">
              <img
                src={Logo2}
                alt="SaveFi Logo"
                className="w-25 cursor-pointer"
              />
            </Link>
          </div>

          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold">Create account</h2>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">
              Start saving today
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Username */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <input
                type="text"
                placeholder="Enter username"
                className="w-full rounded-full bg-blue-50 px-5 py-3 text-sm sm:text-base focus:ring-2 focus:ring-primary"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-full bg-blue-50 px-5 py-3 text-sm sm:text-base focus:ring-2 focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full rounded-full bg-blue-50 px-5 py-3 text-sm sm:text-base focus:ring-2 focus:ring-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-primary"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-primary border-2 border-primary text-white font-semibold py-3 text-sm sm:text-base hover:bg-primary/90 disabled:opacity-50"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-gray-600 text-sm">
                  Or continue with
                </span>
              </div>
            </div>

            {/* MetaMask */}
            <button className="w-full border-2 border-blue text-blue py-3 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-blue-50">
              <img
                src="https://cdn.worldvectorlogo.com/logos/metamask.svg"
                className="w-5"
              />
              <Wallets />
            </button>
          </form>

          {/* Login Redirect */}
          <div className="text-center text-sm">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-primary font-medium"
            >
              Sign in
            </button>
          </div>

          {/* Terms */}
          <p className="text-center text-xs text-gray-500 leading-relaxed px-4">
            By continuing, you agree to SaveFi’s{" "}
            <a href="/terms-of-service" className="text-primary underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy-policy" className="text-primary underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
