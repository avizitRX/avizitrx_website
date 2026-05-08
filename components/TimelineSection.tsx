"use client";

import { motion, useScroll, useSpring } from "motion/react";
import {
  Code2,
  Cpu,
  Globe,
  Lock,
  Brain,
  GraduationCap,
  Terminal,
  ChevronDown,
  Sparkles,
  Search,
  Smartphone,
  BookOpen,
} from "lucide-react";
import { useRef } from "react";
import { TIMELINE_DATA, TimelineItem } from "../lib/data/timeline_constant";
import { BlurFade } from "./magicui/blur-fade";
import { AuroraText } from "./magicui/aurora-text";

const IconMap: Record<string, any> = {
  personal: Sparkles,
  education: GraduationCap,
  tech: Cpu,
  career: Globe,
};

const TagIconMap: Record<string, any> = {
  Linux: Terminal,
  "Visual Basic": Code2,
  Cybersecurity: Lock,
  Flutter: Smartphone,
  AI: Brain,
  SEO: Search,
  Thesis: BookOpen,
};

function TimelineCard({ item, index }: { item: TimelineItem; index: number }) {
  const isEven = index % 2 === 0;
  const CategoryIcon = IconMap[item.category] || Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`relative flex items-center justify-between md:mb-16 mb-16 w-full ${
        isEven ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div className="absolute left-[20px] md:left-1/2 top-0 md:top-1/2 -mt-2 -ml-2 md:-mt-3 md:-ml-3 z-10 w-4 h-4 md:w-6 md:h-6 rounded-full bg-[#0A0A0A] border-4 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-500"
        />
      </div>

      <div className="md:w-[45%] w-full pl-12 md:pl-0">
        <motion.div
          whileHover={{ y: -5 }}
          className="p-6 md:p-8 rounded-2xl bg-[#141414] border border-[#262626] hover:border-blue-500/40 transition-colors group relative overflow-hidden text-left"
        >
          <div className="absolute -right-4 -top-8 text-8xl font-bold opacity-[0.03] pointer-events-none group-hover:opacity-[0.06] transition-opacity">
            {item.year}
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-mono font-medium tracking-wide flex items-center gap-2">
              <CategoryIcon size={12} />
              {item.year}
            </span>
            <div className="h-px flex-grow bg-[#262626] group-hover:bg-blue-500/20 transition-colors" />
          </div>

          <h3 className="text-xl md:text-2xl font-medium mb-3 text-white group-hover:text-blue-500 transition-colors">
            {item.title}
          </h3>

          <p className="text-[#737373] text-sm md:text-base leading-relaxed mb-6">
            {item.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {item.tags?.map((tag) => {
              const TagIcon = TagIconMap[tag];
              return (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0A0A0A] text-[11px] font-mono text-[#737373]/80 border border-[#262626] group-hover:border-[#262626]/60"
                >
                  {TagIcon && <TagIcon size={10} />}
                  {tag}
                </span>
              );
            })}
          </div>
        </motion.div>
      </div>

      <div className="hidden md:block w-[45%]" />
    </motion.div>
  );
}

export function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="relative w-full py-20 overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-900/5 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150 mix-blend-soft-light" />
      </div>

      <div className="relative pt-24 pb-24 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Heading */}
            <h1 className="text-center mb-10">
              <BlurFade delay={0.25} inView>
                <AuroraText className="text-6xl">
                  A Decade of Curiosity
                </AuroraText>
              </BlurFade>
            </h1>

            <p className="text-white text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
              Designing, building and breaking things since 2010. A journey from
              first mouse-clicks to hacking with AI.
            </p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-16 text-muted/40"
          >
            <ChevronDown className="mx-auto" />
          </motion.div>
        </div>
      </div>

      {/* Background Lighting */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div ref={containerRef} className="relative">
          {/* Central Line */}
          <div className="absolute left-[20px] md:left-1/2 top-4 bottom-4 w-px bg-[#262626] md:-ml-[0.5px]">
            <motion.div
              style={{ scaleY }}
              className="w-full h-full bg-gradient-to-b from-blue-500/20 via-blue-500 to-blue-500/20 origin-top"
            />
          </div>

          <div className="relative pt-8">
            {TIMELINE_DATA.map((item, index) => (
              <TimelineCard
                key={item.year + item.title}
                item={item}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative py-16 mt-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-medium mb-8">
            The Journey Continues.
          </h2>
          <p className="text-white mb-12">
            Currently focused on Machine Learning research and building software
            that bridges the physical and digital worlds.
          </p>

          {/* <div className="mt-24 grid grid-cols-2 md:grid-cols-3 gap-8 opacity-40 grayscale hover:grayscale-0 transition-all">
            <div className="flex flex-col items-center gap-2">
              <span className="text-6xl font-display font-bold">15+</span>
              <span className="text-[14px] font-mono tracking-widest uppercase">
                Years Experience
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-6xl font-display font-bold">∞</span>
              <span className="text-[14px] font-mono tracking-widest uppercase">
                Projects Built
              </span>
            </div>
            {/* <div className="flex flex-col items-center gap-2">
              <span className="text-3xl font-display font-bold">Ubuntu</span>
              <span className="text-[10px] font-mono tracking-widest uppercase">
                Primary OS
              </span>
            </div> 
            <div className="flex flex-col items-center gap-2">
              <span className="text-6xl font-display font-bold">∞</span>
              <span className="text-[14px] font-mono tracking-widest uppercase">
                Lines of Code
              </span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
