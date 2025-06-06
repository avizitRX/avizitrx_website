import { Lato } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

const lato = Lato({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Avizit Roy | Web & Mobile App Developer",
    template: "%s | Avizit Roy",
  },

  description:
    "Avizit Roy is a computer engineer. He is skilled in AI/ML, Web & Mobile App Development.",
  alternates: {
    canonical: "https://www.avizitrx.com",
  },
  openGraph: {
    title: "Avizit Roy | Web & Mobile App Developer",
    description:
      "Avizit Roy is a computer engineer. He is skilled in AI/ML, Web & Mobile App Development.",
    url: "https://www.avizitrx.com",
    siteName: "Avizit Roy | Web & Mobile App Developer",
    images: [{ url: "https://www.avizitrx.com/Link_Share_Thumbnail.png" }],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <body className={`${lato.className} bg-white dark:bg-black antialiased`}>
        <NextTopLoader height={2} initialPosition={0.3} showSpinner={false} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
