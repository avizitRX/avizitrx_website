"use client";

import {
  useRef,
  type ComponentPropsWithoutRef,
  type FC,
  type ReactNode,
} from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string;
}

export const TextReveal: FC<TextRevealProps> = ({ children, className }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // We track the scroll progress of the entire tall container
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const words = children.split(" ");

  return (
    /* h-[300vh] controls the "length" of the scroll. Increase to 400vh for even slower reveal */
    <div ref={sectionRef} className={cn("relative z-0 h-[300vh]", className)}>
      <div className="sticky top-0 flex h-screen items-center justify-center bg-transparent px-4">
        <span className="flex flex-wrap justify-center p-5 text-center text-2xl font-bold text-black/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl dark:text-white/20 max-w-5xl">
          {words.map((word, i) => {
            // We create a "buffer" so the animation doesn't start/end abruptly
            // This spreads the words across 90% of the scroll instead of 100%
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </span>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative mx-1 lg:mx-2">
      {/* The "Ghost" text in the background */}
      <span className="absolute opacity-30">{children}</span>
      {/* The animated "Revealed" text */}
      <motion.span style={{ opacity }} className="text-black dark:text-white">
        {children}
      </motion.span>
    </span>
  );
};
