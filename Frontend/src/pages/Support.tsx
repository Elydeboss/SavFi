import Navigation from "../components/public/Navigation";
import FAQ from "../components/public/FAQ";
import Footer from "../components/public/Footer";
import { Mail, MessageCircle, Phone, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Get help via email within 24 hours",
    action: "support@savfi.com",
    href: "mailto:support@savfi.com",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Chat",
    description: "Chat with us instantly on WhatsApp",
    action: "Start Chat",
    href: "https://wa.me/2348000000000",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Call us Monday to Friday, 9 AM - 6 PM",
    action: "+234 800 000 0000",
    href: "tel:+2348000000000",
  },
  {
    icon: Clock,
    title: "Live Chat",
    description: "Available 24/7 for urgent queries",
    action: "Coming Soon",
    href: "#",
  },
];

const Support = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-linear-to-br from-blue via-blue-600 to-blue-800 py-20">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold  text-white mb-6 animate-fade-in">
              How Can We Help You?
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto animate-fade-in">
              Our dedicated support team is here to assist you 24/7. Get answers
              to your questions or reach out directly for personalized help.
            </p>
          </div>
        </div>

        {/* Contact Methods Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold  text-foreground mb-4">
                Get In Touch
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose your preferred way to reach our support team
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <div
                    key={method.title}
                    className="bg-card rounded-2xl p-6 border border-border hover:border-primary transition-all duration-300 text-center animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold  text-foreground mb-2">
                      {method.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {method.description}
                    </p>
                    {method.href === "#" ? (
                      <span className="text-primary font-semibold">
                        {method.action}
                      </span>
                    ) : (
                      <a
                        href={method.href}
                        target={
                          method.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          method.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="text-primary hover:text-primary-dark font-semibold transition-colors"
                      >
                        {method.action}
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Help Center Section */}
        <section className="py-20 lg:py-32 bg-[#f2f9ff]">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold  text-foreground mb-4">
                  Quick Help Resources
                </h2>
                <p className="text-xl text-muted-foreground">
                  Find instant answers to common questions
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-card rounded-2xl p-6 border border-border hover:border-primary transition-all duration-300">
                  <h3 className="text-lg font-bold  text-foreground mb-2">
                    Getting Started
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Learn how to create an account and make your first deposit
                  </p>
                  <button
                    onClick={() => navigate("/guide")}
                    className="w-full py-2 px-6 rounded-full cursor-pointer font-medium bg-muted border-2 border-muted"
                  >
                    Read Guide
                  </button>
                </div>

                <div className="bg-card rounded-2xl p-6 border border-border hover:border-primary transition-all duration-300">
                  <h3 className="text-lg font-bold  text-foreground mb-2">
                    Savings Plans
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Compare plans and choose the best one for your goals
                  </p>
                  <button className="w-full py-2 px-6 rounded-full cursor-pointer font-medium bg-muted border-2 border-muted">
                    View Plans
                  </button>
                </div>

                <div className="bg-card rounded-2xl p-6 border border-border hover:border-primary transition-all duration-300">
                  <h3 className="text-lg font-bold  text-foreground mb-2">
                    Security & Safety
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Understand how we protect your money and data
                  </p>
                  <button className="w-full py-2 px-6 rounded-full cursor-pointer font-medium bg-muted border-2 border-muted">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 lg:py-32 bg-[#f2f9ff]">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold font-['Inter'] text-foreground mb-4">
                  Send Us a Message
                </h2>
                <p className="text-xl text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24
                  hours
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-full border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-full border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-full border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="What is this about?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-6 rounded-full cursor-pointer font-semibold bg-primary text-light hover:bg-primary/90"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <FAQ />
      </div>
      <Footer />
    </main>
  );
};

export default Support;
