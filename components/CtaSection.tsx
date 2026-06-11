"use client";
import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";

const ScrollRevealText = ({ text }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // One-way ratchet: only ever increases
  const maxProgress = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > maxProgress.get()) {
      maxProgress.set(latest);
    }
  });

  const words = text.split(" ");

  return (
    <div ref={targetRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <p className="flex flex-wrap justify-center px-10 text-4xl font-bold md:text-6xl leading-tight max-w-5xl text-center">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = Math.min(1, start + 1 / words.length);
            return (
              <Word key={i} progress={maxProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1], { clamp: true });
  const color = useTransform(progress, range, ["#404040", "#ffffff"], {
    clamp: true,
  });

  return (
    <span className="relative mx-1 lg:mx-2">
      <motion.span style={{ opacity, color }} className="inline-block">
        {children}
      </motion.span>
    </span>
  );
};

const CtaSection = () => {
  return (
    <section id="cta" className="bg-black">
      <div className="h-[20vh]" />
      <ScrollRevealText text="Want to contact me? Let's connect!" />
      <div className="h-[20vh]" />
    </section>
  );
};

export default CtaSection;
