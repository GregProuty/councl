import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"

import { routes } from "@/consts/routes"

import CloseMenu from "public/images/icons/close-menu.svg"
import CouncilLogo from "public/images/icons/council-logo.png"

export const NavBar = () => {
  const { pathname } = useRouter()
  const [isOpen, setIsOpen] = useState(true)
  const isCurrentRouteActive = useCallback(
    (route: string): boolean => pathname.includes(route),
    [pathname]
  )
  return (
    <div className={
      `${isOpen ? "max-w-[200px] min-w-[200px]" : "max-w-[84px] min-w-[84px]"}
      z-10 `
    }>
      <div className={
        `${isOpen ? "max-w-[200px] min-w-[200px]" : "max-w-[84px] min-w-[84px]"}
        transition-width duration-200 ease-in-out overflow-hidden
        h-screen bg-aragon-blue select-none`
      }>
        <div
          className="flex flex-col h-screen max-w-[200px] min-w-[200px]"
        >
          <Link
            className="shrink-0 flex items-center space-x-1 px-5 h-11"
            href="/"
          >
            <Image
              alt="Council Logo"
              height={40}
              src={CouncilLogo}
              width={40}
            />
            {isOpen ? (
              <span className='text-2xl font-semibold'>Council</span>
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
