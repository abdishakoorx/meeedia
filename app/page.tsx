import Header from './_components/NavHeader';
import HeroSection from './_components/HeroSection';
import KeyFeatures from './_components/KeyFeatures';
import UserSuccessStories from './_components/UserSuccessStories';
import PricingPlans from './_components/PricingPlans';
import HowItWorks from './_components/HowItWorks';
import CommunityShowcase from './_components/CommunityShowcase';
import ResourcesSupport from './_components/ResourcesSupport';
import FinalCTA from './_components/FinalCTA';
import Footer from './_components/Footer';

export default function Home() {
  
  return (
    <div>
      <Header/>
      <HeroSection />
      <KeyFeatures />
      <UserSuccessStories />
      <PricingPlans />
      <HowItWorks />
      <CommunityShowcase />
      <ResourcesSupport />
      <FinalCTA />
      <Footer />
    </div>
  );
}