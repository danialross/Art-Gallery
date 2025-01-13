import type { Metadata } from "next";
import "./globals.css";
import Topbar from "@/components/Topbar";
import { ReactNode } from "react";
import QueryProvider from "@/components/QueryProvider";

export const metadata: Metadata = {
  title: "Art Gallery",
  icons: [
    { rel: "icon", url: "/favicon.ico" }, // Default favicon
    { rel: "icon", url: "/favicon-16x16.png", sizes: "16x16" }, // 16x16 favicon
    { rel: "icon", url: "/favicon-32x32.png", sizes: "32x32" }, // 32x32 favicon
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" }, // Apple touch icon
    { rel: "icon", url: "/android-chrome-192x192.png", sizes: "192x192" }, // Android Chrome 192x192
    { rel: "icon", url: "/android-chrome-512x512.png", sizes: "512x512" },
  ],
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={`antialiased`}>
    <QueryProvider>
      <Topbar>{children}</Topbar>
    </QueryProvider>
    </body>
    </html>
  );
}
