import React from "react";
import { AuroraText } from "./magicui/aurora-text";
import { BlurFade } from "./magicui/blur-fade";
import { getProjects } from "@/lib/mdx";
import PostCard from "./ui/PostCard";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";
import Link from "next/link";

const PortfolioSection = async () => {
  // Fetch first page with 6 projects
  const { posts } = await getProjects(1, 6); // page = 1, pageSize = 6

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
      <BlurFade delay={0.5} inView>
        <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} {...post} />
          ))}
        </div>
      </BlurFade>

      {/* Show All Projects Button */}
      <BlurFade delay={0.1} inView className="mt-10">
        <Link href="/projects">
          <InteractiveHoverButton className="block m-auto">
            All Projects
          </InteractiveHoverButton>
        </Link>
      </BlurFade>
    </section>
  );
};

export default PortfolioSection;
