
import type { Metadata } from "next";
import "./globals.css";
import React from "react";


export const metadata: Metadata = {
  title: "hono geo middleware",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (


      <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased`}
      >
      <div className="flex flex-col justify-between w-full h-full min-h-screen">
        {/*<Header/>*/}
        <main className="flex-auto w-full max-w-full mx-auto">
          {children}
        </main>
      </div>
      </body>
      </html>
  )
}
