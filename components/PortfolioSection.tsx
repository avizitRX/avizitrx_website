import React from "react";
import { getAllProjects } from "@/lib/mdx";
import { Post } from "@/lib/types";
import { HeroParallax } from "./ui/hero-parallax";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";
import { BlurFade } from "./magicui/blur-fade";

const ProjectsSection = async () => {
  const posts: Post[] = await getAllProjects(); // Fetch as Post[]

  return (
    <section id="portfolio" className="pt-24 pb-24">
      <HeroParallax posts={posts.slice(0, 10)} />

      {/* Show All Portfolio Button */}
      <BlurFade delay={0.1} inView className="mt-5">
        <InteractiveHoverButton className="block m-auto">
          All Projects
        </InteractiveHoverButton>
      </BlurFade>
    </section>
  );
};

export default ProjectsSection;
