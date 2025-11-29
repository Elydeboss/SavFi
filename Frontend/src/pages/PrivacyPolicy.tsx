import Navigation from "../components/public/Navigation";
import Footer from "../components/public/Footer";

const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-linear-to-br from-blue via-blue-600 to-blue-800 py-20">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 animate-fade-in">
              Privacy Policy
            </h1>
            <p className="text-white/90 animate-fade-in">
              Last updated: January 2025
            </p>
          </div>
        </div>

        {/* Content */}
        <section className="py-20 lg:py-32 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <div className="space-y-8 text-foreground">
                <section>
                  <h2 className="text-3xl font-bold font-['Inter'] text-foreground mb-4">
                    1. Introduction
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Welcome to SavFi ("we," "our," or "us"). We respect your
                    privacy and are committed to protecting your personal data.
                    This privacy policy explains how we collect, use, disclose,
                    and safeguard your information when you use our platform and
                    services.
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-bold font-['Inter'] text-foreground mb-4">
                    2. Information We Collect
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We collect several types of information to provide and
                    improve our services:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>
                      <strong>Personal Information:</strong> Name, email
                      address, phone number, date of birth, and address
                    </li>
                    <li>
                      <strong>Financial Information:</strong> Transaction
                      history, savings plans, and payment methods
                    </li>
                    <li>
                      <strong>Identity Verification:</strong> Government-issued
                      ID, BVN (Bank Verification Number), and selfie for KYC
                    </li>
                    <li>
                      <strong>Usage Data:</strong> IP address, browser type,
                      device information, and interaction with our platform
                    </li>
                    <li>
                      <strong>Communication Data:</strong> Your communications
                      with our support team
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-3xl font-bold font-['Inter'] text-foreground mb-4">
                    3. How We Use Your Information
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We use your information for the following purposes:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>
                      To provide, maintain, and improve our savings platform
                    </li>
                    <li>
                      To process your transactions and manage your savings plans
                    </li>
                    <li>
                      To verify your identity and comply with regulatory
                      requirements (KYC/AML)
                    </li>
                    <li>
                      To communicate with you about your account, updates, and
                      promotional offers
                    </li>
                    <li>
                      To detect, prevent, and address fraud and security issues
                    </li>
                    <li>
                      To analyze usage patterns and improve user experience
                    </li>
                    <li>
                      To comply with legal obligations and enforce our terms of
                      service
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-3xl font-bold font-['Inter'] text-foreground mb-4">
                    4. Data Sharing and Disclosure
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We may share your information with:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>
                      <strong>Service Providers:</strong> Third-party companies
                      that help us operate our platform (payment processors, KYC
                      providers, cloud hosting)
                    </li>
                    <li>
                      <strong>Legal Requirements:</strong> When required by law,
                      regulation, or legal process
                    </li>
                    <li>
                      <strong>Business Transfers:</strong> In connection with a
                      merger, acquisition, or sale of assets
                    </li>
                    <li>
                      <strong>Consent:</strong> When you give us explicit
                      permission to share your information
                    </li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    We never sell your personal information to third parties for
                    marketing purposes.
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-bold font-['Inter'] text-foreground mb-4">
                    5. Data Security
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We implement industry-standard security measures to protect
                    your data, including encryption, secure servers, and access
                    controls. However, no method of transmission over the
                    internet is 100% secure, and we cannot guarantee absolute
                    security.
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-bold font-['Inter'] text-foreground mb-4">
                    6. Your Rights
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Under Nigerian data protection law, you have the right to:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Access your personal data</li>
                    <li>Correct inaccurate or incomplete data</li>
                    <li>
                      Request deletion of your data (subject to legal
                      obligations)
                    </li>
                    <li>Object to or restrict certain processing activities</li>
                    <li>
                      Withdraw consent where processing is based on consent
                    </li>
                    <li>
                      Lodge a complaint with the Nigeria Data Protection
                      Commission (NDPC)
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-3xl font-bold font-['Inter'] text-foreground mb-4">
                    7. Data Retention
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We retain your personal data for as long as necessary to
                    fulfill the purposes outlined in this policy, unless a
                    longer retention period is required by law. After your
                    account is closed, we may retain certain information for
                    regulatory compliance and fraud prevention.
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-bold font-['Inter'] text-foreground mb-4">
                    8. Cookies and Tracking
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We use cookies and similar tracking technologies to enhance
                    your experience, analyze usage, and deliver personalized
                    content. You can manage cookie preferences through your
                    browser settings. For more details, see our Cookie Policy.
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-bold font-['Inter'] text-foreground mb-4">
                    9. Children's Privacy
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Our services are not intended for users under 18 years of
                    age. We do not knowingly collect personal information from
                    children. If we become aware that we have collected data
                    from a child, we will take steps to delete it promptly.
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-bold font-['Inter'] text-foreground mb-4">
                    10. Changes to This Policy
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may update this privacy policy from time to time. We will
                    notify you of significant changes via email or through our
                    platform. Continued use of our services after changes
                    constitutes acceptance of the updated policy.
                  </p>
                </section>

                <section className="bg-gradient-soft rounded-2xl p-8">
                  <h2 className="text-3xl font-bold font-['Inter'] text-foreground mb-4">
                    11. Contact Us
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    If you have questions or concerns about this privacy policy
                    or our data practices, please contact us:
                  </p>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      <strong>Email:</strong> privacy@savfi.ng
                    </p>
                    <p>
                      <strong>Address:</strong> SavFi Technologies Ltd, Lagos,
                      Nigeria
                    </p>
                    <p>
                      <strong>Data Protection Officer:</strong> dpo@savfi.ng
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default PrivacyPolicy;
