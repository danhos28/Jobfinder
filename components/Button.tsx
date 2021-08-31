/* eslint-disable react/button-has-type */
/* eslint-disable react/require-default-props */
// eslint-disable-next-line no-use-before-define
import React from 'react';

interface IProps {
  children: React.ReactNode;
  variant: string;
  type?: 'submit' | 'reset' | 'button';
}

interface IVariants {
  [index: string]: string;
  red: string;
  blue: string;
  green: string;
}

const Button = (props: IProps) => {
  const { children, variant, type = 'button' } = props;

  const variants: IVariants = {
    red: 'bg-red-500 text-gray-50 hover:bg-red-600',
    green: 'bg-green-500 text-gray-50 hover:bg-green-600',
    blue: 'bg-blue-500 text-gray-50 hover:bg-blue-600',
  };

  const pickedVariant: string = variants[variant];

  return (
    <button
      type={type}
      className={`rounded-md py-3 px-6 ${pickedVariant} transition-all ease-in-out duration-200 cursor-pointer`}
    >
      {children}
    </button>
  );
};

export default Button;
