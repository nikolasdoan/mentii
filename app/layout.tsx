import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { clsx } from 'clsx';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DemoTutorial } from '@/components/DemoTutorial';

import { ChatWidget } from '@/components/ChatWidget';
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mentii - Find Your Perfect Mentor',
  description: 'Swipe, Compare, and request mentors instantly.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, "bg-gray-50 text-gray-900 antialiased flex flex-col min-h-screen")}>
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        <ChatWidget />
        <DemoTutorial />
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
