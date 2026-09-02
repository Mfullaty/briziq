import classNames from 'classnames'
import Modal from 'react-modal'
import CloseButton from '../CloseButton'
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
        translateClosedClass: string
    } => {
        if (placement === 'left') {
            return {
                dimensionClass: 'h-full absolute top-0 left-0',
                contentStyle: { width },
                translateClosedClass: '-translate-x-full translate-y-0',
            }
        }
        if (placement === 'right') {
            return {
                dimensionClass: 'h-full absolute top-0 right-0',
                contentStyle: { width },
                translateClosedClass: 'translate-x-full translate-y-0',
            }
        }
        if (placement === 'top') {
            return {
                dimensionClass: 'w-full absolute left-0 top-0',
                contentStyle: { height },
                translateClosedClass: 'translate-x-0 -translate-y-full',
            }
        }
        // placement === 'bottom'
        return {
            dimensionClass: 'w-full absolute left-0 bottom-0',
            contentStyle: { height },
            translateClosedClass: 'translate-x-0 translate-y-full',
        }
    }

    const { dimensionClass, contentStyle, translateClosedClass } = getStyle()

    return (
        <Modal
            className={{
                base: classNames(
                    'bg-base shadow-neo pointer-events-auto flex flex-col',
                    'fixed z-50 outline-none transition-transform duration-300 ease-out',
                    dimensionClass,
                    translateClosedClass, // Start closed initially
                    className as string
                ),
                afterOpen: 'translate-x-0! translate-y-0!', // Override initial state with open state
                beforeClose: translateClosedClass,
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
            style={{
                content: contentStyle,
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
        </Modal>
    )
}

Drawer.displayName = 'Drawer'

export default Drawer
