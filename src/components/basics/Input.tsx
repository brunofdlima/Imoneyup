import React from 'react';

import { Eye, EyeSlash } from 'phosphor-react';

interface Props {
  noRing?: boolean;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

export const Input: React.FC<InputProps> = ({ type, disabled, noRing, className, ...rest }) => {
  const [passwordIsVisible, setPasswordIsVisible] = React.useState<boolean>(false);

  const changePasswordVisibility = () => {
    setPasswordIsVisible((old) => !old);
  };

  return (
    <div className={`relative ${type === 'checkbox' ? 'h-4 w-4' : 'w-full'}`}>
      <input
        {...rest}
        type={passwordIsVisible ? 'text' : type}
        disabled={disabled}
        className={`${type === 'checkbox' ? 'h-4 w-4' : 'h-fit w-full'} ${
          disabled && 'cursor-not-allowed'
        } bg-[#E0E0E0] rounded p-3 outline-none focus:bg-white ${
          !noRing && 'focus:ring-1'
        } focus:ring-[#0010AA] transition ${className}`}
      />
      {type === 'password' && (
        <button
          onClick={changePasswordVisibility}
          disabled={disabled}
          className={`${
            disabled && 'cursor-not-allowed'
          } absolute right-4 top-[calc(50%-0.625rem)]`}
        >
          {passwordIsVisible ? <Eye fontSize={20} /> : <EyeSlash fontSize={20} />}
        </button>
      )}
    </div>
  );
};
