import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Regenova | Precision for Stem Cell Differentiation",
  description:
    "Regenova applies AI to stem cell differentiation, enabling faster, more transparent research workflows.",
  icons: {
    icon: [
      { url: "/icon", type: "image/svg+xml" },
      { url: "/regenova-favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/regenova-favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${manrope.variable}`}>
        {children}
      </body>
    </html>
  );
}
