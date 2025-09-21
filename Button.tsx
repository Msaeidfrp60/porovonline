import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  const baseClasses = "px-8 py-3 font-bold rounded-lg text-lg transition-all duration-300 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 shadow-lg hover:shadow-xl";

  const primaryClasses = "bg-gradient-to-r from-purple-600 to-indigo-600 text-white focus:ring-indigo-300";
  const secondaryClasses = "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300";
  const outlineClasses = "bg-white text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50 focus:ring-indigo-200 shadow-md";

  let variantClasses = '';
  switch (variant) {
    case 'primary':
      variantClasses = primaryClasses;
      break;
    case 'secondary':
      variantClasses = secondaryClasses;
      break;
    case 'outline':
        variantClasses = outlineClasses;
        break;
    default:
        variantClasses = primaryClasses;
  }

  return (
    <button className={`${baseClasses} ${variantClasses}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
