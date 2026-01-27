import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import 'modern-normalize/modern-normalize.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TravelTrucks',
 description:
  'TravelTrucks is a modern campervan rental web application where users can browse available campervans, view detailed information, and book the perfect vehicle for their next road trip.',

  openGraph: {
  title: 'TravelTrucks — campervan rentals',
  description:
    'TravelTrucks is a modern campervan rental platform that allows users to explore campervans, check availability, and book vehicles easily for unforgettable road trip adventures.',
  type: 'website',
  url: 'https://campervan-hire.vercel.app',
  images: [
    {
      url: 'https://campervan-hire.vercel.app/images/Hero/Home_img.jpg',
      width: 1200,
      height: 630,
      alt: 'TravelTrucks campervan rental platform',
    },
  ],
    url: 'https://campervan-hire.vercel.app',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">    
      <body className={`${inter.variable} `}>
        <Header />
        <main className="pageMain">{children}</main>
        <ToastContainer position="top-right" />
      </body>
    </html>
  );
}
