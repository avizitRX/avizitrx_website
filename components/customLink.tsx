import Link from "next/link";
import { ReactNode } from "react";

console.log(process.env.NEXT_PUBLIC_SITE_URL);

const CustomLink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => {
  let isExternal = false;

  try {
    const linkUrl = new URL(href, process.env.NEXT_PUBLIC_SITE_URL);
    // External if origin is different
    isExternal = linkUrl.origin !== process.env.NEXT_PUBLIC_SITE_URL;
  } catch {
    // If URL constructor fails, treat relative URLs as internal
    isExternal = false;
  }

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700 transition-colors"
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="text-blue-500 hover:text-blue-700 transition-colors"
    >
      {children}
    </Link>
  );
};

export default CustomLink;
