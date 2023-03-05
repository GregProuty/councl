import { twMerge } from 'tailwind-merge'

// import type { MouseEventHandler } from 'react'

type BadgeProps = {
  className?: string;
  passed?: boolean,
  state: number
};
export const Badge = ({ state, className, passed }: BadgeProps) => {
  console.log('state', state)
  const getColor = (state) => {
    let color = ''
    if (passed) return 'bg-snapshot-green'
    if (state === 1) {
      color = 'bg-yellow-500'
    } else if (state === 2) {
      color = 'bg-snapshot-green'
    } else if (state === 3) {
      color = 'bg-yellow-500'
    } else if (state === 4) {
      color = 'bg-yellow-500'
    } else if (state === 7) {
      color = 'bg-snapshot-green'
    }
    return color
  }
  const getLabel = (state) => {
    let label = ''
    if (passed) return 'Vote Passed'
    if (state === 1) {
      label = 'Needs Second'
    } else if (state === 2) {
      label = 'Discussion'
    } else if (state === 3) {
      label = 'Ammendment Pending'
    } else if (state === 4) {
      label = 'Move to vote Pending'
    } else if (state === 7) {
      label = 'Vote pending'
    }
    
    return label
  }
  
  return (
    <div className={twMerge(`rounded-2xl flex justify-center px-3 py-1 ${getColor(state)}`, className)}>
      <span className='text-sm'>{getLabel(state)}</span>
    </div>
  )
}