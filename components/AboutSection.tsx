import React from "react";
import { AuroraText } from "./magicui/aurora-text";
import OrbitingCirclesUI from "./ui/OrbitingCirclesUI";
import { SparklesText } from "./magicui/sparkles-text";
import { BlurFade } from "./magicui/blur-fade";
import { VelocityScroll } from "./magicui/scroll-based-velocity";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";

const AboutSection = () => {
  return (
    <>
      <VelocityScroll defaultVelocity={1} numRows={2}>
        Web Development &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Mobile App
        Development &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; AI/ML
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </VelocityScroll>

      <section
        id="about"
        className="container overflow-hidden pt-20 md:pt-48 pb-20 md:pb-24"
      >
        {/* Heading */}
        <h1 className="text-center mb-10">
          <BlurFade delay={0.25} inView>
            <AuroraText className="text-6xl">About Me</AuroraText>
          </BlurFade>
        </h1>

        {/* Flex Columns */}
        <div className="flex gap-4 flex-col-reverse md:flex-row">
          {/* Column 1 */}
          <div className="basis-0.5 flex-auto content-center align-middle z-40">
            <BlurFade delay={0.25 * 2} inView>
              <p className="text-base lg:text-xl text-justify">
                I&apos;m a computer engineer with a passion for creating digital
                products that are both beautiful and functional. Whether
                it&apos;s{" "}
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
                Tensorflow for AI and machine learning. On top of that, I know
                how to make websites rank higher with SEO and get more traffic
                with digital marketing.
              </p>
            </BlurFade>

            {/* Learn More Button */}
            <BlurFade delay={0.25 * 2} inView className="mt-5">
              <InteractiveHoverButton className="block max-sm:m-auto">
                Learn More
              </InteractiveHoverButton>
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
    </>
  );
};

export default AboutSection;
