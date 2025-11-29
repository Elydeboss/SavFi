import { Shield, Zap, Globe, Lock, TrendingUp, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description:
      "Your funds are protected with advanced blockchain technology and NIN verification.",
  },
  {
    icon: Zap,
    title: "Instant Conversion",
    description:
      "Automatic Naira to stablecoin conversion at live market rates with transparent fees.",
  },
  {
    icon: Lock,
    title: "Protected from Inflation",
    description:
      "Save in USDT or USDC to shield your money from Naira devaluation.",
  },
  {
    icon: TrendingUp,
    title: "Earn Up to 8%",
    description:
      "Choose from flexible plans offering interest rates from 2% to 8% annually.",
  },
  {
    icon: Globe,
    title: "Simple Withdrawals",
    description:
      "Cash out to your bank account or crypto wallet anytime with low fees.",
  },
  {
    icon: Users,
    title: "Referral Rewards",
    description:
      "Earn bonuses by inviting friends and family to join the SaveFi community.",
  },
];

const Features = () => {
  return (
    <section className="py-20 lg:py-32 bg-[#f2f9ff]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Why Choose SaveFi?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built for Nigerians who want to save smarter and grow their wealth
            securely
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-card rounded-2xl p-8 border border-border hover:border-primary transition-all duration-300 hover:shadow-lg animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-primary" />
                </div>

                <h3 className="text-xl font-bold font-['Sora'] text-foreground mb-3">
                  {feature.title}
                </h3>

                <p className="text-foreground/80 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
