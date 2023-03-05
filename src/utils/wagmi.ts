import { getDefaultWallets } from "@rainbow-me/rainbowkit"
import { configureChains, createClient } from "wagmi"
import { mainnet, goerli  } from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"

import { localhostAnvil, ganache } from "@/consts/chains"

export const { chains, provider } = configureChains(
  process.env.NODE_ENV === 'development' ? [localhostAnvil, mainnet, goerli, ganache] : [mainnet, goerli],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: "Alkimiya",
  chains,
})

export const client = createClient({
  autoConnect: true,
  connectors,
  provider,
})
