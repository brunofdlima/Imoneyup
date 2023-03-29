import React from 'react';

interface Props {
  variant?: 'modal' | 'default';
}

type SelectProps = JSX.IntrinsicElements['select'] & Props;

export const Select: React.FC<SelectProps> = ({ variant, className, children, ...rest }) => {
  const baseSelectStyles = React.useMemo(
    () =>
      'bg-[#E0E0E0] rounded outline-none focus:bg-white focus:ring-1 focus:ring-[#0010AA] transition',
    [],
  );

  const selectStyles = React.useMemo(() => {
    if (variant === 'modal') {
      return 'w-full p-3';
    }
    return 'w-fit py-1 px-2';
  }, [variant]);

  return (
    <select {...rest} className={`${baseSelectStyles} ${selectStyles} ${className}`}>
      {children}
    </select>
  );
};
