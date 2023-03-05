import type { HardhatUserConfig } from "hardhat/config"
import type { NetworkUserConfig } from "hardhat/types"

import "@nomicfoundation/hardhat-toolbox"
import '@openzeppelin/hardhat-upgrades'

import { config as dotenvConfig } from "dotenv"

import { resolve } from "path"
dotenvConfig({ path: resolve(__dirname, "./.env") })

const chainIds = {
  ganache: 1337,
  goerli: 5,
  hardhat: 31337,
  kovan: 42,
  mainnet: 1,
  rinkeby: 4,
  ropsten: 3,
}

const MNEMONIC = process.env.MNEMONIC || "write scrap camera leave dune title flower anxiety tissue script cheese glance"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""
const INFURA_API_KEY = process.env.INFURA_API_KEY || ""
const ALCHEMY_KEY = process.env.ALCHEMY_KEY || ""
const PRIVATE_KEY1 = process.env.PRIVATE_KEY1 || "0xc5a39b38123da0c0937339b3fd8d3eebd079e2ab016e1ce6f26fca1ce3aef57d"
const PRIVATE_KEY2 = process.env.PRIVATE_KEY2 || ""
const PRIVATE_KEY3 = process.env.PRIVATE_KEY3 || ""
const PRIVATE_KEY4 = process.env.PRIVATE_KEY4 || ""
const PRIVATE_KEY5 = process.env.PRIVATE_KEY5 || ""

function createTestnetConfig(network: keyof typeof chainIds): NetworkUserConfig {
  const url: string = "https://" + network + ".infura.io/v3/" + INFURA_API_KEY
  return {
    accounts: {
      count: 10,
      initialIndex: 0,
      mnemonic: MNEMONIC,
      path: "m/44'/60'/0'/0",
    },
    chainId: chainIds[network],
    url,
  }
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    currency: "USD",
    enabled: process.env.REPORT_GAS == "true" ?? false,
    gasPrice: 100,
  },
  networks: {
    goerli: {
      accounts: [PRIVATE_KEY1],
      url: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
    },
    hardhat: {
      accounts: {
        mnemonic: MNEMONIC,
      },
      chainId: chainIds.hardhat,
    },
    hyperspace: {
      accounts: [PRIVATE_KEY1],
      chainId: 3141,
      url: "https://api.hyperspace.node.glif.io/rpc/v1",
    },
    // mainnet: createTestnetConfig("mainnet"),
    // goerli: createTestnetConfig("goerli"),
    // kovan: createTestnetConfig("kovan"),
    // rinkeby: createTestnetConfig("rinkeby"),
    // ropsten: createTestnetConfig("ropsten"),
  },
  solidity: {
    compilers: [
      {
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
        version: "0.8.17",
      },
    ],
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
}

export default config
