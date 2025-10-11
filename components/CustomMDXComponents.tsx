import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import CodeBlock from "./CodeBlock";

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
    <figure className="flex flex-col items-center my-10">
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

// Custom Table Component
const CustomTable = ({ children }: { children: ReactNode }) => (
  <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 my-5">
    {children}
  </table>
);

// Custom Table Row
const CustomTableRow = ({ children }: { children: ReactNode }) => (
  <tr className="border-b border-gray-300 dark:border-gray-600">{children}</tr>
);

// Custom Table Header
const CustomTableHeader = ({ children }: { children: ReactNode }) => (
  <th className="bg-gray-100 dark:bg-gray-800 text-left p-3 border border-gray-300 dark:border-gray-600">
    {children}
  </th>
);

// Custom Table Data
const CustomTableData = ({ children }: { children: ReactNode }) => (
  <td className="p-3 border border-gray-300 dark:border-gray-600">
    {children}
  </td>
);

// Custom Link Component
const CustomLink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
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
    <h1 className="text-5xl font-bold text-gray-900 dark:text-white mt-10 mb-6">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: ReactNode }) => (
    <div className="mt-8 mb-5">
      <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 dark:text-gray-300">
        {children}
      </h2>
      <div className="h-[1px] w-full bg-gray-400 dark:bg-gray-600 mt-2 opacity-40 rounded"></div>
    </div>
  ),
  h3: ({ children }: { children: ReactNode }) => (
    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300 mt-6 mb-5">
      {children}
    </h2>
  ),
  p: ({ children }: { children: ReactNode }) => (
    <p
      className="text-gray-700 dark:text-gray-300 my-5"
      style={{ fontSize: "1.1rem" }}
    >
      {children}
    </p>
  ),
  img: CustomImage,
  a: CustomLink,
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-600 dark:text-gray-400 my-6">
      {children}
    </blockquote>
  ),
  pre: ({ children }: { children: ReactNode }) => (
    <pre className="overflow-x-auto">{children}</pre>
  ),
  code: (props: any) => <CodeBlock {...props} />,
  hr: () => (
    <hr className="border-t border-gray-300 dark:border-gray-600 my-8" />
  ),
  ul: ({ children }: { children: ReactNode }) => (
    <ul
      className="list-disc list-outside md:pl-5 space-y-2 text-justify text-gray-700 dark:text-gray-300 mx-8 my-5"
      style={{ fontSize: "1.1rem" }}
    >
      {children}
    </ul>
  ),
  ol: ({ children }: { children: ReactNode }) => (
    <ol
      className="list-decimal list-outside md:pl-5 space-y-2 text-justify text-gray-700 dark:text-gray-300 mx-8 my-5"
      style={{ fontSize: "1.1rem" }}
    >
      {children}
    </ol>
  ),
  li: ({ children }: { children: ReactNode }) => (
    <li className="pl-2">{children}</li>
  ),
  del: ({ children }: { children: ReactNode }) => (
    <del className="text-gray-500 dark:text-gray-400">{children}</del>
  ),
  table: CustomTable,
  tr: CustomTableRow,
  th: CustomTableHeader,
  td: CustomTableData,
};

export default CustomMDXComponents;
