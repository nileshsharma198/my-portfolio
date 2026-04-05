import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Your Name | Full-Stack Developer",
  description: "Full-stack developer specializing in React, Next.js, TypeScript and Node.js.",
  openGraph: {
    title: "Your Name | Full-Stack Developer",
    description: "Full-stack developer specializing in React, Next.js, TypeScript, and Node.js. Experienced in building scalable, high-performance applications.",
    url: "https://yourportfolio.vercel.app/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@yourusername",
  },
  authors: [{ name: "Your Name", url: "https://yourportfolio.vercel.app/" }],
  keywords: [
    "Your Name",
    "Software Developer",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Web Development",
  ],
  creator: "Your Name",
  publisher: "Your Name",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable}`}
      suppressHydrationWarning
    >
      <body
        className={`${inter.className} w-screen min-h-screen m-0 p-0 overflow-x-hidden dark:bg-gray-900`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="bg-white dark:bg-gray-900 mx-auto pt-6 sm:pt-12 w-full md:w-3/4 lg:w-3/5 text-gray-900 dark:text-gray-100">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
