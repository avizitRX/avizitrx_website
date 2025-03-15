import React from "react";
import Image from "next/image";
import { ContainerScroll } from "./ui/container-scroll-animation";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import {
  IconPalette,
  IconTrendingUp,
  IconSettings,
  IconNumber123,
} from "@tabler/icons-react";
import { Compare } from "./ui/compare";
import ConversionChart from "./ui/ConversionChart";
import { AnimatedBeamUI } from "./ui/AnimatedBeamUI";
import ProvenROI from "./ui/ProvenROI";
import { AuroraText } from "./magicui/aurora-text";
import { BlurFade } from "./magicui/blur-fade";

const NextLevelSection = () => {
  return (
    <div className="flex flex-col overflow-hidden">
      <BlurFade delay={0.25} inView>
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-3xl md:text-4xl font-semibold text-black dark:text-white">
                Take Your Business to the <br />
                <AuroraText className="text-6xl">Next Level</AuroraText>
              </h1>
            </>
          }
        >
          <div className="hidden md:block">
            <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
              {items.map((item, i) => (
                <BentoGridItem
                  key={i}
                  title={item.title}
                  description={item.description}
                  header={item.header}
                  className={item.className}
                  icon={item.icon}
                />
              ))}
            </BentoGrid>
          </div>
          <div className="block md:hidden">
            <Image
              src="/front-page/next-level.png"
              height={720}
              width={1400}
              className="mx-auto rounded-2xl object-cover h-[280px] md:h-full object-left-top"
              alt="Website Development, Mobile App Development, AI/ML Developer Avizit Roy (avizitRX)"
            />
          </div>
        </ContainerScroll>
      </BlurFade>
    </div>
  );
};

export default NextLevelSection;

const items = [
  {
    title: "Increased Visibility & Traffic",
    description:
      "I optimize UX, speed, and design to increase sales & sign-ups.",
    header: (
      <Compare
        firstImage="/front-page/dream_home_before.png"
        secondImage="/front-page/dream_home_after.png"
        firstImageClassName="object-cover  w-full"
        secondImageClassname="object-cover  w-full"
        className="w-full h-full rounded-[22px] md:rounded-lg"
        slideMode="hover"
        autoplay={true}
      />
    ),
    className: "md:col-span-2",
    icon: <IconPalette className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Higher Conversions & Sales",
    description:
      "A high-traffic website/app is great—but what really matters is conversions.",
    header: <ConversionChart />,
    className: "md:col-span-1",
    icon: <IconTrendingUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Proven ROI & Success Stories",
    description: "Delivering measurable results that matter.",
    header: <ProvenROI />,
    className: "md:col-span-1",
    icon: <IconNumber123 className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Business Growth Through Innovation",
    description:
      "Automate, optimize, and scale with AI, mobile apps, and custom tools.",
    header: <AnimatedBeamUI />,
    className: "md:col-span-2",
    icon: <IconSettings className="h-4 w-4 text-neutral-500" />,
  },
];
