import React from "react";
import { getAllProjects } from "@/lib/mdx";
import { Post } from "@/lib/types";
import { HeroParallax } from "./ui/hero-parallax";

const ProjectsSection = async () => {
  const posts: Post[] = await getAllProjects(); // Fetch as Post[]

  return (
    <section id="projects" className="pt-24 pb-24">
      <HeroParallax posts={posts.slice(0, 10)} />
    </section>
  );
};

export default ProjectsSection;
