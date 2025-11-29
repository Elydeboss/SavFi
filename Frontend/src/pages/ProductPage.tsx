import Navigation from "../components/public/Navigation";
import SavingsPlans from "../components/public/SavingsPlans";
import HowItWorks from "../components/public/HowItWorks";
import CTA from "../components/public/CTA";
import Footer from "../components/public/Footer";

const ProductPage = () => {
  return (
    <main className="min-h-screen bg-light">
      <Navigation />
      <div className="pt-20">
        <div className="bg-linear-to-br from-blue via-blue-600 to-blue-800 py-20">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 animate-fade-in">
              Our Savings Products
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto animate-fade-in">
              Discover flexible savings plans designed to help you achieve your
              financial goals. From instant access to high-yield long-term
              savings, we have the perfect plan for you.
            </p>
          </div>
        </div>
        <SavingsPlans />
        <HowItWorks />
        <CTA />
      </div>
      <Footer />
    </main>
  );
};

export default ProductPage;
