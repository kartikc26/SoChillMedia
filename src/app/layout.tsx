import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SoChillMedia — India's Multimedia Agency for Brands That Mean Business",
  description: "We make brands go viral, look good, and feel unforgettable. Social media management, photography, videography, branding & creative design agency in India.",
  keywords: ["social media agency", "branding", "videography", "photography", "reels production", "graphic design", "India", "SoChillMedia", "multimedia agency"],
  metadataBase: new URL("https://sochillmedia.in"),
  openGraph: {
    title: "SoChillMedia — India's Multimedia Agency",
    description: "We make brands go viral, look good, and feel unforgettable. 500+ reels delivered, 50+ brands served, 100% client retention.",
    url: "https://sochillmedia.in",
    siteName: "SoChillMedia",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SoChillMedia — India's Multimedia Agency",
    description: "We make brands go viral, look good, and feel unforgettable.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SoChillMedia",
    url: "https://sochillmedia.in",
    logo: "https://sochillmedia.in/logo.png",
    description: "India's Multimedia Agency for Brands That Mean Business. Social media management, photography, videography, branding & creative design.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-7303381658",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://www.instagram.com/sochillmedia",
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-[#0a0a0a] text-white`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
