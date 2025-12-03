import React, { useState } from "react";
import { ChevronDown, Phone, Mail, Vault } from "lucide-react";
import Header from "../components/Landpage-header";

// Define the types for the FAQItem component props to resolve 'implicit any'
interface FAQItemProps {
  question: string;
  answer: string;
}

/* Data for the Product Dropdown Modal - NOW INCLUDES DEDICATED HREFS
const products = [
  {
    name: "FlexFi",
    description: "Flexible savings",
    color: "text-blue-500",
    icon: PiggyBank,
    bg: "bg-blue-50",
    href: "/products/flexfi", // Dedicated path
  },
  {
    name: "VaultFi",
    description: "Locked Savings",
    color: "text-purple-600",
    icon: Lock,
    bg: "bg-purple-50",
    href: "/products/vaultfi", // Dedicated path
  },
  {
    name: "GrowFi",
    description: "Growth Plan",
    color: "text-green-600",
    icon: Sprout,
    bg: "bg-green-50",
    href: "/products/growfi", // Dedicated path
  },
  {
    name: "SwiftFi",
    description: "Quick Saving Plan",
    color: "text-yellow-600",
    icon: Zap,
    bg: "bg-yellow-50",
    href: "/products/swiftfi", // Dedicated path
  },
];*/

// Reusable FAQ Item Component
const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full py-4 text-left font-semibold text-gray-800 hover:text-blue-500 transition duration-150"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <ChevronDown
          className={`h-5 w-5 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-blue-500" : "text-gray-400"
          }`}
        />
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-600 leading-relaxed text-sm transition-all duration-500 ease-in-out">
          {answer}
        </div>
      )}
    </div>
  );
};

