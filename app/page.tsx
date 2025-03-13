// import AboutSection from "@/components/AboutSection";
import AboutSection from "@/components/AboutSection";
import HeroSection from "@/components/HeroSection";
import MyWorkProcess from "@/components/MyWorkProcess";
import Navbar from "@/components/Navbar";
import ServicesSection from "@/components/ServicesSection";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Avizit Roy | Web & Mobile App Developer</title>
        <meta
          name="description"
          content="Avizit Roy is a computer engineer. He is skilled in AI/ML, Web & Mobile App Development."
        />
        <meta
          name="keywords"
          content="Avizit Roy, avizitRX, Web Developer, Mobile App Developer"
        />
        <meta name="author" content="Avizit Roy" />
        <meta
          property="og:title"
          content="Avizit Roy | Web & Mobile App Developer"
        />
        <meta
          property="og:description"
          content="Avizit Roy is a computer engineer. He is skilled in AI/ML, Web & Mobile App Development."
        />
        <meta property="og:image" content="../public/Avizit Roy.png" />
        <meta property="og:type" content="website" />
      </Head>

      <main>
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <MyWorkProcess />
      </main>
    </>
  );
}
