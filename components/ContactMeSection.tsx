"use client";
import { BlurFade } from "./magicui/blur-fade";
import { AuroraText } from "./magicui/aurora-text";
import dynamic from "next/dynamic";

const ContactForm = dynamic(() => import("./ui/ContactForm"), { ssr: false });
const ContactInfo = dynamic(() => import("./ui/ContactInfo"), { ssr: false });

const ContactMeSection = () => {
  return (
    <section
      id="contact-me"
      className="relative flex items-center justify-center bg-black text-white px-6 overflow-hidden"
    >
      <div className="container text-center">
        {/* Section Heading */}
        <BlurFade delay={0.25} inView>
          <AuroraText className="text-6xl">Contact Me</AuroraText>
        </BlurFade>

        {/* Two-column layout */}
        <BlurFade delay={0.25 * 2} inView>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8 md:gap-12 items-start">
            {/* Left Column - Contact Form */}
            <ContactInfo />

            {/* Right Column - Contact Info (Aligned to Baseline) */}
            <div>
              <ContactForm />
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
};

export default ContactMeSection;
