import { twMerge } from 'tailwind-merge'

// import type { MouseEventHandler } from 'react'

type BadgeProps = {
  className?: string;
  state: number,
};
export const Badge = ({ state, className }: BadgeProps) => {
  const getColor = (state) => {
    let color = ''
    if (state === 1) {
      color = 'bg-yellow-500'
    } else if (state === 2) {
      color = 'bg-snapshot-green'
    }
    return color
  }
  const getLabel = (state) => {
    let label = ''
    if (state === 1) {
      label = 'Needs Second'
    } else if (state === 2) {
      label = 'Discussion'
    }
    return label
  }
  
  return (
    <div className={twMerge(`rounded-2xl flex justify-center px-3 py-1 ${getColor(state)}`, className)}>
      <span className='text-sm'>{getLabel(state)}</span>
    </div>
  )
}