import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, DM_Sans, Caveat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dmsans",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FOUR YEARS ♡ An Anniversary Date Invitation",
  description: "An interactive, cinematic anniversary invitation for the one person I somehow haven't gotten tired of.",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><path d='M16 2 L19 12 L29 15 L19 18 L16 28 L13 18 L3 15 L13 12 Z' fill='%23C7A66A'/><circle cx='16' cy='15' r='3' fill='%23D9A5A5'/></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playfair.variable} ${dmSans.variable} ${caveat.variable}`}
    >
      <body className="antialiased bg-paper-ivory text-chocolate min-h-screen selection:bg-rose-dusty selection:text-paper-dark">
        {children}
      </body>
    </html>
  );
}
