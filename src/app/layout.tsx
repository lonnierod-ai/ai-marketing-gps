import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Marketing GPS",
  description: "AI-powered marketing guidance system",
  icons: {
    icon: "/ai-gps-icon.png",
    apple: "/ai-gps-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <header className="bg-white border-b border-brand-sand shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
                <Image
                  src="/ai-gps-logo.png"
                  alt="AI Marketing GPS Logo"
                  width={60}
                  height={40}
                  className="object-contain w-12 h-8 sm:w-[60px] sm:h-[40px]"
                  priority
                />
                <h1 className="text-lg sm:text-xl font-bold">
                  <span className="text-brand-dark">AI Marketing</span>{" "}
                  <span className="text-brand-orange">GPS</span>
                </h1>
              </Link>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
