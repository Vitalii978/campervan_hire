import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'modern-normalize/modern-normalize.css'; 
import './globals.css'; 
import Header from '@/components/Header/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TravelTrucks',
  description: 'Campervan rentals - catalog and booking',
  openGraph: {
    title: 'TravelTrucks — campervan rentals',
    description: 'Campervan rentals - catalog and booking',
    type: 'website',
    url: 'https://campervan-hire.vercel.app',
    images: [
      {
        url: 'https://campervan-hire.vercel.app/images/Hero/Home_img.jpg',
        width: 1200,
        height: 630,
        alt: 'Welcome to TravelTrucks',
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
    <html lang="en">    
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.variable}`}>
        <Header />
        <main className="pageMain">{children}</main>
        <ToastContainer position="top-right" />
      </body>
    </html>
  );
}