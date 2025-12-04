import { Gift, Users, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Referral = () => {
  return (
    <section id="referral" className="py-20 lg:py-32 bg-[#fff8f8]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="bg-linear-to-br from-ring to-[#2e6bd8] rounded-3xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-12 items-center p-8 lg:p-16">
            <div className="text-white text-center md:text-start animate-fade-in">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Gift className="w-4 h-4" />
                <span className="text-sm font-medium">Referral Program</span>
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Earn More by Sharing SaveFi
              </h2>

              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Invite your friends and family to join SaveFi. When they save,
                you both earn bonus rewards. Build your wealth together!
              </p>

              <Link
                to="/signup"
                className="flex justify-center items-center md:justify-start"
              >
                <button className="bg-white flex items-center justify-center md:justify-start cursor-pointer rounded-full font-semibold py-2.5 text-primary hover:bg-white/90 transition-opacity px-8">
                  Get Your Referral Link
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </Link>
            </div>

            <div className="space-y-6 animate-slide-up">
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-['Sora'] text-foreground mb-2">
                      Share Your Link
                    </h3>
                    <p className="text-foreground/80">
                      Send your unique referral link to friends via WhatsApp,
                      SMS, or social media
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center shrink-0">
                    <Gift className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-['Sora'] text-foreground mb-2">
                      They Save & Earn
                    </h3>
                    <p className="text-foreground/80">
                      Your friend signs up, makes their first deposit, and
                      starts earning interest
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                    <TrendingUp className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-['Sora'] text-foreground mb-2">
                      You Both Win
                    </h3>
                    <p className="text-foreground/80">
                      Receive bonus rewards when your referral completes their
                      first savings milestone
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Referral;
