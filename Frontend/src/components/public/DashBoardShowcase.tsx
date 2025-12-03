import { CheckCircle } from "lucide-react";
import Image from "../../assets/public/dashboard2.svg";
import { Link } from "react-router-dom";

const DashBoardShowcase = () => {
  return (
    <section className="w-full bg-linear-to-br from-[#f6f9ff] via-[#eef3ff] to-[#e3eaff] py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-[60%_35%] gap-12 lg:gap-[5%] items-center">
          {/* LEFT SIDE — DASHBOARD IMAGE */}
          <div className="block relative animate-float">
            <img src={Image} alt="Hero Image" className="w-full" />
          </div>

          {/* RIGHT SIDE */}
          <div className="text-foreground flex flex-col justify-center items-center md:items-start md:justify-center">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              See your savings <br /> grow in real time
            </h2>

            <p className="mt-6 text-lg text-center md:text-start text-foreground leading-relaxed max-w-lg">
              Personalized dashboard that lets you take control.
            </p>

            <ul className="mt-8 space-y-4 text-foreground">
              <li className="flex items-center gap-3">
                <span className=" grid place-items-center">
                  <CheckCircle className="text-primary w-5 h-5" />
                </span>
                Live balances & plan status
              </li>
              <li className="flex items-center gap-3">
                <span className=" grid place-items-center">
                  <CheckCircle className="text-primary w-5 h-5" />
                </span>
                One-click deposit & withdrawals
              </li>
              <li className="flex items-center gap-3">
                <span className=" grid place-items-center">
                  <CheckCircle className="text-primary w-5 h-5" />
                </span>
                Real-time interest and conversion info
              </li>
            </ul>

            <Link to="/register" className="mt-10 flex flex-wrap gap-4">
              <button className="px-10 py-3 cursor-pointer rounded-full bg-primary text-light font-semibold shadow-lg hover:bg-primary/90 transition">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashBoardShowcase;
