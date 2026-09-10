// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#05070D",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nbstechsolutions.com"),
  title: "NBS Tech Solutions | Web, Software & AI Solutions",
  description:
    "NBS Tech Solutions builds modern web, software, AI and digital solutions. Powered by a specialized three-member technology team in Full-Stack, AI/ML, and Software Architecture.",
  keywords: [
    "NBS Tech Solutions",
    "Web Development",
    "Software Development",
    "AI Solutions",
    "Full-Stack",
    "Next.js",
    "React",
    "Python",
    "Satish Reddy",
    "Bhovan Chandra",
    "Kota Naveen",
  ],
  authors: [
    { name: "Satish Reddy" },
    { name: "Kokkiligadda Bhovan Chandra" },
    { name: "Kota Naveen" },
  ],
  openGraph: {
    title: "NBS Tech Solutions | Web, Software & AI Solutions",
    description:
      "We design, develop and deliver modern digital solutions that turn ideas into scalable technology.",
    url: "https://nbstechsolutions.com",
    siteName: "NBS Tech Solutions",
    images: [
      {
        url: "/images/team-hero.jpg",
        width: 1536,
        height: 1024,
        alt: "NBS Tech Solutions Founders: Satish Reddy, Bhovan Chandra, Kota Naveen",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NBS Tech Solutions | Web, Software & AI Solutions",
    description:
      "We design, develop and deliver modern digital solutions that turn ideas into scalable technology.",
    images: ["/images/team-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth dark`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "NBS Tech Solutions",
              "url": "https://nbstechsolutions.com",
              "logo": "https://nbstechsolutions.com/images/logo.png",
              "email": "nbstechsolutions3@gmail.com",
              "telephone": "+917989335763",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Vijayawada",
                "addressRegion": "Andhra Pradesh",
                "addressCountry": "IN"
              },
              "description": "NBS Tech Solutions builds modern web, software, AI and digital solutions. Powered by a specialized three-member technology team in Full-Stack, AI/ML, and Software Architecture.",
              "sameAs": [
                "https://linkedin.com/in/kota-naveen",
                "https://linkedin.com/in/bhovanchandarkokkiligadda",
                "https://linkedin.com/in/bayana-sathish-reddy",
                "https://github.com/KotaNaveen"
              ],
              "founder": [
                { "@type": "Person", "name": "Kota Naveen", "jobTitle": "Full-Stack Web Developer" },
                { "@type": "Person", "name": "Kokkiligadda Bhovan Chandra", "jobTitle": "Software Engineer & AI/ML Developer" },
                { "@type": "Person", "name": "Satish Reddy", "jobTitle": "AI Analyst & Python Developer" }
              ]
            })
          }}
        />
      </head>
      <body className="bg-[#05070D] text-[#F5F7FA] font-sans min-h-screen selection:bg-[#2E6BFF]/30 selection:text-white antialiased">
        {children}
      </body>
    </html>
  );
}
