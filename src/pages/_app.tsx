import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"
import { QueryClientProvider, QueryClient } from "react-query"
import { WagmiConfig } from "wagmi"

import "@/styles/globals.css"
import Layout from "@/components/pageTemplates/Layout"
import { chains, client } from "@/utils/wagmi"

import type { AppProps } from "next/app"

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
