// src/app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import ClientProviders from './ClientProviders';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SwiftDocs",
  description: "Effortless Document Creation in Seconds",
  openGraph: {
    images: [
      {
        url: "logo.png",
        width: 800,
        height: 600,
        alt: "SwiftDocs Logo",
        optimize: false,
      },
    ],
  },
  type: "website",
  keywords: ["document", "creation", "effortless"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClientProviders>
        <body className={inter.className}>{children}</body>
      </ClientProviders>
    </html>
  );
}
