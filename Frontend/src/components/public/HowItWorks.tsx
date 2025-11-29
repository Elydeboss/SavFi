import { UserCheck, Coins, TrendingUp, Banknote, Zap } from "lucide-react";

const steps = [
  {
    icon: UserCheck,
    title: "Create Account",
    description:
      "Sign up with your NIN for secure verification. Quick and easy onboarding process.",
    color: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: Coins,
    title: "Deposit Naira",
    description:
      "Add funds in Naira and we automatically convert to USDT or USDC at live market rates.",
    color: "bg-success/10",
    iconColor: "text-success",
  },
  {
    icon: TrendingUp,
    title: "Choose Plan",
    description:
      "Select a savings plan that matches your goals. From instant access to 12-month lock-ins.",
    color: "bg-accent/10",
    iconColor: "text-accent",
  },
  {
    icon: Banknote,
    title: "Earn & Withdraw",
    description:
      "Watch your savings grow with interest. Withdraw anytime to your bank or crypto wallet.",
    color: "bg-primary/10",
    iconColor: "text-primary",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 lg:py-32 ">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            How SaveFi Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start saving in minutes with our simple, secure process
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="relative animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-linear-to-r from-primary/50 to-transparent z-0" />
                )}

                <div className="relative bg-card rounded-2xl p-6 lg:p-8 border border-border hover:border-primary transition-all duration-300 hover:shadow-lg z-10">
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center mb-6 relative`}
                    >
                      <Icon className={`w-10 h-10 ${step.iconColor}`} />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                        {index + 1}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold font-['Sora'] text-foreground mb-3">
                      {step.title}
                    </h3>

                    <p className="text-foreground/80 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-[#f2f9ff] px-6 py-3 rounded-full">
            <span className="text-primary font-semibold">
              {" "}
              <Zap />{" "}
            </span>
            <span className="text-foreground font-medium">
              No crypto knowledge required - we handle everything for you
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
