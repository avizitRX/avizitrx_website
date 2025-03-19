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
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Avizit Roy | Web & Mobile App Developer",
    template: "%s | Avizit Roy",
  },
  description:
    "Avizit Roy is a computer engineer. He is skilled in AI/ML, Web & Mobile App Development.",
  alternates: {
    canonical: "https://avizitrx.com",
  },
  openGraph: {
    title: "Avizit Roy | Web & Mobile App Developer",
    description:
      "Avizit Roy is a computer engineer. He is skilled in AI/ML, Web & Mobile App Development.",
    url: "https://avizitrx.com",
    siteName: "Avizit Roy | Web & Mobile App Developer",
    images: [{ url: "https://avizitrx.com/Avizit_Roy.png" }],
  },
};

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
