import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClipboardList } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo List App",
  description: "A simple todo list application built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen p-8 bg-gradient-to-br from-background to-secondary">
          <div className="max-w-4xl mx-auto">
            <header className="bg-card rounded-lg shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold text-primary flex items-center gap-3">
                  <ClipboardList className="w-10 h-10" />
                  Todo List
                </h1>
                <p className="text-muted-foreground">Stay organized, boost productivity</p>
              </div>
            </header>
            <div className="bg-card rounded-lg shadow-lg p-6">
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}