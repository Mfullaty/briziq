import classNames from 'classnames'
import type { CommonProps } from '../@types/common'
import type { ElementType, Ref } from 'react'

export interface SkeletonProps extends CommonProps {
    animation?: boolean
    asElement?: ElementType
    height?: string | number
    ref?: Ref<ElementType>
    variant?: 'block' | 'circle'
    width?: string | number
}

const Skeleton = (props: SkeletonProps) => {
    const {
        animation = true,
        asElement: Component = 'span',
        className,
        height,
        ref,
        style,
        variant = 'block',
        width,
    } = props

    return (
        <Component
            ref={ref}
            className={classNames(
                'skeleton bg-base shadow-neo-inner',
                variant === 'circle' && 'skeleton-circle rounded-full',
                variant === 'block' && 'skeleton-block rounded-2xl',
                animation && 'animate-pulse',
                className,
            )}
            style={{
                width,
                height,
                ...style,
            }}
        />
    )
}

export default Skeleton
