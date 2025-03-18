import React from 'react';

interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

const DialogTitle: React.FC<DialogTitleProps> = ({ children, className }) => {
  return (
    <h2 className={`text-xl font-bold ${className}`}>
      {children}
    </h2>
  );
};

export default DialogTitle;