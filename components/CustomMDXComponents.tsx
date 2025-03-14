import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

// Custom Image component to support captions
const CustomImage = ({
  src,
  alt,
  title,
}: {
  src: string;
  alt?: string;
  title?: string;
}) => {
  return (
    <figure className="flex flex-col items-center">
      <Image
        src={src}
        width={800}
        height={450}
        alt={alt || "Image"}
        className="rounded-lg shadow-lg"
      />
      {title && (
        <figcaption className="text-sm text-gray-500 mt-2">{title}</figcaption>
      )}
    </figure>
  );
};

// Table wrapper for better styling
const CustomTable = (props: any) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      {props.children}
    </table>
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
    <code className="text-neutral-800 dark:text-neutral-300 px-1 py-0.5 rounded">
      {children}
    </code>
  ),
  table: CustomTable,
};

export default CustomMDXComponents;
