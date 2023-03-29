import React from 'react';

type DescriptionProps = JSX.IntrinsicElements['p'];

export const Description: React.FC<DescriptionProps> = ({ className, children, ...rest }) => {
  return (
    <p {...rest} className={`text-xs opacity-70 ${className}`}>
      {children}
    </p>
  );
};
