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
  description: 'Campervan rentals - catalog and booking',
  openGraph: {
    title: 'TravelTrucks — сampervan rentals',
    description: 'Campervan rentals - catalog and booking',
    images: [
      {
        url: 'https://campervan-hire.vercel.app/images/Hero/Home_img.jpg',
        width: 1200,
        height: 630,
        alt: 'Welcome to TravelTrucks',
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
      <head>
        {/* Meta-тег для отключения предзагрузки CSS */}
        <meta name="next-preload" content="false" />
        {/* Дополнительные мета-теги для предотвращения предзагрузки */}
        <meta httpEquiv="x-dns-prefetch-control" content="off" />
        <link rel="preconnect" href="https://campervan-hire.vercel.app" /> 
      </head>     
      <body className={`${inter.variable} `}>
        <Header />
        <main className="pageMain">{children}</main>
        <ToastContainer position="top-right" />
      </body>
    </html>
  );
}
