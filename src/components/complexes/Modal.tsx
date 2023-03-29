import React from 'react';

import ReactDOM from 'react-dom';

import { Button, Text } from '~/components/basics';

import { X } from 'phosphor-react';

interface Props {
  title?: string;
  closeModal(): void;
}

type ModalProps = JSX.IntrinsicElements['div'] & Props;

export const Modal: React.FC<ModalProps> = ({ title, closeModal, children, ...rest }) => {
  const modalContentRef = React.useRef<any>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalContentRef, closeModal]);

  return ReactDOM.createPortal(
    <div
      {...rest}
      className='absolute inset-0 flex items-center justify-center cursor-auto'
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
    >
      <div ref={modalContentRef} className='h-fit w-fit min-w-[50rem] bg-white py-10 px-16 rounded'>
        <div className='flex items-center justify-between'>
          <Text large className='font-bold'>
            {title}
          </Text>
          <Button className='rounded-full p-2 hover:bg-[#eeeeee]' onClick={closeModal}>
            <X weight='bold' />
          </Button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
};
