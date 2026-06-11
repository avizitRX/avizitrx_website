import React from "react";
import { AuroraText } from "./magicui/aurora-text";
import { BlurFade } from "./magicui/blur-fade";
import { getBlogs } from "@/lib/mdx";
import { Post } from "@/lib/types";
import PostCard from "./ui/PostCard";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";
import Link from "next/link";

const BlogSection = async () => {
  // Fetch first page with 6 posts
  const { posts } = await getBlogs(1, 6); // page = 1, pageSize = 6

  return (
    <section
      id="blog"
      className="container overflow-hidden pt-20 md:pt-48 pb-20 md:pb-24"
    >
      {/* Heading */}
      <h1 className="text-center mb-10">
        <BlurFade delay={0.25} inView>
          <AuroraText className="text-6xl">Blog</AuroraText>
        </BlurFade>
      </h1>

      {/* Blogs Grid */}
      <BlurFade delay={0.5} inView>
        <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} {...post} />
          ))}
        </div>
      </BlurFade>

      {/* Show All Blogs Button */}
      <BlurFade delay={0.1} inView className="mt-10">
        <Link href="/blogs">
          <InteractiveHoverButton className="block m-auto">
            All Blogs
          </InteractiveHoverButton>
        </Link>
      </BlurFade>
    </section>
  );
};

export default BlogSection;
