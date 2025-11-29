import Navigation from "../components/public/Navigation";
import Footer from "../components/public/Footer";

const TermsOfService = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-linear-to-br from-blue via-blue-600 to-blue-800 py-20">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold font-['Inter'] text-white mb-4 animate-fade-in">
              Terms of Service
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
                    1. Agreement to Terms
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing or using SavFi's platform and services, you
                    agree to be bound by these Terms of Service and all
                    applicable laws and regulations. If you do not agree with
                    any part of these terms, you may not use our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-bold font-['Inter'] text-foreground mb-4">
                    2. Eligibility
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    To use SavFi, you must:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Be at least 18 years old</li>
                    <li>
                      Be a resident of Nigeria or other supported jurisdictions
                    </li>
                    <li>
                      Provide accurate and complete registration information
                    </li>
                    <li>
                      Complete our KYC (Know Your Customer) verification process
                    </li>
                    <li>
                      Not be prohibited from using our services under applicable
                      law
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-3xl font-bold font-['Inter'] text-foreground mb-4">
                    3. Account Registration
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    You are responsible for maintaining the confidentiality of
                    your account credentials and for all activities that occur
                    under your account. You must notify us immediately of any
                    unauthorized access or security breach. We reserve the right
                    to suspend or terminate accounts that violate these terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-bold font-['Inter'] text-foreground mb-4">
                    4. Savings Products
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    SavFi offers various savings plans (SwiftFi, FlexFi, GrowFi,
                    VaultFi), each with different interest rates, lock-in
                    periods, and terms:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>
                      Interest rates are subject to change and are not
                      guaranteed
                    </li>
                    <li>
                      Lock-in periods vary by plan; early withdrawals may incur
                      penalties
                    </li>
                    <li>
                      Funds are backed by stablecoins (USDT/USDC) and subject to
                      blockchain risks
                    </li>
                    <li>Minimum and maximum deposit limits apply</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-3xl font-bold font-['Inter'] text-foreground mb-4">
                    5. Fees and Charges
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    SavFi may charge fees for certain services:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Transaction fees for deposits and withdrawals</li>
                    <li>Early withdrawal penalties on locked savings plans</li>
                    <li>Currency conversion fees where applicable</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    All fees are clearly disclosed before you complete a
                    transaction. We reserve the right to modify fees with 30
                    days' notice.
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-bold font-['Inter'] text-foreground mb-4">
                    6. Prohibited Activities
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    You may not use SavFi for:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>
                      Money laundering, terrorist financing, or other illegal
                      activities
                    </li>
                    <li>Fraudulent transactions or impersonation</li>
                    <li>Violating applicable laws or regulations</li>
                    <li>
                      Interfering with the security or operation of our platform
                    </li>
                    <li>
                      Using automated scripts or bots without authorization
                    </li>
                    <li>
                      Creating multiple accounts to abuse promotions or
                      referrals
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-3xl font-bold font-['Inter'] text-foreground mb-4">
                    7. Risk Disclosure
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Using SavFi involves certain risks:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>
                      <strong>Market Risk:</strong> Cryptocurrency and
                      stablecoin values may fluctuate
                    </li>
                    <li>
                      <strong>Technology Risk:</strong> Blockchain networks may
                      experience delays or failures
                    </li>
                    <li>
                      <strong>Regulatory Risk:</strong> Laws governing digital
                      assets may change
                    </li>
                    <li>
                      <strong>Counterparty Risk:</strong> Third-party service
                      providers may fail
                    </li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    SavFi is not a bank and deposits are not insured by NDIC.
                    You should only invest what you can afford to lose.
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-bold font-['Inter'] text-foreground mb-4">
                    8. Intellectual Property
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    All content, trademarks, logos, and intellectual property on
                    the SavFi platform are owned by SavFi Technologies Ltd or
                    our licensors. You may not copy, modify, distribute, or
                    create derivative works without our written permission.
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-bold font-['Inter'] text-foreground mb-4">
                    9. Limitation of Liability
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To the fullest extent permitted by law, SavFi shall not be
                    liable for any indirect, incidental, special, or
                    consequential damages arising from your use of our services.
                    Our total liability shall not exceed the amount of fees you
                    paid to SavFi in the 12 months prior to the event giving
                    rise to liability.
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-bold font-['Inter'] text-foreground mb-4">
                    10. Dispute Resolution
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Any disputes arising from these terms shall be resolved
                    through binding arbitration in Lagos, Nigeria, in accordance
                    with Nigerian law. You waive the right to participate in
                    class action lawsuits.
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-bold font-['Inter'] text-foreground mb-4">
                    11. Termination
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may suspend or terminate your account at any time for
                    violation of these terms, illegal activity, or at our
                    discretion. Upon termination, you must withdraw your funds
                    within 30 days. After this period, funds may be forfeited or
                    remitted to regulatory authorities.
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-bold font-['Inter'] text-foreground mb-4">
                    12. Changes to Terms
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We reserve the right to modify these terms at any time.
                    Material changes will be notified via email or platform
                    notification 30 days in advance. Continued use of our
                    services constitutes acceptance of the updated terms.
                  </p>
                </section>

                <section className="bg-gradient-soft rounded-2xl p-8">
                  <h2 className="text-3xl font-bold font-['Inter'] text-foreground mb-4">
                    13. Contact Information
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    For questions about these Terms of Service, please contact
                    us:
                  </p>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      <strong>Email:</strong> legal@savfi.ng
                    </p>
                    <p>
                      <strong>Address:</strong> SavFi Technologies Ltd, Lagos,
                      Nigeria
                    </p>
                    <p>
                      <strong>Support:</strong> support@savfi.ng
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

export default TermsOfService;
