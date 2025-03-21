"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const AnimatedBeam = dynamic(
  () => import("../magicui/animated-beam").then((mod) => mod.AnimatedBeam),
  { ssr: false }
);

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-10 items-center justify-center rounded-full border-1 border-border bg-white p-1 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function AnimatedBeamUI({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full items-center justify-center overflow-hidden p-10",
        className
      )}
      ref={containerRef}
    >
      <div className="flex size-full max-w-lg flex-row items-stretch justify-between gap-10">
        <div className="flex flex-col justify-center gap-2">
          <Circle ref={div1Ref}>
            <Icons.nextjs />
          </Circle>
          <Circle ref={div2Ref}>
            <Icons.flutter />
          </Circle>
          <Circle ref={div3Ref}>
            <Icons.tensorflow />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div4Ref} className="size-16">
            <Icons.setting />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div5Ref}>
            <Icons.user />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div5Ref}
      />
    </div>
  );
}

const Icons = {
  nextjs: () => (
    <svg x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
      <linearGradient
        id="NRNx2IPDe7PJlJvrxOKgWa_MWiBjkuHeMVq_gr1"
        x1="24"
        x2="24"
        y1="43.734"
        y2="4.266"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#0a070a"></stop>
        <stop offset=".465" stop-color="#2b2b2b"></stop>
        <stop offset="1" stop-color="#4b4b4b"></stop>
      </linearGradient>
      <circle
        cx="24"
        cy="24"
        r="19.734"
        fill="url(#NRNx2IPDe7PJlJvrxOKgWa_MWiBjkuHeMVq_gr1)"
      ></circle>
      <rect
        width="3.023"
        height="15.996"
        x="15.992"
        y="16.027"
        fill="#fff"
      ></rect>
      <linearGradient
        id="NRNx2IPDe7PJlJvrxOKgWb_MWiBjkuHeMVq_gr2"
        x1="30.512"
        x2="30.512"
        y1="33.021"
        y2="18.431"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset=".377" stop-color="#fff" stop-opacity="0"></stop>
        <stop offset=".666" stop-color="#fff" stop-opacity=".3"></stop>
        <stop offset=".988" stop-color="#fff"></stop>
      </linearGradient>
      <rect
        width="2.953"
        height="14.59"
        x="29.035"
        y="15.957"
        fill="url(#NRNx2IPDe7PJlJvrxOKgWb_MWiBjkuHeMVq_gr2)"
      ></rect>
      <linearGradient
        id="NRNx2IPDe7PJlJvrxOKgWc_MWiBjkuHeMVq_gr3"
        x1="22.102"
        x2="36.661"
        y1="21.443"
        y2="40.529"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset=".296" stop-color="#fff"></stop>
        <stop offset=".521" stop-color="#fff" stop-opacity=".5"></stop>
        <stop offset=".838" stop-color="#fff" stop-opacity="0"></stop>
      </linearGradient>
      <polygon
        fill="url(#NRNx2IPDe7PJlJvrxOKgWc_MWiBjkuHeMVq_gr3)"
        points="36.781,38.094 34.168,39.09 15.992,16.027 19.508,16.027"
      ></polygon>
    </svg>
  ),
  flutter: () => (
    <svg x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
      <polygon fill="#40c4ff" points="26,4 6,24 12,30 38,4"></polygon>
      <polygon fill="#40c4ff" points="38,22 27,33 21,27 26,22"></polygon>
      <rect
        width="8.485"
        height="8.485"
        x="16.757"
        y="28.757"
        fill="#03a9f4"
        transform="rotate(-45.001 21 33)"
      ></rect>
      <polygon fill="#01579b" points="38,44 26,44 21,39 27,33"></polygon>
      <polygon fill="#084994" points="21,39 30,36 27,33"></polygon>
    </svg>
  ),
  tensorflow: () => (
    <svg x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
      <polygon fill="#ffa000" points="16,39.609 23,43.609 23,4 16,8"></polygon>
      <polygon
        fill="#ffa000"
        points="23,12.433 6,22.25 6,13.75 23,3.933"
      ></polygon>
      <polygon fill="#ffb300" points="32,39.609 25,43.609 25,4 32,8"></polygon>
      <polygon
        fill="#ffb300"
        points="25,12.433 42,22.25 42,13.75 25,3.933"
      ></polygon>
      <polygon
        fill="#ffb300"
        points="29,19.732 29,27.365 36,31.407 36,23.775"
      ></polygon>
    </svg>
  ),
  setting: () => (
    <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
      <path
        d="M36.686 15.171C37.9364 16.9643 38.8163 19.0352 39.2147 21.2727H44V26.7273H39.2147C38.8163 28.9648 37.9364 31.0357 36.686 32.829L40.0706 36.2137L36.2137 40.0706L32.829 36.686C31.0357 37.9364 28.9648 38.8163 26.7273 39.2147V44H21.2727V39.2147C19.0352 38.8163 16.9643 37.9364 15.171 36.686L11.7863 40.0706L7.92939 36.2137L11.314 32.829C10.0636 31.0357 9.18372 28.9648 8.78533 26.7273H4V21.2727H8.78533C9.18372 19.0352 10.0636 16.9643 11.314 15.171L7.92939 11.7863L11.7863 7.92939L15.171 11.314C16.9643 10.0636 19.0352 9.18372 21.2727 8.78533V4H26.7273V8.78533C28.9648 9.18372 31.0357 10.0636 32.829 11.314L36.2137 7.92939L40.0706 11.7863L36.686 15.171Z"
        fill="#333"
        stroke="#333"
        stroke-width="3"
        stroke-linejoin="round"
      />
      <path
        d="M24 29C26.7614 29 29 26.7614 29 24C29 21.2386 26.7614 19 24 19C21.2386 19 19 21.2386 19 24C19 26.7614 21.2386 29 24 29Z"
        fill="#FFF"
        stroke="#FFF"
        stroke-width="3"
        stroke-linejoin="round"
      />
    </svg>
  ),
  user: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};
