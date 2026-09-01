import classNames from '@/utils/classNames'
import { SIZES } from '../utils/constants'
import type { CommonProps } from '../@types/common'

interface LineProps extends CommonProps {
    percent: number
    strokeColor?: string
    trailClass?: string
    size?: 'sm' | 'md'
}

const Line = (props: LineProps) => {
    const { percent, size, children, strokeColor, trailClass } = props

    const progressBackgroundClass = classNames(
        'progress-bg rounded-full shadow-neo transition-all duration-300',
        size === SIZES.SM ? 'h-1.5' : 'h-2',
        strokeColor,
    )

    return (
        <>
            <div className="progress-wrapper flex items-center w-full">
                <div className={classNames('progress-inner w-full bg-base shadow-neo-inner rounded-full overflow-hidden', trailClass)}>
                    <div
                        className={progressBackgroundClass}
                        style={{ width: `${percent}%` }}
                    />
                </div>
            </div>
            {children}
        </>
    )
}

Line.displayName = 'ProgressLine'

export default Line
