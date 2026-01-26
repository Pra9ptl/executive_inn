import React, { useState } from 'react';
import { Button } from '@mui/joy';
import Booking from './Booking';

interface BookingModalProps {
  triggerText?: string;
  preselectedRoom?: string;
  variant?: 'solid' | 'soft' | 'outlined' | 'plain';
  size?: 'sm' | 'md' | 'lg';
  sx?: any;
  children?: React.ReactNode;
}

const BookingModal: React.FC<BookingModalProps> = ({
  triggerText = 'Book Now',
  preselectedRoom = '',
  variant = 'solid',
  size = 'md',
  sx,
  children
}) => {
  const [open, setOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0);

  const handleOpen = () => {
    setModalKey(prev => prev + 1); // Increment key to force remount
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      {children ? (
        <div onClick={handleOpen} style={{ cursor: 'pointer' }}>
          {children}
        </div>
      ) : (
        <Button
          onClick={handleOpen}
          variant={variant}
          size={size}
          sx={sx}
        >
          {triggerText}
        </Button>
      )}

      <Booking
        key={modalKey}
        isModal={true}
        open={open}
        onClose={handleClose}
        preselectedRoom={preselectedRoom}
      />
    </>
  );
};

export default BookingModal;