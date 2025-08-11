import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GameProvider } from "../contexts/GameContext";
import { BattleResultsProvider } from "../contexts/BattleResultsContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MODEL VS. CONTROLLER 2",
  description: "New Age of Zeroes and Ones",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GameProvider>
          <BattleResultsProvider>
            {children}
          </BattleResultsProvider>
        </GameProvider>
      </body>
    </html>
  );
}
