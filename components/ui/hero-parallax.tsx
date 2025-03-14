"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { BlurFade } from "../magicui/blur-fade";
import { AuroraText } from "../magicui/aurora-text";
import { Post } from "@/lib/types"; // ✅ Import Post type

export const HeroParallax = ({ posts }: { posts: Post[] }) => {
  const firstRow = posts.slice(0, 5);
  const secondRow = posts.slice(5, 10);
  const thirdRow = posts.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((post) => (
            <PostCard post={post} translate={translateX} key={post.slug} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((post) => (
            <PostCard
              post={post}
              translate={translateXReverse}
              key={post.slug}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((post) => (
            <PostCard post={post} translate={translateX} key={post.slug} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <h1 className="text-center mb-10">
      <BlurFade delay={0.25} inView>
        <AuroraText className="text-6xl">Portfolio</AuroraText>
      </BlurFade>
    </h1>
  );
};

export const PostCard = ({
  post,
  translate,
}: {
  post: Post; // ✅ Use Post type
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={post.slug}
      className="group/post h-96 w-[30rem] relative shrink-0"
    >
      <Link
        href={`/projects/${post.slug}`}
        className="block group-hover/post:shadow-2xl"
      >
        <Image
          src={post.image ?? "/Avizit Roy.png"} // Default placeholder if no image
          height={600}
          width={600}
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={post.title}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/post:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/post:opacity-100 text-white">
        {post.title}
      </h2>
    </motion.div>
  );
};
