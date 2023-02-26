import { twMerge } from "tailwind-merge"
interface ProgressBarProps {
  backgroundColor?: string,
  foregroundColor?: string,
  progressPercentage: number
}
export const ProgressBar = (
  {
    progressPercentage,
    backgroundColor = 'ak-yellow-500',
    foregroundColor = 'ak-yellow-300',
  }: ProgressBarProps
) => (
  <div className="py-1 w-full">
    <div className={twMerge('flex h-[4px] rounded', `bg-${backgroundColor}`)}>
      <div
        className={twMerge('rounded', `bg-${foregroundColor}`)}
        style={{ width: `${progressPercentage}%` }}
      />
    </div>

  </div>
)