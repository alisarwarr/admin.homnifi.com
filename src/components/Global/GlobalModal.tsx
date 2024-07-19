import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from '@nextui-org/modal';

interface GlobalModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  children?: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full' | undefined;
  noHeader?: boolean;
  hideCloseButton?: boolean;
  childrenClass?: string;
  scrollBehavior?: 'normal' | 'inside' | 'outside';
}

const GlobalModal: React.FC<GlobalModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size,
  noHeader,
  hideCloseButton,
  childrenClass,
  scrollBehavior,
}) => {
  const { onOpen } = useDisclosure();

  const handleOpen = (size: string) => {
    onOpen();
  };

  return (
    <>
      <Modal
        hideCloseButton={hideCloseButton}
        backdrop="blur"
        size={size}
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior={scrollBehavior || 'inside'}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: 'easeOut',
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: 'easeIn',
              },
            },
          },
        }}
        classNames={{
          backdrop: 'bg-[#292f46]/50 backdrop-opacity-40',
        }}
      >
        <ModalContent className="bg-white rounded-lg border">
          <>
            {!noHeader ? <ModalHeader className="flex flex-col gap-1 font-medium ">{title}</ModalHeader> : ''}

            <ModalBody className={childrenClass}>{children}</ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GlobalModal;
