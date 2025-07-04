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
  icons: {
    apple: "/apple-touch-icon.png",
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    title: "Sociial",
    url: "https://sociial.devshivam.tech",
    description:
      "Sociial is a vibrant community where you can connect, share, and grow. Join us and start your social journey today!",
    siteName: "Shivam",
    images: [
      {
        url: `https://sociial.devshivam.tech/opengraph-image.jpg`,
        type: "image/jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sociial",
    description:
      "Sociial is a vibrant community where you can connect, share, and grow. Join us and start your social journey today!",
    creator: "@sethshivam11",
    siteId: "765045797750706176",
    images: [
      {
        url: `https://sociial.devshivam.tech/opengraph-image.jpg`,
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
