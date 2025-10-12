"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface CustomImageProps {
  src: string;
  alt?: string;
  title?: string;
  width?: number;
  height?: number;
}

export default function CustomImage({
  src,
  alt,
  title,
  width = 800,
  height = 450,
}: CustomImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleOpen = () => {
    document.body.style.overflow = "hidden";
    setIsOpen(true);
  };

  const handleClose = () => {
    document.body.style.overflow = "";
    setIsOpen(false);
  };

  return (
    <>
      {/* Thumbnail */}
      <figure
        onClick={handleOpen}
        className="flex flex-col items-center my-10 cursor-zoom-in relative"
      >
        <Image
          src={src}
          alt={alt || "Image"}
          width={width}
          height={height}
          className="rounded-lg shadow-md transition-transform duration-300 hover:scale-[1.03]"
        />
        {title && (
          <figcaption className="text-sm text-gray-500 mt-2 text-center px-4">
            {title}
          </figcaption>
        )}
      </figure>

      {/* Lightbox */}
      {mounted &&
        isOpen &&
        createPortal(
          <div
            onClick={handleClose}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fadeIn px-4 sm:px-8"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative flex flex-col items-center max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute -top-10 sm:-top-12 right-0 text-gray-300 hover:text-white bg-black/40 hover:bg-black/60 rounded-full px-3 py-1 text-sm transition"
              >
                ✕
              </button>

              {/* Full Image */}
              <Image
                src={src}
                alt={alt || "Image"}
                width={width * 1.5}
                height={height * 1.5}
                priority
                className="rounded-lg shadow-2xl max-h-[85vh] w-auto object-contain"
              />

              {title && (
                <p className="mt-3 text-sm text-gray-400 text-center max-w-md">
                  {title}
                </p>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
