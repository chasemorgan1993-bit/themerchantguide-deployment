import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import StickyFooter from '../components/StickyFooter';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TheMerchantGuide - Find Your Perfect Payment Processor',
  description:
    'Find the perfect payment processor for your business in minutes, not weeks. Get personalized recommendations based on your business type, volume, and priorities.',
  keywords:
    'payment processor, merchant services, small business, e-commerce, POS, credit card processing',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <StickyFooter />
      </body>
    </html>
  );
}
