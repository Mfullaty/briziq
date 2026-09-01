import classNames from 'classnames'
import Modal from 'react-modal'
import CloseButton from '../CloseButton'
import { motion } from 'framer-motion'
import type ReactModal from 'react-modal'
import type { MouseEvent, ReactNode } from 'react'

export interface DrawerProps extends ReactModal.Props {
    bodyClass?: string
    closable?: boolean
    footer?: string | ReactNode
    footerClass?: string
    headerClass?: string
    height?: string | number
    lockScroll?: boolean
    onClose?: (e: MouseEvent<HTMLSpanElement>) => void
    placement?: 'top' | 'right' | 'bottom' | 'left'
    showBackdrop?: boolean
    title?: string | ReactNode
    width?: string | number
}

const Drawer = (props: DrawerProps) => {
    const {
        bodyOpenClassName,
        bodyClass,
        children,
        className,
        closable = true,
        closeTimeoutMS = 300,
        footer,
        footerClass,
        headerClass,
        height = 400,
        isOpen,
        lockScroll = true,
        onClose,
        overlayClassName,
        placement = 'right',
        portalClassName,
        showBackdrop = true,
        title,
        width = 400,
        ...rest
    } = props

    const onCloseClick = (e: MouseEvent<HTMLSpanElement>) => {
        onClose?.(e)
    }

    const renderCloseButton = <CloseButton onClick={onCloseClick} />

    const getStyle = (): {
        dimensionClass?: string
        contentStyle?: any
        motionStyle: any
    } => {
        if (placement === 'left' || placement === 'right') {
            return {
                dimensionClass: `h-full absolute top-0 ${placement === 'right' ? 'right-0' : 'left-0'}`,
                contentStyle: { width },
                motionStyle: {
                    x: placement === 'right' ? '100%' : '-100%',
                    y: 0,
                },
            }
        }

        if (placement === 'top' || placement === 'bottom') {
            return {
                dimensionClass: `w-full absolute left-0 ${placement === 'bottom' ? 'bottom-0' : 'top-0'}`,
                contentStyle: { height },
                motionStyle: {
                    x: 0,
                    y: placement === 'bottom' ? '100%' : '-100%',
                },
            }
        }

        return {
            motionStyle: { x: 0, y: 0 },
        }
    }

    const { dimensionClass, contentStyle, motionStyle } = getStyle()

    return (
        <Modal
            className={{
                base: classNames('fixed inset-0 z-50 outline-none pointer-events-none', className as string),
                afterOpen: '',
                beforeClose: '',
            }}
            overlayClassName={{
                base: classNames(
                    'fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300 opacity-0',
                    overlayClassName as string,
                    !showBackdrop && 'bg-transparent',
                ),
                afterOpen: 'opacity-100',
                beforeClose: 'opacity-0',
            }}
            portalClassName={classNames('drawer-portal', portalClassName)}
            bodyOpenClassName={classNames(
                'overflow-hidden',
                lockScroll && 'drawer-lock-scroll',
                bodyOpenClassName,
            )}
            ariaHideApp={false}
            isOpen={isOpen}
            closeTimeoutMS={closeTimeoutMS}
            {...rest}
        >
            <motion.div
                className={classNames('bg-base shadow-neo pointer-events-auto flex flex-col', dimensionClass)}
                style={contentStyle}
                initial={motionStyle}
                animate={{
                    x: isOpen ? 0 : motionStyle.x,
                    y: isOpen ? 0 : motionStyle.y,
                }}
                transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
            >
                {title || closable ? (
                    <div className={classNames('flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700', headerClass)}>
                        {typeof title === 'string' ? (
                            <h4 className="text-lg font-semibold">{title}</h4>
                        ) : (
                            <span>{title}</span>
                        )}
                        {closable && renderCloseButton}
                    </div>
                ) : null}
                <div className={classNames('flex-1 overflow-y-auto p-4', bodyClass)}>
                    {children}
                </div>
                {footer && (
                    <div className={classNames('p-4 border-t border-gray-200 dark:border-gray-700', footerClass)}>
                        {footer}
                    </div>
                )}
            </motion.div>
        </Modal>
    )
}

Drawer.displayName = 'Drawer'

export default Drawer
