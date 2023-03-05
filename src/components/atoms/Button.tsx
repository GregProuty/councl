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
      `btn cursor-pointer bg-aragon-light-blue`,
      className
    )}
    onClick={onClick}
  >
    {label}
  </button>
)
