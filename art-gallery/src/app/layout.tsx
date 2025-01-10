import type { Metadata } from "next";
import "./globals.css";
import Topbar from "@/components/Topbar";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Art Gallery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Topbar>{children}</Topbar>
      </body>
    </html>
  );
}
