import { Star, Quote, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const testimonials = [
  {
    name: "Chioma Adeleke",
    role: "Small Business Owner",
    avatar: "CA",
    rating: 5,
    text: "SaveFi has completely changed how I save. No more worrying about the Naira losing value. I've already earned 4% on my 6-month plan!",
  },
  {
    name: "Ibrahim Mohammed",
    role: "Software Developer",
    avatar: "IM",
    rating: 5,
    text: "Finally, a savings platform that makes sense for Nigerians. The automatic conversion to USDT is brilliant. I've referred 5 friends already!",
  },
  {
    name: "Blessing Okafor",
    role: "Medical Student",
    avatar: "BO",
    rating: 5,
    text: "SwiftFi is perfect for my emergency fund. Instant access when I need it, and I can move to GrowFi when I'm ready to earn interest.",
  },
  {
    name: "Tunde Bakare",
    role: "Entrepreneur",
    avatar: "TB",
    rating: 5,
    text: "The 8% interest on VaultFi is unbeatable. My business savings are growing steadily, and I feel secure knowing it's in stablecoins.",
  },
];

const Community = () => {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Join the SaveFi Community
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what our users are saying about their savings journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-card rounded-2xl p-6 lg:p-8 border border-border hover:border-primary transition-all duration-300 hover:shadow-lg animate-slide-up relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Quote className="w-10 h-10 text-primary/20 absolute top-4 right-4" />

              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-foreground/80 leading-relaxed">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-8 bg-[#f2f9ff] rounded-2xl p-8 lg:p-12 border border-primary/20">
            <div className="text-center lg:text-left">
              <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Growing Every Day
              </h3>
              <p className="text-muted-foreground">
                Join thousands of Nigerians saving smarter with SaveFi
              </p>
              <Link to="/register">
                <button className="bg-primary mt-4 inline-flex items-center font-semibold text-white py-2.5 cursor-pointer rounded-full hover:bg-primary/90 transition-opacity px-10 shadow-lg">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-8 lg:gap-12">
              <div className="text-center">
                <p className="text-3xl lg:text-4xl font-bold text-primary">
                  10K+
                </p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
              <div className="text-center">
                <p className="text-3xl lg:text-4xl font-bold text-primary">
                  ₦2B+
                </p>
                <p className="text-sm text-muted-foreground">Saved</p>
              </div>
              <div className="text-center">
                <p className="text-3xl lg:text-4xl font-bold text-primary">
                  4.9
                </p>
                <p className="text-sm text-muted-foreground">Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
