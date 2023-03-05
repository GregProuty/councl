import { twMerge } from 'tailwind-merge'

type SentimentBadgeProps = {
  className?: string;
  label: string,
};
const SentimentBadge = ({ label, className }: SentimentBadgeProps) => {
  const getColor = (label) => {
    let color = ''
    if (label === 'support') {
      color = 'bg-snapshot-green'
    } else if (label === 'opposition') {
      color = 'bg-red-500'
    } else if (label === 'neutral' || label === 'information') {
      color = 'bg-gray-500'
    } else if (label === 'question') {
      color = 'bg-purple-500'
    }
    return color
  }
  return (
    <div className={twMerge(`rounded-2xl flex justify-center px-3 py-1 ${getColor(label)}`, className)}>
      <span className='text-sm'>{label}</span>
    </div>
  )
}

export default SentimentBadge