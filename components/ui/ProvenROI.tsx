import React from "react";
import { NumberTicker } from "../magicui/number-ticker";

const ProvenROI = () => {
  return (
    <div
      className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl items-center justify-center 
  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] 
  [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  
  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"
    >
      {/* Three-column layout */}
      <div className="flex gap-8">
        {/* Column 1 */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <NumberTicker
              value={10}
              className="text-2xl font-medium tracking-tighter text-black dark:text-white"
            />
            <span className="text-2xl font-medium tracking-tighter text-black dark:text-white">
              +
            </span>
          </div>
          <p className="text-lg font-medium text-black dark:text-white">
            Clients
          </p>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <NumberTicker
              value={25}
              className="text-2xl font-medium tracking-tighter text-black dark:text-white"
            />
            <span className="text-2xl font-medium tracking-tighter text-black dark:text-white">
              +
            </span>
          </div>
          <p className="text-lg font-medium text-black dark:text-white">
            Projects
          </p>
        </div>

        {/* Column 3 */}
        {/* <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <NumberTicker
              value={50}
              className="text-2xl font-medium tracking-tighter text-black dark:text-white"
            />
            <span className="text-2xl font-medium tracking-tighter text-black dark:text-white">
              +
            </span>
          </div>
          <p className="text-lg font-medium text-black dark:text-white">
            Awards
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default ProvenROI;
