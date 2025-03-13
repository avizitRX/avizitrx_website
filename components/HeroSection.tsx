import React from "react";
import { BlurFade } from "./magicui/blur-fade";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";
import { TextAnimate } from "./magicui/text-animate";
import Image from "next/image";
import avizitRoy from "../public/Avizit Roy.png";

const HeroSection = () => {
  return (
    <section id="hero_section">
      <div className="h-[60vh] mt-10 md:mt-0 md:h-[100vh] w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="container">
          {/* Hero Text for Mobile*/}
          <div className="md:hidden">
            <BlurFade delay={0.25} inView>
              <h1 className="text-4xl md:text-6xl font-semibold flex justify-center">
                Hi, I&apos;m Avizit Roy!
              </h1>
            </BlurFade>
          </div>

          {/* Hero Text */}
          <div className="hidden md:block">
            <BlurFade delay={0.25} inView>
              <h1 className="text-6xl font-semibold flex items-center gap-3">
                Hi, I&apos;m
                <Image
                  src={avizitRoy}
                  alt="Avizit Roy — avizitRX"
                  height={80}
                  width={80}
                  loading="eager"
                  className="inline-block outline-4 outline-white outline-solid outline-offset-0 shadow-2xl rounded-3xl"
                />
                <span>Avizit Roy!</span>
              </h1>
            </BlurFade>
          </div>

          <BlurFade delay={0.25 * 2} inView>
            <h1 className="text-center md:text-start pt-5 text-3xl md:text-6xl font-semibold font-stretch-extra-expanded">
              <span className="text-neutral-500">I&apos;m a</span>{" "}
              <span className="bg-gradient-to-r from-[#FF0080] via-[#7928CA] to-[#0070F3] text-transparent bg-clip-text">
                AI/ML, Web & Mobile App Developer.
              </span>
            </h1>
          </BlurFade>

          {/* Book a call button */}
          <BlurFade delay={0.25 * 3} inView>
            <div className="flex flex-col md:flex-row gap-3 pt-10 items-center md:items-center">
              <InteractiveHoverButton>Book a call</InteractiveHoverButton>

              <TextAnimate
                delay={0.25 * 4}
                animation="blurInUp"
                by="character"
                once
                className="text-base text-neutral-500 text-center md:text-left"
              >
                Feel free to explore my portfolio and reach out — I&apos;d love
                to connect!
              </TextAnimate>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
