import { ConnectButton } from "@rainbow-me/rainbowkit"
import Head from "next/head"
import Image from "next/image"

import NavBar from "@/components/organisms/NavBar"
import { useDynamicViewport } from "@/hooks/useDynamicViewport"

import type { ReactNode } from "react"

import CouncilLogo from "public/images/icons/table_logo.svg"

const Layout = ({ children }: { children: ReactNode }) => {
  useDynamicViewport()

  return (
    <div className={`max-h-screen flex font-sans bg-[#2A334A] text-white`}>
      <Head>
        <title>Council</title>
        <meta content="Council" name="description" />
        <meta content="width=800, initial-scale=0.5" name="viewport" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <header
        className={
          `absolute w-full flex justify-between items-center
          p-1 bg-[#38425C] z-20 border-b-2 border-aragon-dark-blue`
        }
      >
        <div className='flex h-full'>
          {/* <div className='bg-gray-400 rounded-full border border-black p-1 h-12 w-12'> */}
          <Image
            alt="Council Logo"
            height={60}
            src={CouncilLogo}
            width={60}
          />
          {/* </div> */}

          <div className='flex items-center justify-start'>

            <h1 className='text-black font-semibold -mt-1 text-3xl text-bold ml-2 text-shadow'>
            councl
            </h1>
          </div>

        </div>

        <div className='mr-2'>

          <ConnectButton />
        </div>

      </header>
      <NavBar />
      <div className="flex-grow flex-shrink relative h-[100vh]">
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
