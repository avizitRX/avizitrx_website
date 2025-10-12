"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import dynamic from "next/dynamic";

const Sheet = dynamic(
  () => import("@/components/ui/sheet").then((mod) => mod.Sheet),
  { ssr: false }
);
const SheetContent = dynamic(
  () => import("@/components/ui/sheet").then((mod) => mod.SheetContent),
  { ssr: false }
);
const SheetTrigger = dynamic(
  () => import("@/components/ui/sheet").then((mod) => mod.SheetTrigger),
  { ssr: false }
);

const Navbar = () => {
  return (
    <nav
      className="
        fixed top-0 left-0 w-full md:left-1/2 md:top-4 md:-translate-x-1/2 md:w-auto
        flex items-center justify-between px-4 py-2 md:px-6 md:py-3
        backdrop-blur-lg bg-white/60 dark:bg-gray-900/60
        shadow-lg md:rounded-full z-50
        transition-all duration-300
      "
    >
      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <div className="flex items-center justify-between w-full md:hidden">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              avizitRX
            </span>
            <button className="text-gray-900 dark:text-white">
              <Menu size={24} aria-label="Menu" />
            </button>
          </div>
        </SheetTrigger>
        <SheetContent side="right" className="bg-white dark:bg-gray-900 p-6">
          <div className="flex flex-col space-y-4 mt-6">
            {["Home", "About", "Services", "Portfolio", "Contact"].map(
              (label) => (
                <Link
                  key={label}
                  href={`/#${label.toLowerCase()}`}
                  className="text-lg text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {label}
                </Link>
              )
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-6">
        {["Home", "About", "Services", "Portfolio", "Blog", "Contact"].map(
          (label) => (
            <Link
              key={label}
              href={`/#${label.toLowerCase().replace(" ", "-")}`}
              className="text-gray-900 dark:text-white text-lg font-medium hover:text-gray-600 dark:hover:text-gray-300 transition"
            >
              {label}
            </Link>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;
