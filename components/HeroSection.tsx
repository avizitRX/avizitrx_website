import React from "react";
import { BlurFade } from "./magicui/blur-fade";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";
import { TextAnimate } from "./magicui/text-animate";

const HeroSection = () => {
  return (
    <section id="hero_section" className="h-[50vh]">
      <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div>
          {/* Hero Text */}
          <BlurFade delay={0.25} inView>
            <h1 className="text-6xl font-semibold font-stretch-extra-expanded">
              Hi, I&apos;m Avizit Roy!
            </h1>
          </BlurFade>

          <BlurFade delay={0.25 * 2} inView>
            <h1 className="pt-5 text-6xl font-semibold font-stretch-extra-expanded">
              <span className="text-neutral-500">I&apos;m a</span>{" "}
              <span className="text-amber-600">
                AI/ML, Web & Mobile App Developer.
              </span>
            </h1>
          </BlurFade>

          {/* Book a call button */}
          <BlurFade delay={0.25 * 3} inView>
            <div className="gap-3 pt-10 flex items-center">
              <InteractiveHoverButton>Book a call</InteractiveHoverButton>

              <TextAnimate
                delay={0.25 * 4}
                animation="blurInUp"
                by="character"
                once
                className="text-base"
              >
                Feel free to explore my portfolio and reach out—I&apos;d love to
                connect!
              </TextAnimate>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
