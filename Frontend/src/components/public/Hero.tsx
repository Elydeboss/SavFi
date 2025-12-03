import { ArrowRight, Shield } from "lucide-react";

import heroImage from "../../assets/public/savefi.jpg";
import heroImage2 from "../../assets/public/hero2.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Financial technology background"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-linear-to-br from-white via-white/90 to-blue/10" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in flex flex-col justify-center items-center md:justify-start md:items-start">
            <div className="inline-flex items-center space-x-2 bg-blue/10 px-4 py-2 rounded-full mb-6">
              <Shield className="w-4 h-4 text-blue" />
              <span className="text-sm font-medium text-blue">
                Secure & Trusted Savings
              </span>
            </div>

            <h1 className="text-3xl lg:text-5xl font-bold  text-foreground mb-6 leading-tight">
              Grow Your Crypto, <br />
              <span className="text-blue">Secure Your Future.</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed text-center sm:text-start max-w-xl">
              Save smart, earn rewards, and build wealth effortlessly.
            </p>

            <Link to="/about-us" className="flex  sm:flex-row gap-4 mb-12">
              <button className="bg-blue text-white flex items-center gap-2 hover:opacity-90 font-semibold cursor-pointer transition-opacity text-base px-8 py-2.5 rounded-full shadow-glow">
                Discover More
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </Link>
          </div>

          {/* Right side illustration/image area */}
          <div className="block relative animate-float">
            <img src={heroImage2} alt="Hero Image" className="rounded-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
