// import AboutSection from "@/components/AboutSection";
import AboutSection from "@/components/AboutSection";
import HeroSection from "@/components/HeroSection";
import MyWorkProcess from "@/components/MyWorkProcess";
import Navbar from "@/components/Navbar";
import ServicesSection from "@/components/ServicesSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <MyWorkProcess />
    </main>
  );
}
