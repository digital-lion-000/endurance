import "./globals.css";
import type { Metadata } from "next";
import { clsx } from "clsx";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Repo Explorer",
  description: "Explore GitHub repos with a clean, production-minded UI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={clsx("min-h-screen bg-white text-slate-900")}>
        <Header />
        <main className="mx-auto w-full max-w-5xl px-4 pb-16 pt-6">{children}</main>
      </body>
    </html>
  );
}
