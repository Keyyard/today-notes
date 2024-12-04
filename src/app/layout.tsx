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
};

export const viewport = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
export const themeColor = "#ffffff"; // Light theme

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <Head>
        <title>Today Notes</title>
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}