import Navbar from "../components/dashboard/Navbar";

import Breadcrumb from "../components/Breadcrumb";

import { RiCheckboxCircleFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import FlexiFi from "../assets/savingplan/vacation.svg";
import GrowFi from "../assets/savingplan/growfi.svg";
import VaultFi from "../assets/savingplan/december.svg";
import SwiftFi from "../assets/savingplan/emergency.svg";

const plans = [
  {
    id: "flexfi",
    name: "FlexiFi",
    subtitle: "Flexible savings",
    interest: "3%",
    icon: FlexiFi,
    features: ["Ideal for short-term goals", "3 months lock period"],
    color: "text-blue",
    buttonClass: "bg-blue text-white hover:bg-blue/90",
    cardClass: "border-blue bg-[#F2F8FE] hover:border-blue/40",
    iconClass: "bg-flexfi-light text-flexfi",
  },
  {
    id: "growfi",
    name: "GrowFi",
    subtitle: "Growth plan",
    interest: "5%",
    icon: GrowFi,
    features: ["Ideal for short-term goals", "3 months lock period"],
    color: "text-[#27B97D]",
    buttonClass: "bg-[#27B97D] text-white hover:bg-[#27B97D]/90",
    cardClass: "border-[#27B97D] bg-[#F7FFFB] hover:border-[#27B97D]/40",
    iconClass: "bg-growfi-light text-growfi",
  },
  {
    id: "vaultfi",
    name: "VaultFi",
    subtitle: "Locked vault",
    interest: "8%",
    icon: VaultFi,
    features: ["Maximize your earnings", "12 months lock period"],
    color: "text-[#7146E8]",
    buttonClass: "bg-[#7146E8] text-white hover:bg-[#7146E8]/90",
    cardClass: "border-[#7146E8] bg-[#F8F5FF] hover:border-[#7146E8]/40",
    iconClass: "bg-vaultfi-light text-vaultfi",
  },
  {
    id: "swiftfi",
    name: "SwiftFi",
    subtitle: "Emergency funds",
    interest: "0%",
    icon: SwiftFi,
    features: ["No lock period", "Withdraw anytime"],
    color: "text-[#E89E50]",
    buttonClass: "bg-[#E89E50] text-white hover:bg-[#E89E50]/90",
    cardClass: "border-[#E89E50] bg-[#FFFDFB]  hover:border-[#E89E50]/40",
    iconClass: "bg-swiftfi-light text-swiftfi",
  },
];

export default function StartNewPlan() {
  const navigate = useNavigate();

  const handleSelectPlan = (planId: string) => {
    if (planId === "swiftfi") {
      navigate("/savings/swiftfi");
    } else {
      navigate(`/savings/${planId}/create`);
    }
  };

  return (
    <div className="bg-neutral-200 min-h-screen dark:bg-gray-600 dark:text-white">
      <div className="">
        <Navbar title="Start new plan" />

        <div className="p-4">
          <Breadcrumb
            items={[
              { label: "Savings plan", href: "/savings" },
              { label: "Start new plan" },
            ]}
          />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Pick a plan that best fits your saving goal
          </h2>
          <p className="text-muted-foreground mb-8">
            All plans are funded from your USDT total balance. Lock in for
            interest, or stay flexible with SwiftFi
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`dark:bg-gray-700 dark:text-white rounded-2xl p-3 border transition-all ${plan.cardClass}`}
              >
                {/* Icon & Title */}
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${plan.iconClass}`}
                >
                  <img src={plan.icon} className="" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm dark:text-white/80 text-muted-foreground mb-6">
                  {plan.subtitle}
                </p>

                {/* Interest Rate */}
                <div className="mb-6">
                  <p className="text-4xl font-bold text-foreground mb-1">
                    {plan.interest}
                    <span className="text-lg text-muted-foreground ml-1">
                      Interest
                    </span>
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <RiCheckboxCircleFill
                        className={`w-5 h-5 mt-0.5 shrink ${plan.color}`}
                      />
                      <span className="text-[13px] dark:text-white/80 whitespace-nowrap text-[#67686B]">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full py-2 font-semibold cursor-pointer rounded-full ${plan.buttonClass}`}
                >
                  Save now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
