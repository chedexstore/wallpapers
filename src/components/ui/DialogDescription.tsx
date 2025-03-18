import React from 'react';

interface DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const DialogDescription: React.FC<DialogDescriptionProps> = ({ children, className }) => {
  return (
    <p className={`text-gray-600 ${className}`}>
      {children}
    </p>
  );
};

export default DialogDescription;