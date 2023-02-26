import React from 'react'

interface TabSwitchProps {
  className?: string,
  clicked?: boolean,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
  style?: React.CSSProperties,
  tabs: [string, string]
}

const TabSwitch = ({
  style,
  className,
  onClick,
  clicked = true,
  tabs,
}: TabSwitchProps) => (
  <div
    className={`group relative w-64 h-[2.6rem] border
                innerShadow themeRounded flex ${className}`}
    style={{ ...style }}
  >
    <span
      className={`absolute select-none w-1/2 cursor-pointer
                flex h-full z-10 justify-center items-center`}
      onClick={onClick}
    >
      {tabs[0]}
    </span>
    <span
      className={`${
        clicked ? "transitionRight" : "transitionLeft"
      } themeRounded absolute z-auto bg-ak-blue-500 group-hover:bg-ak-blue-400
        shadow-sm w-1/2 h-[2.5rem] flex justify-center items-center
      `}
    />
    <span
      className={`absolute select-none w-1/2 cursor-pointer
                flex h-full z-10 justify-center items-center right-0`}
      onClick={onClick}
    >
      {tabs[1]}
    </span>
  </div>
)

export default TabSwitch
