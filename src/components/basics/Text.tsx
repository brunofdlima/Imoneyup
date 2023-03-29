import React from 'react';

interface Props {
  large?: boolean;
}

type TextProps = JSX.IntrinsicElements['p'] & Props;

export const Text: React.FC<TextProps> = ({ large, className, children, ...rest }) => {
  return (
    <p {...rest} className={`${large ? 'text-2xl font-medium' : 'text-[0.875rem]'} ${className}`}>
      {children}
    </p>
  );
};
