import Image from "next/image"

import HelpIcon from "public/images/icons/help-icon.svg"

export const routes = [
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
  {
    icon: <Image
      alt="Proposal"
      className="sidebar-icon"
      height={16}
      src={HelpIcon}
      width={16}
    />,
    route: "/proposals",
    title: "Proposals",
  },
]
