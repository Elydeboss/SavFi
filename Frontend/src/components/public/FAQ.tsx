import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is SaveFi and how does it work?",
    answer:
      "SaveFi is a blockchain-powered savings platform that helps Nigerians save securely using stablecoins like USDT and USDC. You deposit Naira, which is automatically converted to stablecoins, protecting your money from devaluation while earning interest based on your chosen savings plan.",
  },
  {
    question: "Is my money safe with SaveFi?",
    answer:
      "Yes! Your funds are secured with blockchain technology and protected by NIN verification. All savings are held in stablecoins (USDT/USDC) which maintain their value against the US dollar, shielding you from Naira volatility.",
  },
  {
    question: "What are the different savings plans?",
    answer:
      "SaveFi offers four plans: SwiftFi (instant access, 0% interest), FlexFi (3 months, 2% interest), GrowFi (6 months, 4% interest), and VaultFi (12 months, 8% interest). Choose based on your goals and how long you can save.",
  },
  {
    question: "How do I withdraw my savings?",
    answer:
      "You can withdraw to your Nigerian bank account or crypto wallet anytime. SwiftFi offers instant access, while other plans have lock-in periods. Withdrawals include minimal fees to cover transaction costs.",
  },
  {
    question: "What fees does SaveFi charge?",
    answer:
      "We charge a small 100 Naira service fee during deposits and conversion from Naira to stablecoins. This covers transaction costs and ensures accurate real-time conversions. Withdrawal fees are minimal and transparent.",
  },
  {
    question: "Do I need crypto knowledge to use SaveFi?",
    answer:
      "Not at all! SaveFi handles all the technical aspects for you. Simply deposit Naira, choose your plan, and we automatically manage the conversion to stablecoins. It's as easy as using any banking app.",
  },
  {
    question: "How does the referral program work?",
    answer:
      "Share your unique referral link with friends and family. When they sign up and make their first deposit, you both receive bonus rewards. There's no limit to how many people you can refer!",
  },
  {
    question: "Can I switch between savings plans?",
    answer:
      "Yes! You can move funds between plans, though some restrictions apply for locked savings. SwiftFi offers the most flexibility for instant transfers, while other plans may require completing their term first.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about saving with SaveFi
          </p>
        </div>

        <div className="space-y-4 animate-slide-up">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-card border rounded-2xl px-6 transition-colors ${
                openIndex === index ? "border-primary" : "border-border"
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left text-lg font-semibold cursor-pointer text-foreground hover:text-primary py-6 flex items-center justify-between transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-primary transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? "max-h-96 opacity-100 pb-6"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-foreground/80 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-gradient-primary/10 rounded-2xl p-8 border border-primary/20">
          <h3 className="text-2xl font-bold font-['Inter'] text-foreground mb-2">
            Still have questions?
          </h3>
          <p className="text-muted-foreground mb-6">
            Our support team is here to help you 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@savefi.com"
              className="text-primary hover:text-primary-dark font-semibold transition-colors"
            >
              support@savefi.com
            </a>
            <span className="hidden sm:inline text-muted-foreground">•</span>
            <a
              href="https://wa.me/2348000000000"
              className="text-primary hover:text-primary-dark font-semibold transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
