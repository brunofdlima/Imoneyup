import React from 'react';

interface Props {
  variant?: 'auth' | 'link' | 'navbar' | 'rankingbox' | 'add' | 'confirm' | 'delete' | 'default';
  selected?: boolean;
}

type ButtonProps = JSX.IntrinsicElements['button'] & Props;

export const Button: React.FC<ButtonProps> = ({
  variant,
  selected,
  className,
  children,
  ...rest
}) => {
  const baseButtonStyles = React.useMemo(() => 'flex items-center transition', []);

  const buttonStyles = React.useMemo(() => {
    if (variant === 'auth') {
      return 'w-full justify-center rounded shadow py-3 px-5 text-center text-white bg-[#0050AA] hover:bg-[#0060BB]';
    }
    if (variant === 'link') {
      return 'w-fit text-[0.875rem] text-[#0050AA] hover:text-[#0060BB]';
    }
    if (variant === 'navbar') {
      return `w-full justify-start gap-5 py-3 px-5 hover:bg-white hover:text-[#003060] ${
        selected ? 'bg-white text-[#003060]' : 'bg-[#003060] text-white'
      }`;
    }
    if (variant === 'rankingbox') {
      return `w-1/2 py-1 px-2 justify-center ${selected ? 'border-b-white' : 'border-none'}`;
    }
    if (variant === 'add') {
      return `py-1 px-4 rounded-full bg-white text-[#0050AA] border border-[#0050AA] disabled:cursor-not-allowed disabled:bg-white disabled:text-[#0050AA] hover:text-white hover:bg-[#0050AA]`;
    }
    if (variant === 'confirm') {
      return `w-fit rounded shadow py-2 px-4 text-white bg-[#00AA50] hover:bg-[#00BB60]`;
    }
    if (variant === 'delete') {
      return `w-fit rounded shadow py-2 px-4 text-white bg-[#cc3333] hover:bg-[#cc4444]`;
    }
    return 'justify-center';
  }, [variant, selected]);

  return (
    <button {...rest} className={`${baseButtonStyles} ${buttonStyles} ${className}`}>
      {children}
    </button>
  );
};
