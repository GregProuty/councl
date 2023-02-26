import { twMerge } from 'tailwind-merge'

import type { MouseEventHandler } from 'react'

type ButtonProps = {
  className?: string;
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};
export const Button = ({ label, onClick, className }: ButtonProps) => (
  <button
    className={twMerge(
      `w-auto min-h-[48px] mt-3 py-2 px-3 
        rounded-tr-lg rounded-bl-lg 
        hover:bg-ak-blue-400 bg-ak-blue-500 text-black
        transition-colors duration-300 ease-in-out
        `,
      className
    )}
    onClick={onClick}
  >
    {label}
  </button>
)
