import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import "modern-normalize/modern-normalize.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 


export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TravelTrucks",
  description: "Campervan rentals - catalog and booking",
    openGraph: {
    title: 'TravelTrucks — сampervan rentals',
    description: "Campervan rentals - catalog and booking",
    images: [
      {
        url: "https://clothica-front.vercel.app/images/hero/hero-desktop.png", 
        width: 1200,
        height: 630,
        alt: "Welcome to TravelTrucks",
      },
    ],
    url: "https://clothica-front.vercel.app", //Изменить на ссылку вашего сайта
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
        <main className="pageMain">
          {children}
        </main>
        <ToastContainer position="top-right" />
      </body>
    </html>
  );
}