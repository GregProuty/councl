import { Inter } from "@next/font/google"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import Head from "next/head"

import NavBar from "@/components/organisms/NavBar"
import { useDynamicViewport } from "@/hooks/useDynamicViewport"

import type { ReactNode } from "react"

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const Layout = ({ children }: { children: ReactNode }) => {
  useDynamicViewport()
  return (
    <div className={`max-h-screen flex ${inter.variable} font-sans`}>
      <Head>
        <title>Alkimiya</title>
        <meta content="Alkimiya" name="description" />
        <meta content="width=800, initial-scale=0.5" name="viewport" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <header
        className={
          `absolute w-full flex justify-end
          p-3 border-b backdrop-blur z-10`
        }
      >
        <ConnectButton />
      </header>
      <NavBar />
      <div className="flex-grow flex-shrink min-w-0 relative">
        <main
          className="max-h-full p-10 pt-24 overflow-scroll"
        >
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout