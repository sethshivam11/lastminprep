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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://lastminprep.vercel.app";

export const metadata: Metadata = {
  title: "Last Min Prep",
  description:
    "Generate AI-powered questions on the go. Customize your interview prep with job descriptions, language preferences, difficulty levels, and a mix of coding and multiple choice questions.",
  icons: {
    apple: "/apple-touch-icon.png",
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    title: "Last Min Prep",
    url: baseUrl,
    description:
      "Generate AI-powered questions on the go. Customize your interview prep with job descriptions, language preferences, difficulty levels, and a mix of coding and multiple choice questions.",
    images: [
      {
        url: `${baseUrl}/opengraph-image.jpg`,
        type: "image/jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Last Min Prep",
    description:
      "Generate AI-powered questions on the go. Customize your interview prep with job descriptions, language preferences, difficulty levels, and a mix of coding and multiple choice questions.",
    creator: "@sethshivam11",
    siteId: "765045797750706176",
    images: [
      {
        url: `${baseUrl}/opengraph-image.jpg`,
        type: "image/jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
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
