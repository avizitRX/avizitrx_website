import { Lato } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import NextTopLoader from "nextjs-toploader";
import type { Metadata } from "next";

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
    canonical: "https://avizitrx.com",
  },
  openGraph: {
    title: "Avizit Roy | Web & Mobile App Developer",
    description:
      "Avizit Roy is a computer engineer. He is skilled in AI/ML, Web & Mobile App Development.",
    url: "https://avizitrx.com",
    siteName: "Avizit Roy | Web & Mobile App Developer",
    images: [{ url: "https://avizitrx.com/Link_Share_Thumbnail.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${lato.className} bg-white dark:bg-black antialiased`}>
        <ThemeProvider>
          <NextTopLoader height={2} initialPosition={0.3} showSpinner={false} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
