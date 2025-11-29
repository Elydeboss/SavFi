import Navigation from "../components/public/Navigation";
import Hero from "../components/public/Hero";
import SavingsPlans from "../components/public/SavingsPlans";
import HowItWorks from "../components/public/HowItWorks";
import Features from "../components/public/Features";
import Community from "../components/public/Community";
import Referral from "../components/public/Referral";
import FAQ from "../components/public/FAQ";
import CTA from "../components/public/CTA";
import Footer from "../components/public/Footer";
import DashBoardShowcase from "../components/public/DashBoardShowcase";

const HomePage = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <SavingsPlans />
      <HowItWorks />
      <DashBoardShowcase />
      <Features />
      <Community />
      <Referral />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
};

export default HomePage;
