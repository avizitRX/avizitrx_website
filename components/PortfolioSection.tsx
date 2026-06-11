import React from "react";
import { AuroraText } from "./magicui/aurora-text";
import { BlurFade } from "./magicui/blur-fade";
import { getAllProjects } from "@/lib/mdx";
import { Post } from "@/lib/types";
import PostCard from "./ui/PostCard";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";

const ProjectsSection = async () => {
  const posts: Post[] = await getAllProjects();

  return (
    <section
      id="portfolio"
      className="container overflow-hidden pt-20 md:pt-48 pb-20 md:pb-24"
    >
      {/* Heading */}
      <h1 className="text-center mb-10">
        <BlurFade delay={0.25} inView>
          <AuroraText className="text-6xl">Portfolio</AuroraText>
        </BlurFade>
      </h1>

      {/* Projects Grid */}
      <BlurFade delay={0.25 * 2} inView>
        <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {posts.slice(0, 6).map((post) => (
            <PostCard key={post.slug} {...post} />
          ))}
        </div>
      </BlurFade>

      {/* Show All Projects Button */}
      <BlurFade delay={0.1} inView className="mt-10">
        <InteractiveHoverButton className="block m-auto">
          All Projects
        </InteractiveHoverButton>
      </BlurFade>
    </section>
  );
};

export default ProjectsSection;
