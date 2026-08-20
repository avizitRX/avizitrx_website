"use client";
import { motion } from "motion/react";
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
import { Fragment } from "react";
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

const ROW_SIZE = 3;
const CONNECTOR_WIDTH_PX = 40; // must match the connector's `w-10` class below
const ROW_GAP_PX = 64; // must match the rows container's `gap-y-16` class below
// Exact horizontal center of the first/last card in a row, derived from the
// column math (3 equal cards + 2 fixed-width connectors eating into 100%).
const ANCHOR_OFFSET_CSS = `calc((100% - ${(ROW_SIZE - 1) * CONNECTOR_WIDTH_PX}px) / ${ROW_SIZE * 2})`;

function chunkRows<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    rows.push(items.slice(i, i + size));
  }
  return rows;
}

function TimelineCard({ item }: { item: TimelineItem }) {
  const CategoryIcon = IconMap[item.category] || Sparkles;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="relative flex-1 min-w-0 flex flex-col p-6 rounded-2xl bg-[#141414] border border-[#262626] hover:border-blue-500/40 transition-colors group overflow-hidden text-left"
    >
      <div className="absolute -right-3 -top-6 text-6xl font-bold opacity-[0.03] pointer-events-none group-hover:opacity-[0.06] transition-opacity">
        {item.year}
      </div>
      <div className="flex items-center gap-2 mb-3">
        <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[11px] font-mono font-medium tracking-wide flex items-center gap-1.5">
          <CategoryIcon size={11} />
          {item.year}
        </span>
      </div>
      <h3 className="text-base md:text-lg font-medium mb-2 text-white group-hover:text-blue-500 transition-colors">
        {item.title}
      </h3>
      <p className="text-[#737373] text-sm leading-relaxed mb-4">
        {item.description}
      </p>
      {/* mt-auto reliably bottom-aligns tags now that card height is unambiguous */}
      <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
        {item.tags?.map((tag) => {
          const TagIcon = TagIconMap[tag];
          return (
            <span
              key={tag}
              className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#0A0A0A] text-[10px] font-mono text-[#737373]/80 border border-[#262626] group-hover:border-[#262626]/60"
            >
              {TagIcon && <TagIcon size={9} />}
              {tag}
            </span>
          );
        })}
      </div>
    </motion.div>
  );
}

function SnakeRow({
  items,
  rowIndex,
  isLastRow,
}: {
  items: TimelineItem[];
  rowIndex: number;
  isLastRow: boolean;
}) {
  const reversed = rowIndex % 2 === 1;
  const exitOnLeft = reversed;

  return (
    <div className="relative">
      <div
        className={`flex flex-col md:flex-row items-stretch gap-4 md:gap-0 ${
          reversed ? "md:flex-row-reverse" : ""
        }`}
      >
        {items.map((item, i) => (
          <Fragment key={item.year + item.title}>
            <TimelineCard item={item} />
            {i < items.length - 1 && (
              <div
                className="hidden md:flex self-center shrink-0 w-10 items-center justify-center"
                aria-hidden="true"
              >
                <div className="w-full h-px bg-linear-to-r from-blue-500/40 via-blue-500/60 to-blue-500/40" />
              </div>
            )}
          </Fragment>
        ))}
      </div>

      {/* Inter-row connector: exact calc() offset + dots, drawn only from a full row */}
      {!isLastRow && items.length === ROW_SIZE && (
        <div
          className={`hidden md:block absolute ${
            exitOnLeft ? "-translate-x-1/2" : "translate-x-1/2"
          }`}
          style={{
            top: "100%",
            height: ROW_GAP_PX,
            ...(exitOnLeft
              ? { left: ANCHOR_OFFSET_CSS }
              : { right: ANCHOR_OFFSET_CSS }),
          }}
          aria-hidden="true"
        >
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-blue-500/40" />
          <span className="absolute left-1/2 -translate-x-1/2 -top-0.75 w-1.75 h-1.75 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
          <span className="absolute left-1/2 -translate-x-1/2 -bottom-0.75 w-1.75 h-1.75 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
        </div>
      )}
    </div>
  );
}

export function TimelineSection() {
  const rows = chunkRows(TIMELINE_DATA, ROW_SIZE);

  return (
    <div className="relative w-full py-10 overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-125 h-125 bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-150 h-150 bg-blue-900/5 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150 mix-blend-soft-light" />
      </div>

      <div className="relative pt-12 pb-12 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-center mb-6">
              <BlurFade delay={0.25} inView>
                <AuroraText className="text-5xl md:text-6xl">
                  A Decade of Curiosity
                </AuroraText>
              </BlurFade>
            </h1>
            <BlurFade delay={0.5} inView>
              <p className="text-white text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
                Designing, building and breaking things since 2010. A journey
                from first mouse-clicks to hacking with AI.
              </p>
            </BlurFade>
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-8 text-muted/40"
          >
            <ChevronDown className="mx-auto" size={20} />
          </motion.div>
        </div>
      </div>

      <div className="absolute top-0 left-1/4 w-125 h-125 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col gap-y-16 py-4">
          {rows.map((rowItems, rowIndex) => (
            <SnakeRow
              key={rowIndex}
              items={rowItems}
              rowIndex={rowIndex}
              isLastRow={rowIndex === rows.length - 1}
            />
          ))}
        </div>
      </div>

      <div className="relative py-10 mt-4">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <BlurFade delay={0.25} inView>
            <h2 className="text-2xl md:text-4xl font-display font-medium mb-4">
              The Journey Continues...
            </h2>
          </BlurFade>
        </div>
      </div>
    </div>
  );
}
