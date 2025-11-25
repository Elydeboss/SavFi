import React, { useState } from "react";
import {
  Menu,
  X,
  ShieldCheck,
  RefreshCw,
  Smartphone,
  PiggyBank,
  Zap,
  Share2,
  UserPlus,
  Coins,
  Info,
  CheckCircle2,
  Lock,
  ArrowRight,
} from "lucide-react";
import card from "../assets/img/card-coin.svg";
import Lady from "../assets/img/Rectangle 12.png";
import Frame from "../assets/img/Frame 1686563515.png";
import Dashimage from "../assets/img/Dashboard.png";
import Shield from "../assets/img/Shield Star.svg";
import trade from "../assets/img/trade.svg";

const SavFiLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* --- Navigation --- */}
      <nav className="flex justify-between items-center px-15 py-4  mx-auto">
        <div className="text-2xl font-bold text-blue-500 cursor-pointer">
          SavFi
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 text-gray-600 font-medium">
          <a href="#" className="hover:text-blue-500">
            Home
          </a>
          <a href="#" className="hover:text-blue-500">
            Products
          </a>
          <a href="#" className="hover:text-blue-500">
            About Us
          </a>
          <a href="#" className="hover:text-blue-500">
            Contact
          </a>
        </div>

        <button className="hidden md:block px-6 py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition">
          Sign In
        </button>

        {/* Mobile Menu Toggle */}
        <button onClick={toggleMenu} className="md:hidden text-gray-600">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg p-4 flex flex-col space-y-4 absolute w-full z-50">
          <a href="#" className="text-gray-600 hover:text-blue-500">
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-500">
            Products
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-500">
            About Us
          </a>
          <button className="px-6 py-2 bg-blue-500 text-white rounded-full font-semibold w-full">
            Sign In
          </button>
        </div>
      )}

      {/* --- Hero Section --- */}
      <header className="px-15 py-12 md:py-20 mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-500 leading-tight">
            Save Your Crypto, <br />
            Secure Your Future
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-md">
            The easiest way to save your stablecoins and earn high yields while
            protecting your assets.
          </p>
          <button className="px-8 py-3 bg-blue-500 text-white rounded-full font-bold text-lg hover:bg-blue-600 transition shadow-lg">
            Get Started
          </button>
        </div>

        {/* Hero Image Placeholder */}
        <div className="relative flex items-center justify-center  overflow-hidden">
          {/* Abstract representation of the phone/dashboard graphic */}
          <div className="relative flex flex-col items-center pt-4">
            <div className="w-74 h-95 mb-4 overflow-hidden">
              <img
                src={Lady}
                alt="User"
                className="w-full h-full fit opacity-80"
              />
            </div>

            {/* Floating Elements */}
            <div className="absolute top-30 -right-12 bg-white py-4 px-6 rounded-lg shadow-md text-xs font-bold text-green-500 flex items-center gap-1">
              <ArrowRight size={12} /> +14% Yield
            </div>
            <div className="absolute bottom-15 -right-12 bg-white py-4 px-6 rounded-lg shadow-md text-xs font-bold text-green-500 flex items-center gap-1">
              <ArrowRight size={12} /> +14% Yield
            </div>
            <div className="absolute top-15 -left-12 bg-white py-4 px-6 rounded-lg shadow-md text-xs font-bold text-blue-500">
              <ShieldCheck size={16} className="inline mr-1" /> Protected
            </div>
            <div className="absolute bottom-20 -left-12 bg-white py-4 px-6 rounded-lg shadow-md text-xs font-bold text-blue-500">
              <ShieldCheck size={16} className="inline mr-1" /> Protected
            </div>
          </div>
        </div>
      </header>

      {/* --- Why SavFi? Section --- */}
      <section className="bg-blue-50 py-16 px-6">
        <div className="w-full px-12 mx-auto">
          <h2 className="text-center text-3xl font-bold text-blue-500 mb-12">
            Why SavFi ?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-blue-500 text-white p-8 rounded-2xl shadow-lg flex flex-col items-center text-center hover:transform hover:-translate-y-1 transition duration-300">
              <div className="bg-white/20 p-4 rounded-full mb-6">
                <img src={Shield} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Safe & Secure Savings</h3>
              <p className="text-blue-100 text-sm">
                We use bank-grade security protocols to ensure your digital
                assets are protected at all times against unauthorized access.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-blue-500 text-white p-8 rounded-2xl shadow-lg flex flex-col items-center text-center hover:transform hover:-translate-y-1 transition duration-300">
              <div className="bg-white/20 p-4 rounded-full mb-6">
                <img src={trade} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Auto-Compound Interest</h3>
              <p className="text-blue-100 text-sm">
                Your earnings are automatically reinvested, allowing your
                savings to grow exponentially over time without extra effort.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-blue-500 text-white p-8 rounded-2xl shadow-lg flex flex-col items-center text-center hover:transform hover:-translate-y-1 transition duration-300">
              <div className="bg-white/20 p-4 rounded-full mb-6">
                <img src={card} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">No Hidden Withdrawals</h3>
              <p className="text-blue-100 text-sm">
                Access your funds whenever you need them. We maintain full
                transparency with no hidden fees or lock-in periods on flexible
                plans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- How It Works --- */}
      <section className="py-20 px-24 mx-auto">
        <h2 className="text-center text-3xl font-bold text-blue-500 mb-16">
          How It Works
        </h2>

        <div className="grid md:grid-cols-2 gap-4 items-center">
          <div>
            <img src={Dashimage} alt="dashbprd image" className="w-80" />
          </div>
          <div className="relative space-y-4 pl-4 md:pl-0">
            {/* Vertical Line for Desktop */}
            <div className="hidden md:block absolute left-[20px] top-0 bottom-0 w-1 bg-blue-100"></div>

            {/* Step 1 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <span className="text-5xl font-bold text-blue-400 opacity-80">
                  01
                </span>
              </div>
              <div className="pt-2">
                <h3 className="text-xl font-bold text-blue-500 mb-2">
                  Create Account
                </h3>
                <p className="text-gray-600">
                  Sign up in minutes using your email. Verify your identity to
                  ensure a secure environment for all our users.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <span className="text-5xl font-bold text-blue-400 opacity-80">
                  02
                </span>
              </div>
              <div className="pt-2">
                <h3 className="text-xl font-bold text-blue-500 mb-2">
                  Choose a plan
                </h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Flexi Save</li>
                  <li>• Vault Save</li>
                  <li>• Target Save</li>
                  <li>• Fixed Deposit (coming soon)</li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <span className="text-5xl font-bold text-blue-400 opacity-80">
                  03
                </span>
              </div>
              <div className="pt-2">
                <h3 className="text-xl font-bold text-blue-500 mb-2">
                  Earn & Withdraw
                </h3>
                <p className="text-gray-600">
                  Watch your interest grow daily. Withdraw your capital and
                  interest directly to your wallet whenever the plan matures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Choose Saving Plan --- */}
      <section className="py-16 px-6 max-w-7xl mx-auto mb-34">
        <h2 className="text-center text-3xl font-bold text-blue-600 mb-12">
          Choose the saving plan that fits you.
        </h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Plan 1 - VauFi (Purple) */}
          <div className="bg-purple-600 rounded-3xl p-8 text-white relative overflow-hidden h-64 flex flex-col justify-end shadow-xl hover:shadow-2xl transition">
            <div className="absolute top-6 left-6 bg-white/20 p-3 rounded-full">
              <Lock size={32} />
            </div>
            <span className="absolute top-6 right-6 bg-white/30 text-xs px-3 py-1 rounded-full">
              Fixed Savings
            </span>
            <h3 className="text-3xl font-bold mb-2">VauFi</h3>
            <p className="text-purple-100 text-sm">
              Lock funds for a specific period to earn higher interest rates.
            </p>
          </div>

          {/* Plan 2 - GrowFi (Green) */}
          <div className="bg-green-600 rounded-3xl p-8 text-white relative overflow-hidden h-64 flex flex-col justify-end shadow-xl hover:shadow-2xl transition">
            <div className="absolute top-6 left-6 bg-white/20 p-3 rounded-full">
              <RefreshCw size={32} />
            </div>
            <span className="absolute top-6 right-6 bg-white/30 text-xs px-3 py-1 rounded-full">
              Auto Invest
            </span>
            <h3 className="text-3xl font-bold mb-2">GrowFi</h3>
            <p className="text-green-100 text-sm">
              Automated recurring savings to help you meet your long term goals.
            </p>
          </div>

          {/* Plan 3 - HushFi (Blue) */}
          <div className="bg-blue-500 rounded-3xl p-8 text-white relative overflow-hidden h-64 flex flex-col justify-end shadow-xl hover:shadow-2xl transition">
            <div className="absolute top-6 left-6 bg-white/20 p-3 rounded-full">
              <PiggyBank size={32} />
            </div>
            <span className="absolute top-6 right-6 bg-white/30 text-xs px-3 py-1 rounded-full">
              Spare Change
            </span>
            <h3 className="text-3xl font-bold mb-2">HushFi</h3>
            <p className="text-blue-100 text-sm">
              Save small amounts daily or weekly without pressure.
            </p>
          </div>

          {/* Plan 4 - SwiftFi (Yellow) */}
          <div className="bg-yellow-400 rounded-3xl p-8 text-white relative overflow-hidden h-64 flex flex-col justify-end shadow-xl hover:shadow-2xl transition">
            <div className="absolute top-6 left-6 bg-white/20 p-3 rounded-full">
              <Zap size={32} />
            </div>
            <span className="absolute top-6 right-6 bg-white/30 text-xs px-3 py-1 rounded-full">
              Emergency
            </span>
            <h3 className="text-3xl font-bold mb-2 text-yellow-900">SwiftFi</h3>
            <p className="text-yellow-800 text-sm">
              Flexible savings you can withdraw from at any time.
            </p>
          </div>
        </div>
      </section>

      {/* --- Referral Section --- */}
      <section className="py-16 px-34 mx-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-2">
          How to Earn in 3 Simple Steps
        </h2>
        <p className="text-gray-500 mb-12">
          Join our referral program. Invite friends and earn SavFi points.
        </p>

        <div className="space-y-12">
          {/* Step 1 */}
          <div>
            <h3 className="text-xl font-bold text-blue-500 mb-4">
              Share Your Link.
            </h3>
            <div className="flex gap-4">
              <div className="p-3 bg-blue-50 text-blue-500 rounded-full h-fit">
                <Share2 size={32} />
              </div>
              <p className="text-gray-600 max-w-md pt-2">
                Copy your unique referral link from your dashboard and share it
                with friends via social media or direct message.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div>
            <h3 className="text-xl font-bold text-blue-500 mb-4">
              Friend Signs Up & Save.
            </h3>
            <div className="flex gap-4">
              <div className="p-3 bg-blue-50 text-blue-500 rounded-full h-fit">
                <UserPlus size={32} />
              </div>
              <p className="text-gray-600 max-w-md pt-2">
                Your friend must sign up using your link and create a savings
                plan.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div>
            <h3 className="text-xl font-bold text-blue-500 mb-4">
              You Earn SavFi points
            </h3>
            <div className="flex gap-4">
              <div className="p-3 bg-blue-50 text-blue-500 rounded-full h-fit">
                <Coins size={32} />
              </div>
              <p className="text-gray-600 max-w-md pt-2">
                You receive SavFi points immediately once your friend completes
                their first deposit.
              </p>
            </div>
          </div>

          {/* Note */}
          <div>
            <h3 className="text-xl font-bold text-blue-500 mb-4">Note</h3>
            <div className="flex gap-4">
              <div className="p-3 bg-blue-50 text-blue-500 rounded-full h-fit">
                <Info size={32} />
              </div>
              <p className="text-gray-800 font-bold max-w-md pt-2">
                Please note savings made with the SwiftFi plan do not qualify
                for referral rewards.
              </p>
            </div>
          </div>
        </div>

        {/* What Can You Do Section */}
        <div className="mt-16 p-8 rounded-2xl">
          <h3 className="text-2xl font-bold text-blue-500 mb-6">
            What You Can Do With Your Points
          </h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
              <span className="font-semibold text-gray-700">
                Hold for their value
              </span>
            </li>
            <li className="flex items-center gap-3">
              <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
              <span className="font-semibold text-gray-700">
                Convert to cash
              </span>
            </li>
            <li className="flex items-center gap-3">
              <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
              <span className="font-semibold text-gray-700">
                Withdraw your money
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-gray-900 text-white">
        {/* Newsletter Section */}
        <div className="bg-blue-500 py-12 px-34 px-6">
          <div className=" mx-auto flex py-24 flex-col md:flex-row justify-between items-center gap-6">
            <h3 className="text-2xl font-bold text-white max-w-xs">
              Subscribe to our newsletter today.
            </h3>
            <div className="flex w-full md:w-auto bg-white/20 p-2 rounded-xl backdrop-blur-sm">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-transparent border-none text-white placeholder-blue-100 px-4 py-2 outline-none flex-grow w-full md:w-64"
              />
              <button className="bg-white text-blue-500 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="px-6 py-16 item-center justify-center px-34 mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h4 className="font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Press
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Product</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  VauFi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  GrowFi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  HushFi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  SwiftFi
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <Smartphone size={16} /> +234 812 345 6789
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight size={16} /> support@savfi.com
              </li>
              <li className="flex items-start gap-2">
                <div className="w-4 mt-1">
                  <CheckCircle2 size={16} />
                </div>{" "}
                Lagos, Nigeria
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 p-6 text-center text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} SavFi. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default SavFiLanding;
