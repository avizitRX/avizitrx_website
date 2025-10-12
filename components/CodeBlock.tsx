"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy } from "lucide-react";

interface CodeBlockProps {
  className?: string;
  children: string;
}

export default function CodeBlock({ className, children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const language = className?.replace("language-", "") || "text";
  const code = children.trim();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const isInline = !code.includes("\n");

  // Inline code styling
  if (isInline) {
    return (
      <code className="bg-neutral-800 text-neutral-200 px-1.5 py-0.5 rounded text-[0.9rem]">
        {children}
      </code>
    );
  }

  // Code block styling
  return (
    <div className="relative group">
      {/* Language label */}
      <div className="absolute top-2 left-4 text-xs uppercase text-gray-400 font-medium">
        {language}
      </div>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute top-2 right-3 z-10 flex items-center gap-1 bg-gray-700 text-gray-100
        text-xs px-2 py-1 rounded opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition"
      >
        <Copy size={14} />
        {copied ? "Copied!" : "Copy"}
      </button>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          borderRadius: "0.75rem",
          padding: "1.25rem",
          paddingTop: "2.5rem",
          border: "none",
          fontSize: "0.9rem",
          lineHeight: "1.5",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
