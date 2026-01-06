import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NeuralNest - Autonomous Podcast Agent",
  description: "Zero-touch AI system for podcast script generation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <div className="min-h-screen bg-black text-white">
          <nav className="border-b border-zinc-800 bg-zinc-950">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold">
                  NeuralNest
                </Link>
                <div className="flex gap-6">
                  <Link href="/news" className="hover:text-blue-400 transition">
                    News
                  </Link>
                  <Link href="/updates" className="hover:text-blue-400 transition">
                    Updates
                  </Link>
                  <Link href="/script" className="hover:text-blue-400 transition">
                    Script
                  </Link>
                </div>
              </div>
            </div>
          </nav>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
