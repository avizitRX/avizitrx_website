import React from "react";
import { BlurFade } from "./magicui/blur-fade";
import { AuroraText } from "./magicui/aurora-text";
import { CardSpotlight } from "./ui/card-spotlight";
import { Cover } from "./ui/cover";

const ServicesSection = () => {
  return (
    <section id="services" className="container overflow-hidden pt-24 pb-24">
      {/* Heading */}
      <h1 className="text-center mb-10">
        <BlurFade delay={0.25} inView>
          <AuroraText className="text-6xl">Services</AuroraText>
        </BlurFade>
      </h1>

      {/* Services Cards */}
      <BlurFade delay={0.25 * 2} inView>
        <div className="mt-10 mb-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="basis-1/4 h-full">
            <CardSpotlight className="h-full flex flex-col p-10">
              <h2 className="text-xl font-bold relative z-20 mt-2 text-white">
                Website Design & Development
              </h2>
              <div className="text-neutral-200 mt-4 relative z-20 flex-grow">
                <ul className="list-none mt-2">
                  <Step title="Responsive websites that look great on any device" />
                  <li className="flex gap-2 items-start">
                    <CheckIcon />
                    <p className="text-white">
                      <Cover>Fast-loading</Cover>, secure, and easy to use
                    </p>
                  </li>
                  <Step title="Built with WordPress, React, Next.js, Django, and Node.js" />
                </ul>
              </div>
            </CardSpotlight>
          </div>

          <div className="basis-1/4 h-full">
            <CardSpotlight className="h-full flex flex-col p-10">
              <h2 className="text-xl font-bold relative z-20 mt-2 text-white">
                Mobile App Development
              </h2>
              <div className="text-neutral-200 mt-4 relative z-20 flex-grow">
                <ul className="list-none mt-2">
                  <Step title="Cross-platform apps for iOS and Android using Flutter" />
                  <Step title="Simple, intuitive interfaces with smooth performance" />
                  <Step title="Real-time features with Firebase or custom backends" />
                </ul>
              </div>
            </CardSpotlight>
          </div>

          <div className="basis-1/4 h-full">
            <CardSpotlight className="h-full flex flex-col p-10">
              <h2 className="text-xl font-bold relative z-20 mt-2 text-white">
                AI & Machine Learning
              </h2>
              <div className="text-neutral-200 mt-4 relative z-20 flex-grow">
                <ul className="list-none mt-2">
                  <Step title="AI solutions for automation, analytics, and customer engagement" />
                  <Step title="Machine learning models built with Python, TensorFlow, and Scikit-Learn" />
                  <Step title="Chatbots, predictive analytics, and data-driven insights" />
                </ul>
              </div>
            </CardSpotlight>
          </div>

          <div className="basis-1/4 h-full">
            <CardSpotlight className="h-full flex flex-col p-10">
              <h2 className="text-xl font-bold relative z-20 mt-2 text-white">
                Digital Marketing & SEO Optimization
              </h2>
              <div className="text-neutral-200 mt-4 relative z-20 flex-grow">
                <ul className="list-none mt-2">
                  <Step title="Help your business get found in search results" />
                  <Step title="Social media marketing to grow your audience" />
                  <Step title="Email campaigns to connect with customers" />
                  <Step title="Analytics and reporting to measure success and optimize strategies" />
                </ul>
              </div>
            </CardSpotlight>
          </div>
        </div>
      </BlurFade>
    </section>
  );
};

export default ServicesSection;

const Step = ({ title }: { title: string }) => {
  return (
    <li className="flex gap-2 items-start">
      <CheckIcon />
      <p className="text-white">{title}</p>
    </li>
  );
};

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-blue-500 mt-1 shrink-0"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
        fill="currentColor"
        strokeWidth="0"
      />
    </svg>
  );
};
