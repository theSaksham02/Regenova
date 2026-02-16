import type { Metadata } from "next";
// import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

// const montserrat = Montserrat({
//   variable: "--font-display",
//   subsets: ["latin"],
//   weight: ["500", "600", "700", "800"],
// });

// const inter = Inter({
//   variable: "--font-body",
//   subsets: ["latin"],
//   weight: ["400", "500", "600"],
// });

export const metadata: Metadata = {
  title: "Regenova | AI-Driven Stem Cell Differentiation",
  description:
    "AI-driven precision for stem cell differentiation. Speed, accuracy, and transparency for researchers.",
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <body className={`${montserrat.variable} ${inter.variable}`} suppressHydrationWarning> */}
      <body className="font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
