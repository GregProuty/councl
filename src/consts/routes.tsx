import Image from "next/image"

import HashvaultIcon from "public/images/icons/hashvault-icon.svg"
import HelpIcon from "public/images/icons/help-icon.svg"
import PortfolioIcon from "public/images/icons/portfolio-icon.svg"
import SellHashPowerIcon from "public/images/icons/sell-hashpower-icon.svg"

export const routes = [
  {
    icon: <Image
      alt="Silica Market"
      className="sidebar-icon"
      height={16}
      src={SellHashPowerIcon}
      width={16}
    />,
    route: "/market",
    title: "Silica Market",
  },
  {
    icon: <Image
      alt="Portfolio"
      className="sidebar-icon"
      height={16}
      src={PortfolioIcon}
      width={16}
    />,
    route: "/portfolio",
    title: "Portfolio",
  },
  {
    icon: <Image
      alt="Silica Vault"
      className="sidebar-icon"
      height={16}
      src={HashvaultIcon}
      width={16}
    />,
    route: "/silica-vault",
    title: "Silica Vault",
  },
  {
    icon: <Image
      alt="Faucet"
      className="sidebar-icon"
      height={16}
      src={HelpIcon}
      width={16}
    />,
    route: "/faucet",
    title: "Faucet",
  },
]