const valutFi = () => {
  const faqs = [
    {
      question:
        "Lorem ipsum dolor sit amet consectetur. Ut varius id pharetra et leo tricies.",
      answer:
        "FlexFi is designed to be the easiest way to start your savings journey. You can start small, grow at your own pace, and benefit from the stability of dollar-backed assets (USDC/USDT) without worrying about local currency fluctuations.",
    },
    {
      question:
        "The interest accrues daily but is paid out in full at the end of the 3-month saving period, provided you complete the plan. If you withdraw early, you forfeit the interest.",
      answer:
        "The interest accrues daily but is paid out in full at the end of the 3-month saving period, provided you complete the plan. If you withdraw early, you forfeit the interest.",
    },
    {
      question:
        "Yes, early withdrawal is allowed. However, note that the interest is only applied if the plan is completed successfully. Early withdrawal incurs a small processing fee to cover transaction costs.",
      answer:
        "Yes, early withdrawal is allowed. However, note that the interest is only applied if the plan is completed successfully. Early withdrawal incurs a small processing fee to cover transaction costs.",
    },
  ];

  return (
    <div className="min-h-screen font-sans text-gray-800 bg-[#FFFFFF]">
      {/* --- Navigation --- */}
      <Header />

      {/* --- Main Content (Rest of the FlexFi Page) --- */}
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        {/* --- FlexFi Hero Section --- */}
        <section className="bg-blue-200/30 p-6 md:p-12 rounded-3xl shadow-xl border border-[#8A38F5] mb-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Text Content */}
            <div className="max-w-xl text-center lg:text-left">
              <h2 className="text-5xl md:text-6xl font-extrabold text-[#8A38F5] mb-4 leading-tight">
                VaultFi
                <span className="text-blue-500 text-[1.5rem]"> 8%interest</span>
              </h2>
              <p className="inline-block bg-[#D6C8FF] text-[#8A38F5] text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                3 months saving plan
              </p>

              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                VaultFi is the entry-level savings plan for users who want
                something short and manageable. It encourages people to start
                small and stay consistent without feeling locked in for too
                long.
              </p>

              <button className="px-8 py-3 bg-[#8A38F5] text-white font-bold rounded-full hover:bg-blue-600 transition shadow-lg hover:shadow-xl transform hover:scale-105">
                Get started
              </button>
            </div>

            {/* Piggy Bank Illustration (SVG for scalability and crispness) */}
            <div className="w-full lg:w-96 flex-shrink-0 pt-8 lg:pt-0">
              <Vault className="text-[#8A38F5] w-98 h-85" />
            </div>
          </div>
        </section>

        {/* --- How It Works Section --- */}
        <section className="mb-20 bg-white p-6 md:p-12 rounded-xl border border-blue-100">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900  mb-12">
            How It Works
          </h2>

          <div className=" space-y-8">
            {/* Step 1 */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-[#D6C8FF] text-[#8A38F5] rounded-full flex items-center justify-center text-lg font-bold shadow-md mt-1">
                1
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-xl font-semibold text-gray-900">
                  Users save in USDC or USDT, automatically converted from Naira
                </h3>
                <p className="text-gray-600 mt-1">
                  Your local currency is instantly converted into dollar-backed
                  stablecoins to protect your funds from inflation and
                  devaluation.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-[#D6C8FF] text-[#8A38F5] rounded-full flex items-center justify-center text-lg font-bold shadow-md mt-1">
                2
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-xl font-semibold text-gray-900">
                  The minimum savings duration is 3 months
                </h3>
                <p className="text-gray-600 mt-1">
                  This duration is optimized for building a consistent savings
                  habit while allowing flexibility.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-[#D6C8FF] text-[#8A38F5] rounded-full flex items-center justify-center text-lg font-bold shadow-md mt-1">
                3
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-xl font-semibold text-gray-900">
                  They earn 3% interest at the end of the 3-month period
                </h3>
                <p className="text-gray-600 mt-1">
                  A competitive interest rate to ensure your money grows
                  significantly over the short period.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-[#D6C8FF] text-[#8A38F5] rounded-full flex items-center justify-center text-lg font-bold shadow-md mt-1">
                4
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-xl font-semibold text-gray-900">
                  Early withdrawal is allowed, but the interest only applies
                  when the plan is completed, and a small processing fee applies
                </h3>
                <p className="text-gray-600 mt-1">
                  We offer flexibility, but we incentivize you to stick to your
                  goals by making the interest dependent on completion.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-[#D6C8FF] text-[#8A38F5] rounded-full flex items-center justify-center text-lg font-bold shadow-md mt-1">
                5
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-xl font-semibold text-gray-900">
                  Great for users saving for short-term goals or trying to build
                  discipline
                </h3>
                <p className="text-gray-600 mt-1">
                  Whether it's a new gadget or a weekend trip, FlexFi provides
                  the structure needed for quick, disciplined saving.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- FAQ Section --- */}
        <section className="bg-white p-6 md:p-10 rounded-xl p-6 md:p-12 border border-blue-100">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-12">
            Frequently Asked Questions
          </h2>

          <div className="">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </section>
      </main>

      {/* --- Footer (Reused from previous context for consistency) --- */}
      <footer className="bg-gray-900 text-white mt-16">
        {/* Newsletter Section - Adapted for simple display */}
        <div className="bg-blue-600 py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <h3 className="text-2xl font-bold text-white max-w-xs text-center md:text-left">
              Start earning with Vaultfi today.
            </h3>
            <div className="flex w-full md:w-auto bg-white/20 p-2 rounded-full backdrop-blur-sm">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-transparent border-none text-white placeholder-blue-100 px-4 py-2 outline-none flex-grow w-full md:w-64"
              />
              <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition">
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="px-6 py-16 max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h4 className="font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Blogs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Product</h4>
            <ul className="space-y-3 text-gray-400">
              {/* Using dedicated paths in the footer too */}
              <li>
                <a href="/products/vaultfi" className="hover:text-white">
                  VaultFi
                </a>
              </li>
              <li>
                <a href="/products/flexfi" className="hover:text-white">
                  FlexFi
                </a>
              </li>
              <li>
                <a href="/products/swiftfi" className="hover:text-white">
                  SwiftFi
                </a>
              </li>
              <li>
                <a href="/products/growfi" className="hover:text-white">
                  GrowFi
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <Phone size={16} /> 080382SAVFI
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} /> support@savfi.com
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              {/* Placeholder for social icons */}
              <a href="#" className="text-gray-400 hover:text-white">
                f
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                @SavFi
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 p-6 text-center text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} SavFi. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default valutFi;
