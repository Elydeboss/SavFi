import { ArrowRight, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-20 lg:py-32 bg-[#fff8f8]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="bg-linear-to-br from-ring to-[#2e6bd8] rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
          </div>

          <div className="relative text-center py-16 lg:py-24 px-6 lg:px-12">
            <div className="max-w-3xl mx-auto animate-fade-in">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Shield className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">
                  Trusted by 10,000+ Users
                </span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Start Your Savings Journey Today
              </h2>

              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                Join thousands of Nigerians protecting their wealth and earning
                interest with blockchain-powered savings. No minimum deposit
                required.
              </p>

              <Link
                to="/register"
                className="flex sm:flex-row gap-4 justify-center"
              >
                <button className="bg-white flex items-center font-semibold text-primary py-2.5 cursor-pointer rounded-full hover:bg-white/90 transition-opacity px-10 shadow-lg">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </Link>

              <p className="text-white/80 text-sm mt-8">
                Sign up in under 2 minutes • No credit card required •
                Bank-grade security
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
