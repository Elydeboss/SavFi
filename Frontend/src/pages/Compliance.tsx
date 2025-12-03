import Navigation from "../components/public/Navigation";
import Footer from "../components/public/Footer";
import { Shield, CheckCircle, FileText, Users } from "lucide-react";

const Compliance = () => {
  const complianceAreas = [
    {
      icon: Shield,
      title: "KYC/AML Compliance",
      description:
        "We implement robust Know Your Customer (KYC) and Anti-Money Laundering (AML) procedures to verify user identities and prevent financial crimes.",
      requirements: [
        "Government-issued ID verification",
        "Bank Verification Number (BVN) validation",
        "Address verification",
        "Ongoing transaction monitoring",
      ],
    },
    {
      icon: FileText,
      title: "Data Protection",
      description:
        "Full compliance with the Nigeria Data Protection Regulation (NDPR) and international standards for safeguarding user data.",
      requirements: [
        "Secure data encryption (AES-256)",
        "Regular security audits",
        "Data breach notification protocols",
        "User consent management",
      ],
    },
    {
      icon: Users,
      title: "Consumer Protection",
      description:
        "Adhering to consumer protection laws to ensure fair treatment, transparency, and accountability in all our services.",
      requirements: [
        "Clear terms and conditions",
        "Transparent fee disclosure",
        "Fair dispute resolution process",
        "Customer support accessibility",
      ],
    },
    {
      icon: CheckCircle,
      title: "Financial Regulations",
      description:
        "Operating within the framework of Nigerian financial regulations and working toward full regulatory authorization.",
      requirements: [
        "SEC digital asset guidelines",
        "CBN fintech framework compliance",
        "FIRS tax compliance",
        "Regular regulatory reporting",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-hero py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="text-5xl lg:text-6xl font-bold font-['Inter'] text-white mb-6 animate-fade-in">
              Regulatory Compliance
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto animate-fade-in">
              SavFi is committed to operating with the highest standards of
              regulatory compliance, protecting users and maintaining the
              integrity of the financial system.
            </p>
          </div>
        </div>

        {/* Compliance Areas */}
        <section className="py-20 lg:py-32 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold font-['Inter'] text-foreground mb-4">
                Our Compliance Framework
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We adhere to multiple regulatory frameworks to ensure the safety
                and legality of our operations
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {complianceAreas.map((area, index) => {
                const Icon = area.icon;
                return (
                  <div
                    key={index}
                    className="bg-card rounded-2xl p-8 border border-border hover:border-primary transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold font-['Inter'] text-foreground mb-3">
                      {area.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {area.description}
                    </p>
                    <div className="space-y-2">
                      {area.requirements.map((req, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Regulatory Bodies */}
        <section className="py-20 lg:py-32 bg-gradient-soft">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold font-['Inter'] text-foreground mb-4">
                  Regulatory Oversight
                </h2>
                <p className="text-xl text-muted-foreground">
                  We operate under the guidance of Nigerian and international
                  regulatory bodies
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h3 className="text-xl font-bold font-['Inter'] text-foreground mb-2">
                    Securities and Exchange Commission (SEC)
                  </h3>
                  <p className="text-muted-foreground">
                    Compliance with digital asset regulations and investment
                    guidelines
                  </p>
                </div>
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h3 className="text-xl font-bold font-['Inter'] text-foreground mb-2">
                    Nigeria Data Protection Commission (NDPC)
                  </h3>
                  <p className="text-muted-foreground">
                    Full adherence to data protection and privacy regulations
                  </p>
                </div>
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h3 className="text-xl font-bold font-['Inter'] text-foreground mb-2">
                    Central Bank of Nigeria (CBN)
                  </h3>
                  <p className="text-muted-foreground">
                    Operating within the fintech regulatory framework
                  </p>
                </div>
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h3 className="text-xl font-bold font-['Inter'] text-foreground mb-2">
                    Financial Reporting Council (FRC)
                  </h3>
                  <p className="text-muted-foreground">
                    Maintaining transparency and financial reporting standards
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-20 lg:py-32 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl lg:text-5xl font-bold font-['Inter'] text-foreground mb-6">
                Certifications & Standards
              </h2>
              <p className="text-xl text-muted-foreground mb-12">
                We maintain industry-leading certifications and follow
                international best practices
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <span className="px-6 py-3 bg-gradient-soft rounded-full border border-border text-foreground font-medium">
                  ISO 27001 (In Progress)
                </span>
                <span className="px-6 py-3 bg-gradient-soft rounded-full border border-border text-foreground font-medium">
                  SOC 2 Type II Compliant
                </span>
                <span className="px-6 py-3 bg-gradient-soft rounded-full border border-border text-foreground font-medium">
                  NDPR Compliant
                </span>
                <span className="px-6 py-3 bg-gradient-soft rounded-full border border-border text-foreground font-medium">
                  PCI DSS Compliant
                </span>
                <span className="px-6 py-3 bg-gradient-soft rounded-full border border-border text-foreground font-medium">
                  Smart Contract Audited
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Transparency */}
        <section className="py-20 lg:py-32 bg-gradient-soft">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-2xl p-8 lg:p-12 border-2 border-primary/20">
                <h2 className="text-4xl lg:text-5xl font-bold font-['Inter'] text-foreground mb-6 text-center">
                  Commitment to Transparency
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed text-center">
                  At SavFi, transparency is a core principle. We publish regular
                  compliance reports, undergo independent audits, and maintain
                  open communication with regulatory authorities and our users.
                </p>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold font-['Inter'] text-primary mb-2">
                      100%
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Transparent Fee Structure
                    </p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold font-['Inter'] text-primary mb-2">
                      24/7
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Compliance Monitoring
                    </p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold font-['Inter'] text-primary mb-2">
                      Annual
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Independent Audits
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-20 lg:py-32 bg-background">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold font-['Inter'] text-foreground mb-6">
              Compliance Inquiries
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              For questions about our compliance practices or to report
              concerns, please contact our compliance team
            </p>
            <div className="text-muted-foreground space-y-2">
              <p>
                <strong>Email:</strong> compliance@savfi.ng
              </p>
              <p>
                <strong>Compliance Officer:</strong> compliance.officer@savfi.ng
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default Compliance;
