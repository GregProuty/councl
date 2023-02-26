import { twMerge } from "tailwind-merge"

export interface SkeletonProps {
  className?: string
}

/** One skeleton that can be styled */
export const Skeleton = ({ className }: SkeletonProps) => (
  <div
    className={twMerge(`h-6 w-full py-1 ${className}`)}
    style={{
      animationDelay: "150ms",
      animationFillMode: "backwards",
    }}
  >
    <div className="h-full bg-gray-200 rounded shimmer" />
  </div>
)

export interface SkeletonsProps {
  className?: string,
  n: number,
  skeletonClassName?: string
}

/** n copies of a skeleton with the same style */
export const Skeletons = (
  { n , className, skeletonClassName }: SkeletonsProps
) => (
  <div className={className}>
    {[...Array(n)].map((_, i) => (
      <Skeleton className={skeletonClassName} key={i} />
    ))}
  </div>
)

export interface SkeletonGroupProps {
  className?: string
  skeletonClassName?: string
  skeletonClassNames: string[]
}

/** A group of skeletons with different styles. */
export const SkeletonGroup = (
  { className, skeletonClassName, skeletonClassNames }: SkeletonGroupProps
) => (
  <div className={className}>
    {skeletonClassNames.map((cls, i) => (
      <Skeleton className={twMerge(`${skeletonClassName} ${cls}`)} key={i} />
    ))}
  </div>
)

export interface SkeletonGroupsProps {
  className?: string
  groupClassName?: string
  n: number
  skeletonClassName?: string
  skeletonClassNames: string[]
}

/** n copies of same-styled groups of different-styled skeletons */
export const SkeletonGroups = ({
  className,
  groupClassName,
  n,
  skeletonClassName,
  skeletonClassNames,
}: SkeletonGroupsProps) => (
  <div className={className}>
    {[...Array(n)].map((_, i) => (
      <SkeletonGroup
        className={groupClassName}
        key={i}
        skeletonClassName={skeletonClassName}
        skeletonClassNames={skeletonClassNames}
      />
    ))}
  </div>
)
