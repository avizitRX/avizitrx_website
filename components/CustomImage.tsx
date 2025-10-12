"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function CustomImage({
  src,
  alt,
  title,
}: {
  src: string;
  alt?: string;
  title?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure portal works only after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpen = () => {
    // prevent scroll behind modal
    document.body.style.overflow = "hidden";
    setIsOpen(true);
  };

  const handleClose = () => {
    document.body.style.overflow = "";
    setIsOpen(false);
  };

  return (
    <>
      {/* Normal image in post */}
      <figure
        className="flex flex-col items-center my-10 cursor-zoom-in relative"
        onClick={handleOpen}
      >
        <Image
          src={src}
          width={800}
          height={450}
          alt={alt || "Image"}
          className="rounded-lg shadow-md transition-transform duration-300 hover:scale-[1.02]"
        />
        {title && (
          <figcaption className="text-sm text-gray-500 mt-2">
            {title}
          </figcaption>
        )}
      </figure>

      {/* Modal Lightbox */}
      {mounted &&
        isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
            onClick={handleClose}
          >
            <div
              className="relative w-full flex justify-center max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-300 bg-black/40 rounded-full px-3 py-1 text-lg hover:bg-black/60 active:scale-95 transition"
              >
                ✕
              </button>

              <Image
                src={src}
                alt={alt || "Image"}
                width={1200}
                height={675}
                className="rounded-lg shadow-2xl max-h-[85vh] w-auto object-contain"
                priority
              />
            </div>

            {title && (
              <p className="absolute bottom-4 text-center text-gray-300 text-sm px-3">
                {title}
              </p>
            )}
          </div>,
          document.body
        )}
    </>
  );
}
