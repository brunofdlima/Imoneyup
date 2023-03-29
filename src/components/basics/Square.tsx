import React from 'react';

interface Props {
  type?: 'large' | 'small';
}

type SquareProps = JSX.IntrinsicElements['div'] & Props;

export const Square: React.FC<SquareProps> = ({ type, className, ...rest }) => {
  if (type === 'small') {
    return (
      <div {...rest} className={`h-[1.25rem] w-[1.25rem] bg-[#0050aa] opacity-50 ${className}`} />
    );
  }

  return <div {...rest} className={`h-[3.125rem] w-[3.125rem] bg-[#003060] ${className}`} />;
};
