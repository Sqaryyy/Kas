import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import HowItWorks from "@/components/HowItWorks";
import WhySection from "@/components/WhySection";
import Topics from "@/components/Topics";
import Reactions from "@/components/Reactions";
import CtaBanner from "@/components/CtaBanner";
import SignupSection from "@/components/SignupSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <HowItWorks />
        <WhySection />
        <Topics />
        <Reactions />
        <CtaBanner />
        <SignupSection />
      </main>
      <Footer />
    </>
  );
}
