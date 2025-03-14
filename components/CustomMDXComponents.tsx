import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

// Function to extract caption from image alt text
const CustomImage = ({ src, alt }: { src: string; alt: string }) => {
  const [altText, caption] = alt.split("|").map((text) => text.trim());

  return (
    <figure className="my-6">
      <Image
        src={src}
        width={800}
        height={500}
        alt={altText}
        className="rounded-lg shadow-md"
      />
      {caption && (
        <figcaption className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

const CustomLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const isExternal =
    !href.startsWith("/") &&
    !href.startsWith(process.env.NEXT_PUBLIC_SITE_URL || "");

  return (
    <Link
      href={href}
      className="text-blue-500 hover:text-blue-700 transition-colors"
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </Link>
  );
};

export const CustomMDXComponents = {
  h1: ({ children }: { children: ReactNode }) => (
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white my-6">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: ReactNode }) => (
    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-300 my-5">
      {children}
    </h2>
  ),
  p: ({ children }: { children: ReactNode }) => (
    <p className="text-lg text-gray-700 dark:text-gray-300 my-4">{children}</p>
  ),
  img: CustomImage,
  a: CustomLink,
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-600 dark:text-gray-400 my-6">
      {children}
    </blockquote>
  ),
  pre: ({ children }: { children: ReactNode }) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto my-4">
      {children}
    </pre>
  ),
  code: ({ children }: { children: ReactNode }) => (
    <code className="bg-gray-200 dark:bg-gray-800 text-red-500 px-1 py-0.5 rounded">
      {children}
    </code>
  ),
};

export default CustomMDXComponents;
