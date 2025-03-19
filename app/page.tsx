import AboutSection from "@/components/AboutSection";
import BlogSection from "@/components/BlogSection";
import ContactMeSection from "@/components/ContactMeSection";
import CtaSection from "@/components/CtaSection";
import FooterSection from "@/components/FooterSection";
import HeroSection from "@/components/HeroSection";
import MyWorkProcessSection from "@/components/MyWorkProcessSection";
import Navbar from "@/components/Navbar";
import NextLevelSection from "@/components/NextLevelSection";
import PortfolioSection from "@/components/PortfolioSection";
import ServicesSection from "@/components/ServicesSection";
import { TestimonialSection } from "@/components/TestimonialSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <MyWorkProcessSection />
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
