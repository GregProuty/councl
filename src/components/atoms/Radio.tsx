import { twMerge } from "tailwind-merge"

interface RadioProps {
  checked: boolean,
  className: string,
  onClick: () => void
}

const Radio = ({ className, checked, onClick }: RadioProps) => (
  <div
    className={twMerge(`flex justify-center items-center`, className)}
    onClick={onClick}
  >
    <button
      className={`w-4 h-4 rounded-full border ${
        checked ? "bg-gray-700" : "bg-white"
      }`}
    />
    <div
      className={`w-[4px] h-[4px] z-10 rounded-full bg-white -ml-[10px] cursor-pointer`}
    />
  </div>
)

export default Radio
