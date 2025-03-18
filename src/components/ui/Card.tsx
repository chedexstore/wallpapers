import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

const Card: React.FC<CardProps> = ({ title, description, children, className, ...props }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`} {...props}>
      {children}
      {(title || description) && (
        <div className="p-4">
          {title && <h3 className="text-lg font-bold">{title}</h3>}
          {description && <p className="text-gray-600">{description}</p>}
        </div>
      )}
    </div>
  );
};

export default Card;