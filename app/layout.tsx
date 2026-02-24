import "./globals.css";
import type { Metadata } from "next";
import { AppFlowProvider } from "./context/AppFlowContext";

export const metadata: Metadata = {
  title: "CSC484",
  description: "Mobile Web App",
  manifest: "/manifest.json",
  icons: {
    icon: "/chopper.png",
    apple: "/chopper.png",
  },
};

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/chopper.png" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${poppins.className} bg-[#F3F4F6]`}>
        <AppFlowProvider>
          <div className="mx-auto max-w-[430px] min-h-screen bg-white shadow-lg">
            {children}
          </div>
        </AppFlowProvider>
      </body>
    </html>
  );
}
