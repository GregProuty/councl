import { twMerge } from 'tailwind-merge'

// import type { MouseEventHandler } from 'react'

type AddButtonProps = {
  className?: string;
  onClick: () => void;
};

const AddButton = ({ onClick, className }: AddButtonProps) => (
  <button
    className={twMerge(
      `min-w-[30px] min-h-[30px] px-[3px] py-[1px] rounded-full flex justify-center items-center
      hover:bg-ak-blue-700 bg-aragon-light-blue border border-aragon-dark-blue shadow text-black
        transition-colors duration-300 ease-in-out
        `,
      className
    )}
    onClick={onClick}
  >
    <span className='text-center text-white font-bold'>
      +
    </span>
  </button>
)

export default AddButton