import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learviverse Hub",
  description:
    "Discover, Learn, and Grow with our powerful learning platform built for students, professionals, and lifelong learners.",
};

const poppins = Inter({ subsets: ["latin"], variable: "--font-poppins" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          `${geistSans.variable} ${geistMono.variable} antialiased, ${poppins.className}`
        )}
      >
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
