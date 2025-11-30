import Navigation from "../components/public/Navigation";
import Footer from "../components/public/Footer";
import {
  Shield,
  Lock,
  Eye,
  Server,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const SecurityPage = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: "Bank-Grade Encryption",
      description:
        "All data is encrypted using industry-standard AES-256 encryption both in transit and at rest.",
    },
    {
      icon: Lock,
      title: "Secure Authentication",
      description:
        "Multi-factor authentication and secure password policies protect your account from unauthorized access.",
    },
    {
      icon: Eye,
      title: "Privacy Protection",
      description:
        "We never share your personal information with third parties without your explicit consent.",
    },
    {
      icon: Server,
      title: "Blockchain Security",
      description:
        "Funds are secured on blockchain networks with smart contract audits and multi-signature wallets.",
    },
  ];

  const bestPractices = [
    "Enable two-factor authentication (2FA) on your account",
    "Use a strong, unique password for your SavFi account",
    "Never share your password or recovery phrases with anyone",
    "Regularly review your account activity for any suspicious transactions",
    "Keep your email and phone number up to date for security notifications",
    "Be cautious of phishing attempts - we'll never ask for your password via email",
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-linear-to-br from-blue via-blue-600 to-blue-800 py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold font-['Inter'] text-white mb-6 animate-fade-in">
              Security & Trust
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto animate-fade-in">
              Your security is our top priority. Learn how we protect your funds
              and personal information with industry-leading security measures.
            </p>
          </div>
        </div>

        {/* Security Features */}
        <section className="py-20 lg:py-32 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-['Inter'] text-foreground mb-4">
                How We Protect You
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Multiple layers of security to keep your savings safe and secure
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {securityFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="bg-card rounded-2xl p-8 border border-border hover:border-primary transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold font-['Inter'] text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="py-20 lg:py-32 bg-gradient-soft">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold font-['Inter'] text-foreground mb-4">
                  Security Best Practices
                </h2>
                <p className="text-xl text-muted-foreground">
                  Follow these guidelines to keep your account secure
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 lg:p-12 border border-border">
                <ul className="space-y-4">
                  {bestPractices.map((practice, index) => (
                    <li key={index} className="flex items-start space-x-4">
                      <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                      <span className="text-lg text-foreground">
                        {practice}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Security Alert */}
        <section className="py-20 lg:py-32 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-accent/10 border-2 border-accent rounded-2xl p-8 lg:p-12">
                <div className="flex items-start space-x-4">
                  <AlertTriangle className="w-8 h-8 text-accent shrink-0" />
                  <div>
                    <h3 className="text-2xl font-bold font-['Inter'] text-foreground mb-4">
                      Report Security Issues
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      If you discover a security vulnerability or notice
                      suspicious activity on your account, please contact our
                      security team immediately at{" "}
                      <a
                        href="mailto:security@savfi.ng"
                        className="text-primary hover:underline"
                      >
                        security@savfi.ng
                      </a>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      We take all security reports seriously and will respond
                      within 24 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default SecurityPage;
