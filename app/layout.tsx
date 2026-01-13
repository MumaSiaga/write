import type { Metadata } from "next";
import "./globals.css";
import { Inter, Newsreader } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});
export const metadata: Metadata = {
  title: "Write",
  description: "Start writing notes instantly with Write",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
       <head>
    <link
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
      rel="stylesheet"
    />
  </head>
      <body
        className={`${inter.className} bg-[#fcfaf7] text-[#2c2e2a] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}



