import { forwardRef, HTMLAttributes } from 'react'

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  showLabel?: boolean
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, showLabel = false, ...props }, ref) => {
    const percentage = Math.round((value / max) * 100)
    
    return (
      <div ref={ref} className={`w-full ${className || ''}`} {...props}>
        {showLabel && (
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
            <span>Progress</span>
            <span>{percentage}%</span>
          </div>
        )}
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  }
)
Progress.displayName = 'Progress'

export { Progress }