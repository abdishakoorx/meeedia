import HeroSection from "./_components/HeroSection";
import KeyFeatures from "./_components/KeyFeatures";
import UserSuccessStories from "./_components/UserSuccessStories";
import PricingPlans from "./_components/PricingPlans";
import HowItWorks from "./_components/HowItWorks";
import CommunityShowcase from "./_components/CommunityShowcase";
import ResourcesSupport from "./_components/ResourcesSupport";
import FinalCTA from "./_components/FinalCTA";
import Footer from "./_components/Footer";
import { FloatingNavDemo } from "./_components/floating-navbar";

export default function Home() {
  return (
    <div>
      <FloatingNavDemo />
      <HeroSection />

      <main className="px-4 md:px-10">
        <KeyFeatures />
        <UserSuccessStories />
        <PricingPlans />
        <HowItWorks />
        <CommunityShowcase />
        <ResourcesSupport />
        <FinalCTA />
      </main>
      
      <Footer />
    </div>
  );
}
