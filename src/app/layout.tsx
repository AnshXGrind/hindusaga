import type { Metadata } from 'next';
import { Cinzel, Inter } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Sacred Himalayas | The Divine River System',
  description: 'A cinematic interactive journey through the sacred Himalayan river system of India.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable} h-full antialiased bg-black`}>
      <body className="min-h-full flex flex-col font-inter text-white">
        {children}
      </body>
    </html>
  );
}
