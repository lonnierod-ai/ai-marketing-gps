import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Script from "next/script";

const GA_ID = "G-03GTB18VLH";

export const metadata: Metadata = {
  title: {
    default: "AI Marketing GPS — Find the Right AI Tool for Every Marketing Goal",
    template: "%s | AI Marketing GPS",
  },
  description:
    "AI Marketing GPS helps small business owners and marketers find the right AI tools for their goals. Search by marketing goal or tool name — get workflows, examples, and next steps.",
  metadataBase: new URL("https://www.aimarketinggps.com"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "AI marketing tools",
    "AI tools for small business",
    "best AI tools for content marketing",
    "AI tool finder",
    "marketing automation tools",
    "AI content creation",
    "AI video tools",
    "AI writing tools",
    "ChatGPT for marketing",
    "Claude for marketing",
  ],
  authors: [{ name: "Q'dUp Content Marketing Agency", url: "https://qd-up.com" }],
  creator: "Q'dUp Content Marketing Agency",
  publisher: "AI Marketing GPS",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.aimarketinggps.com",
    siteName: "AI Marketing GPS",
    title: "AI Marketing GPS — Find the Right AI Tool for Every Marketing Goal",
    description:
      "Search by marketing goal or tool name. Get curated AI tool recommendations with step-by-step workflows built for small business owners and content creators.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Marketing GPS — Find the Right AI Tool for Every Marketing Goal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Marketing GPS — Find the Right AI Tool for Every Marketing Goal",
    description:
      "Search by marketing goal or tool name. Get curated AI tool recommendations with step-by-step workflows built for small business owners.",
    images: ["/og-image.png"],
    creator: "@qdupagency",
  },
  icons: {
    icon: "/ai-gps-icon.png",
    apple: "/ai-gps-icon.png",
  },
  verification: {
    google: "wWjGj5ZzuPXMPAAWDv6wmzCf2Re2qUlYXvX8AnxJQeU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://www.aimarketinggps.com/",
    name: "AI Marketing GPS",
    description:
      "AI Marketing GPS helps small business owners and marketers find the right AI tools for their marketing goals. Search by goal or tool name to get curated recommendations, step-by-step workflows, and real examples.",
    publisher: {
      "@type": "Organization",
      name: "Q'dUp Content Marketing Agency",
      url: "https://qd-up.com",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.aimarketinggps.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <head>
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body className="antialiased">
        <header className="bg-white border-b border-brand-sand shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <Link
                href="/"
                className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity"
              >
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
