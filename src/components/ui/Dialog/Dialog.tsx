import Modal from 'react-modal'
import classNames from 'classnames'
import CloseButton from '../CloseButton'
import { motion } from 'framer-motion'
import useWindowSize from '../hooks/useWindowSize'
import type ReactModal from 'react-modal'
import type { MouseEvent } from 'react'

export interface DialogProps extends ReactModal.Props {
    closable?: boolean
    contentClassName?: string
    height?: string | number
    onClose?: (e: MouseEvent<HTMLSpanElement>) => void
    width?: number
}

const Dialog = (props: DialogProps) => {
    const currentSize = useWindowSize()

    const {
        bodyOpenClassName,
        children,
        className,
        closable = true,
        closeTimeoutMS = 150,
        contentClassName,
        height,
        isOpen,
        onClose,
        overlayClassName,
        portalClassName,
        style,
        width = 520,
        ...rest
    } = props

    const onCloseClick = (e: MouseEvent<HTMLSpanElement>) => {
        onClose?.(e)
    }

    const renderCloseButton = (
        <CloseButton
            absolute
            className="ltr:right-6 rtl:left-6 top-4.5"
            onClick={onCloseClick}
        />
    )

    const contentStyle: any = {
        ...style,
    }

    if (width !== undefined) {
        contentStyle.width = width

        if (
            typeof currentSize.width !== 'undefined' &&
            currentSize.width <= width
        ) {
            contentStyle.width = 'auto'
        }
    }

    if (height !== undefined) {
        contentStyle.height = height
    }

    const defaultDialogContentClass = 'dialog-content bg-base shadow-neo rounded-3xl pointer-events-auto p-6 relative'

    const dialogClass = classNames(defaultDialogContentClass, contentClassName)

    return (
        <Modal
            className={{
                base: classNames('fixed inset-0 z-50 flex items-center justify-center outline-none pointer-events-none', className as string),
                afterOpen: '',
                beforeClose: '',
            }}
            overlayClassName={{
                base: classNames('fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm transition-opacity duration-150 opacity-0', overlayClassName as string),
                afterOpen: 'opacity-100',
                beforeClose: 'opacity-0',
            }}
            portalClassName={classNames('dialog-portal', portalClassName)}
            bodyOpenClassName={classNames('overflow-hidden', bodyOpenClassName)}
            ariaHideApp={false}
            isOpen={isOpen}
            closeTimeoutMS={closeTimeoutMS}
            {...rest}
        >
            <motion.div
                className={dialogClass}
                style={contentStyle}
                initial={{ transform: 'scale(0.9)' }}
                animate={{
                    transform: isOpen ? 'scale(1)' : 'scale(0.9)',
                }}
            >
                {closable && renderCloseButton}
                {children}
            </motion.div>
        </Modal>
    )
}

Dialog.displayName = 'Dialog'

export default Dialog
