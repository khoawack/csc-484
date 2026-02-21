import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSC484",
  description: "Mobile Web App",
  manifest: "/manifest.json",
  icons: {
    icon: "/chopper.png",
    apple: "/chopper.png",
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
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/chopper.png" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="bg-gray-100">
        <div className="mx-auto max-w-[430px] min-h-screen bg-white shadow-lg">
          {children}
        </div>
      </body>
    </html>
  );
}
