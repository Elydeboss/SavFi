import { Check } from "lucide-react";
import FlexiFi from "../../assets/savingplan/vacation.svg";
import GrowFi from "../../assets/savingplan/growfi.svg";
import VaultFi from "../../assets/savingplan/december.svg";
import SwiftFi from "../../assets/savingplan/emergency.svg";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "FlexFi",
    icon: FlexiFi,
    interest: "2%",
    period: "3 Months",
    description: "Short-term savings with easy access and steady returns",
    features: [
      "2% annual interest",
      "3-month savings plan",
      "Flexible withdrawal",
      "Perfect for short-term goals",
    ],
    color: "bg-primary/10",
    bgColor: "bg-[#F2F8FE]",
    borderColor: "border-blue",
    iconColor: "text-primary",
    popular: false,
    textColor: "text-blue",
  },
  {
    name: "GrowFi",
    icon: GrowFi,
    interest: "4%",
    period: "6 Months",
    description: "Mid-term savings plan for steady growth and better returns",
    features: [
      "4% annual interest",
      "6-month savings plan",
      "Balanced security",
      "Ideal for medium-term goals",
    ],
    color: "bg-success/10",
    bgColor: "bg-[#F7FFFB]",
    borderColor: "border-[#27B97D]",
    iconColor: "text-success",
    popular: true,
    textColor: "text-[#27B97D]",
  },
  {
    name: "VaultFi",
    icon: VaultFi,
    interest: "8%",
    period: "12 Months",
    description:
      "Maximum returns for long-term savers committed to their goals",
    features: [
      "8% annual interest",
      "12-month lock-in",
      "Highest returns",
      "Best for long-term goals",
    ],
    color: "bg-accent/10",
    bgColor: "bg-[#F8F5FF]",
    borderColor: "border-[#7146E8]",
    iconColor: "text-accent",
    popular: false,
    textColor: "text-[#7146E8]",
  },
  {
    name: "SwiftFi",
    icon: SwiftFi,
    interest: "0%",
    period: "Instant Access",
    description: "Perfect for emergency funds with instant withdrawals anytime",
    features: [
      "Instant access to funds",
      "No lock-in period",
      "Minimal withdrawal fees",
      "Perfect for emergencies",
    ],
    color: "bg-muted",
    bgColor: "bg-[#FFFDFB]",
    borderColor: "border-[#E89E50]",
    iconColor: "text-muted-foreground",
    popular: false,
    textColor: "text-[#E89E50]",
  },
];

const SavingsPlans = () => {
  return (
    <section id="products" className="py-20 lg:py-32 bg-[#f2f9ff]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Choose Your Savings Plan
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Flexible options tailored to your financial goals. Start with as low
            as ₦0 and watch your money grow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative ${plan.bgColor} rounded-2xl p-6 lg:p-8 border flex flex-col ${plan.borderColor}  hover:border-2 transition-all duration-300 hover:shadow-lg animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#27B97D] text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}
                >
                  <img src={Icon} className="w-full h-full" />
                </div>

                <h3 className="text-2xl font-bold font-['Sora'] text-foreground mb-2">
                  {plan.name}
                </h3>

                <div className="mb-4">
                  <span className={`text-4xl font-bold  ${plan.textColor}`}>
                    {plan.interest}
                  </span>
                  <span className="text-muted-foreground ml-2">interest</span>
                </div>

                <p className="text-sm font-medium text-muted-foreground mb-4">
                  {plan.period}
                </p>

                <p className="text-foreground/80 mb-6 min-h-12">
                  {plan.description}
                </p>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start space-x-3">
                      <Check
                        className={`w-5 h-5 ${plan.textColor} shrink-0 mt-0.5`}
                      />
                      <span className="text-sm text-foreground/80">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link to="/register" className="w-full">
                  <button
                    className={`w-full mt-auto rounded-xl font-semibold border-2 cursor-pointer py-2 ${
                      plan.popular
                        ? `bg-[#27B97D] text-light hover:opacity-90`
                        : `${plan.borderColor} ${plan.textColor}`
                    }`}
                  >
                    Choose {plan.name}
                  </button>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            All plans are backed by USDT and USDC stablecoins for maximum
            security
          </p>
        </div>
      </div>
    </section>
  );
};

export default SavingsPlans;
