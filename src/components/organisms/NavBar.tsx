import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"

import { routes } from "@/consts/routes"

import CloseMenu from "public/images/icons/close-menu.svg"
import AlkimiyaLogo from "public/images/icons/logo-symbol.svg"
import AlkimiyaLogoText from "public/images/icons/logo-text.svg"

export const NavBar = () => {
  const { pathname } = useRouter()
  const [isOpen, setIsOpen] = useState(true)
  const isCurrentRouteActive = useCallback(
    (route: string): boolean => pathname.includes(route),
    [pathname]
  )
  return (
    <div className={
      `${isOpen ? "max-w-[240px] min-w-[240px]" : "max-w-[84px] min-w-[84px]"}
      z-20`
    }>
      <div className={
        `${isOpen ? "max-w-[240px] min-w-[240px]" : "max-w-[84px] min-w-[84px]"}
        transition-width duration-200 ease-in-out overflow-hidden
        h-screen bg-ak-blue-500 select-none`
      }>
        <div
          className="flex flex-col pt-8 h-screen max-w-[240px] min-w-[240px]"
        >
          <Link
            className="shrink-0 flex items-center space-x-1 px-7 h-11"
            href="/"
          >
            <Image
              alt="Alkimiya Logo"
              height={28}
              src={AlkimiyaLogo}
              width={28}
            />
            {isOpen ? (
              <Image
                alt="Alkimiya Logo Text"
                className="pt-1"
                height={26}
                src={AlkimiyaLogoText}
                width={96}
              />
            ) : (
              ""
            )}
          </Link>
          <nav className="my-4 sm:mt-16 shrink-0">
            {routes.map(({ title, route, icon }, i) => (
              <Link
                className={`block py-2.5 px-7 flex items-center h-11 ${
                  isCurrentRouteActive(route)
                    ? "border-l-2 pl-[26px] border-black"
                    : "grayscale"
                }`}
                href={route}
                key={`navlink_${i}`}
              >
                {icon}
                {isOpen && title}
              </Link>
            ))}
          </nav>
          <div
            className={
              "mb-6 px-7 flex items-center cursor-pointer h-11 mt-auto shrink-0"
            }
            onClick={() => setIsOpen(!isOpen)}
          >
            <Image
              alt={isOpen ? "Open Menu" : "Close Menu"}
              className={`mx-1 sidebar-icon ${isOpen ? "" : "scale-x-[-1]"}`}
              height={16}
              src={CloseMenu}
              width={16}
            />
            {isOpen && <p>Hide Menu</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
export default NavBar
