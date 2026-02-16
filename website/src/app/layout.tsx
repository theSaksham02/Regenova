import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Project 0 | DeFi-Native Prime Broker",
  description:
    "Access multi-venue DeFi with unified margin across your entire portfolio.",
  icons: {
    icon: [{ url: "/favicon.ico?v=regenova-r" }],
    apple: [{ url: "/logo_trans.jpg", type: "image/jpeg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
