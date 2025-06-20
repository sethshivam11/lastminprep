import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "../context/session-provider";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/context/theme-provider";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Last Min Prep",
  description:
    "Generate AI-powered questions on the go. Customize your interview prep with job descriptions, language preferences, difficulty levels, and a mix of coding and multiple choice questions.",
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>
            <Toaster richColors />
            <Navbar />
            <div className="max-w-7xl mx-auto min-h-screen">{children}</div>
            <Footer />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
