import React from "react";
import { AuroraText } from "./magicui/aurora-text";
import OrbitingCirclesUI from "./ui/OrbitingCirclesUI";
import { SparklesText } from "./magicui/sparkles-text";
import { BlurFade } from "./magicui/blur-fade";
import { RainbowButton } from "./magicui/rainbow-button";

const AboutSection = () => {
  return (
    <section id="about-section" className="container mt-24 mb-24">
      <h1 className="text-center">
        <BlurFade delay={0.25} inView>
          <AuroraText className="text-6xl">About Me</AuroraText>
        </BlurFade>
      </h1>
      {/* Flex Columns */}
      <div className="flex gap-4 flex-col-reverse md:flex-row">
        {/* Column 1 */}
        <div className="basis-0.5 flex-auto content-center align-middle">
          <BlurFade delay={0.25 * 2} inView>
            <p className="text-base lg:text-xl text-justify">
              I&apos;m a computer engineer with a passion for creating digital
              products that are both beautiful and functional. Whether it&apos;s{" "}
              <SparklesText
                text="a website, a mobile app, or an AI-driven tool"
                className="text-base lg:text-xl"
                sparklesCount={5}
              />
              , I focus on building solutions that meet real-world needs.
              <br />
              <br />
              My toolkit includes modern frameworks like React, Next.js, and
              Django for web development, Flutter for mobile apps, and
              Tensorflow for AI and machine learning. On top of that, I know how
              to make websites rank higher with SEO and get more traffic with
              digital marketing.
            </p>
          </BlurFade>

          {/* Center the button in mobile view */}
          <BlurFade delay={0.25 * 2} inView className="mt-5">
            <div className="flex justify-center lg:justify-start">
              <RainbowButton>Learn More</RainbowButton>
            </div>
          </BlurFade>
        </div>

        {/* Column 2 */}
        <div className="basis-0.5 flex-auto">
          <BlurFade delay={0.25 * 3} inView>
            <OrbitingCirclesUI />
          </BlurFade>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
