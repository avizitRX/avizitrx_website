"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import clsx from "clsx";

const Navbar = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={clsx(
        "fixed top-4 left-1/2 transform -translate-x-1/2 flex items-center justify-between px-6 py-2",
        "backdrop-blur-lg bg-white/60 dark:bg-gray-900/60 rounded-full shadow-lg",
        "transition-all duration-300 z-50",
        { "shadow-xl": hasScrolled }
      )}
    >
      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <button className="md:hidden text-gray-900 dark:text-white">
            <Menu size={24} />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-white dark:bg-gray-900 p-6">
          <div className="flex flex-col space-y-4 mt-6">
            <Link
              href="/"
              className="text-lg text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-lg text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
            >
              About
            </Link>
            <Link
              href="/services"
              className="text-lg text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="text-lg text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
            >
              Contact
            </Link>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-6">
        <Link
          href="/"
          className="text-gray-900 dark:text-white text-lg font-medium hover:text-gray-600 dark:hover:text-gray-300 transition"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="text-gray-900 dark:text-white text-lg font-medium hover:text-gray-600 dark:hover:text-gray-300 transition"
        >
          About
        </Link>
        <Link
          href="/services"
          className="text-gray-900 dark:text-white text-lg font-medium hover:text-gray-600 dark:hover:text-gray-300 transition"
        >
          Services
        </Link>
        <Link
          href="/contact"
          className="text-gray-900 dark:text-white text-lg font-medium hover:text-gray-600 dark:hover:text-gray-300 transition"
        >
          Contact
        </Link>
      </div>

      {/* Theme Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="ml-4"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </Button>
    </nav>
  );
};

export default Navbar;
