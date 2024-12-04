import type { Metadata } from "next";
import Head from "next/head";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Today Notes",
  description:
    "Today Notes is a lightweight, daily task management web app with task expiration, light/dark modes, and real-time notifications.",
  keywords:
    "task management, daily tasks, task app, nextjs, react, tailwindcss, prisma, sqlite, task reminders, light/dark mode, optimistic UI, toast notifications, frontend development, full-stack development, web application, task tracker, productivity app, react hooks, web app design, real-time notifications, next.js project",
  authors: [{ name: "Keyyard" }],
  openGraph: {
    title: "Today Notes",
    description:
      "Today Notes is a lightweight, daily task management web app with task expiration, light/dark modes, and real-time notifications.",
    url: "https://today-notes.keyyard.xyz/",
    type: "website",
    siteName: "Today Notes",
    images: [
      {
        url: "https://today-notes.keyyard.xyz/icons/180.png",
        width: 180,
        height: 180,
        alt: "Today Notes Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Today Notes",
    description:
      "Lightweight, daily task management web app with task expiration, light/dark modes, and real-time notifications.",
    creator: "@keyyard",
    images: ["https://today-notes.keyyard.xyz/icons/180.png"],
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  themeColor: "#ffffff", // Light theme
  appleWebApp: {
    title: "Today Notes",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/favicon.ico",
    apple: [
      { url: "/icons/180.png", sizes: "180x180" },
      { url: "/icons/152.png", sizes: "152x152" },
      { url: "/icons/120.png", sizes: "120x120" },
      { url: "/icons/76.png", sizes: "76x76" },
    ],
  },
};


export const viewport =
  "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <Head>
        {/* Social Media Meta Tags */}
        {/* Open Graph (OG) for Facebook, LinkedIn, etc. */}
        <meta property="og:title" content="Today Notes" />
        <meta
          property="og:description"
          content="Today Notes is a lightweight, daily task management web app with task expiration, light/dark modes, and real-time notifications."
        />
        <meta property="og:url" content="https://today-notes.keyyard.xyz/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://today-notes.keyyard.xyz/icons/180.png"
        />
        <meta property="og:site_name" content="Today Notes" />

        {/* Twitter Card for better sharing on Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Today Notes" />
        <meta
          name="twitter:description"
          content="Lightweight, daily task management web app with task expiration, light/dark modes, and real-time notifications."
        />
        <meta
          name="twitter:image"
          content="https://today-notes.keyyard.xyz/icons/180.png"
        />
        <meta name="twitter:creator" content="@keyyard" />

        {/* Web App Meta Tags */}
        <meta name="viewport" content={viewport} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Today Notes" />
        {/* Light theme status bar */}
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/180.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/152.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/icons/120.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/icons/76.png" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
