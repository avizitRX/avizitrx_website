import React from "react";
import { BlurFade } from "./magicui/blur-fade";
import { AuroraText } from "./magicui/aurora-text";
import { StickyScroll } from "./ui/sticky-scroll-reveal";

const MyWorkProcessSection = () => {
  return (
    <section id="my-work-process" className="pt-24 pb-24">
      {/* Heading */}
      <h1 className="text-center mb-10">
        <BlurFade delay={0.25} inView>
          <AuroraText className="text-6xl">My Work Process</AuroraText>
        </BlurFade>
      </h1>

      <StickyScroll content={content} />
    </section>
  );
};

export default MyWorkProcessSection;

const content = [
  {
    title: "Discovery – Understanding Your Vision",
    description:
      "Every great project starts with a conversation. I take the time to understand your business, goals, audience, and challenges. Whether it’s a website, a mobile app, or an SEO strategy, this phase helps define the foundation for success.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        Discovery – Understanding Your Vision
      </div>
    ),
  },
  {
    title: "Strategy – Planning for Success",
    description:
      "Once I understand your needs, I craft a tailored strategy that aligns with your goals. This includes wireframes, user experience planning, SEO considerations, and a roadmap to bring your project to life efficiently.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        Strategy – Planning for Success
      </div>
    ),
  },
  {
    title: "Design – Bringing Your Ideas to Life",
    description:
      "With a clear strategy in place, I create a visually appealing and user-friendly design that reflects your brand identity. Every element is crafted with usability and engagement in mind, ensuring an intuitive experience for your audience.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        Design – Bringing Your Ideas to Life
      </div>
    ),
  },
  {
    title: "Build – Developing a High-Performance Solution",
    description:
      "Once the design is finalized, I transform it into a fully functional website or app. Using clean, scalable code and the latest technologies, I ensure the final product is fast, secure, and optimized for search engines.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-center text-white">
        Build – Developing a High-Performance Solution
      </div>
    ),
  },
];
