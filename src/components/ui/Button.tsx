import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'destructive' | 'ghost';
}

const Button: React.FC<ButtonProps> = ({ variant = 'default', children, className, ...props }) => {
  const baseStyles = 'px-4 py-2 rounded-md font-medium transition-colors flex items-center justify-center';
  const variantStyles = {
    default: 'bg-blue-500 text-white hover:bg-blue-600',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
    destructive: 'bg-red-500 text-white hover:bg-red-600',
    ghost: 'text-gray-800 hover:bg-gray-100',
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;