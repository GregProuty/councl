import * as Dialog from "@radix-ui/react-dialog"
import Image from "next/image"

import { twMerge } from "tailwind-merge"

import XIcon from "public/images/icons/x.svg"

interface ModalProps {
  children: JSX.Element | JSX.Element[],
  className?: string,
  open: boolean,
  title?: string,
  toggleOpen: () => void
}

const Modal = ({
  open,
  toggleOpen,
  title,
  className,
  children,
}: ModalProps) => (
  <Dialog.Root onOpenChange={toggleOpen} open={open}>
    <Dialog.Portal>
      <Dialog.Overlay className='inset-0 bg-black bg-opacity-50
                                animate-fade-in fixed flex justify-center items-center z-30'>
        <Dialog.Content
          className={twMerge(
            `bg-white rounded p-4 pt-4 w-96 h-96 overflow-y-auto modal-max-height`,
            className
          )}
        >
          <div className='w-full flex justify-between border-b pb-2 mb-3 border-black'>
            <h1 className='text-2xl'>{title}</h1>
            <Dialog.Close>
              <Image alt='X' className='hover:opacity-50' src={XIcon} />
            </Dialog.Close>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  </Dialog.Root>
)

export default Modal
