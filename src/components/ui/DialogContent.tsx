import React from 'react';

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

const DialogContent: React.FC<DialogContentProps> = ({ children, className }) => {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
};

export default DialogContent;