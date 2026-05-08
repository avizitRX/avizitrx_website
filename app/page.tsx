import AboutSection from "@/components/AboutSection";
import BlogSection from "@/components/BlogSection";
import ContactMeSection from "@/components/ContactMeSection";
import CtaSection from "@/components/CtaSection";
import FooterSection from "@/components/FooterSection";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import NextLevelSection from "@/components/NextLevelSection";
import PortfolioSection from "@/components/PortfolioSection";
// import ServicesSection from "@/components/ServicesSection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { TimelineSection } from "@/components/TimelineSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TimelineSection />
      {/* <ServicesSection /> */}
      {/* <MyWorkProcessSection /> */}
      <PortfolioSection />
      <BlogSection />
      <NextLevelSection />
      <TestimonialSection />
      <CtaSection />
      <ContactMeSection />
      <FooterSection />
    </>
  );
}
