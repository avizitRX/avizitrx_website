"use client";
import React, { useRef, useEffect } from "react";
import { Confetti, ConfettiRef } from "./magicui/confetti";
import { BlurFade } from "./magicui/blur-fade";
import { AuroraText } from "./magicui/aurora-text";
import ContactForm from "./ui/ContactForm";
import ContactInfo from "./ui/ContactInfo";

const ContactMeSection = () => {
  const confettiRef = useRef<ConfettiRef>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Store timeout reference

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Clear any existing timeouts to prevent multiple triggers
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }

          // Set a timeout to delay confetti by 1 second
          timeoutRef.current = setTimeout(() => {
            confettiRef.current?.fire({});
          }, 1000);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <section
      id="contact-me"
      ref={sectionRef}
      className="relative flex items-center justify-center min-h-screen bg-black text-white px-6 overflow-hidden"
    >
      {/* Confetti Effect */}
      <Confetti
        ref={confettiRef}
        className="absolute left-0 top-0 w-full h-full"
      />
      <div className="container text-center mb-10">
        {/* Section Heading */}
        <BlurFade delay={0.25} inView>
          <AuroraText className="text-6xl">Contact Me</AuroraText>
        </BlurFade>

        {/* Two-column layout */}
        <BlurFade delay={0.25 * 2} inView>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 items-start">
            {/* Left Column - Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Middle: Small but Visible Vertical Divider */}
            <div className="hidden md:flex justify-center items-center h-full">
              <div className="w-[2px] h-3/4 bg-neutral-500 dark:bg-neutral-600 opacity-70" />
            </div>

            {/* Right Column - Contact Info (Aligned to Baseline) */}
            <ContactInfo />
          </div>
        </BlurFade>
      </div>
    </section>
  );
};

export default ContactMeSection;
