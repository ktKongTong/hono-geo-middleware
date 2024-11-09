import GeoPanelClient from "@/app/geo-panel.v0";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const githubLink = 'https://github.com/ktKongTong/hono-geo-middleware'

export default function Page() {
  return <main className="relative flex min-h-screen flex-col items-center justify-center">
    <h1
      className="pt-4 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
      Geo Middleware for Hono
    </h1>
    <h4 className={'pb-8 '}>
      extract request's geo information from serverless runtime
    </h4>
    <div
      className="bg-white/30 p-6 lg:p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">

      <div className="flex justify-between items-center mb-4">
        <GeoPanelClient/>
      </div>
    </div>
    <p className="font-light text-gray-600 w-full max-w-lg text-center mt-6">
      <Link
        href={githubLink}
        className="font-medium underline underline-offset-4 hover:text-black transition-colors"
      >
        geo middleware
      </Link>
      {' '} for {' '}
      <Link
        href="https://hono.dev"
        className="font-medium underline underline-offset-4 hover:text-black transition-colors"
      >
        Hono
      </Link>
      . Built with{' '}
      <Link
        href="https://nextjs.org/docs"
        className="font-medium underline underline-offset-4 hover:text-black transition-colors"
      >
        Next.js App Router
      </Link>
      .
    </p>
    <div className="mt-12 w-full flex items-center justify-between px-6 ">
      <Link
        href="https://hono.dev"
        className="lg:absolute bottom-12 left-12 flex items-center space-x-2"
      >
        <Image
          src="/favicon.ico"
          alt="Hono Logo"
          width={24}
          height={24}
          priority
        />
        <span className="font-light">Hono</span>
      </Link>
      <Link
        href={githubLink}
        className="lg:absolute bottom-12 right-12 flex items-center space-x-2"
      >
        <Image
          src="/github.svg"
          alt="GitHub Logo"
          width={24}
          height={24}
          priority
        />
        <span className="font-light">Source</span>
      </Link>
    </div>
  </main>

}