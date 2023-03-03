import type { Chain } from '@wagmi/core'

export const localhostAnvil = {
  id: 31337,
  name: 'Localhost 8545',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  network: 'Localhost 8545',
  rpcUrls: {
    default: { http: ['http://localhost:8545'] },
    public: { http: ['http://localhost:8545'] },
  },
} as const satisfies Chain

export const ganache = {
  id: 1337,
  name: 'ganache',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  network: 'Localhost 7545',
  rpcUrls: {
    default: { http: ['http://127.0.0.1:7545'] },
    public: { http: ['http://127.0.0.1:7545'] },
  },
} as const satisfies Chain
