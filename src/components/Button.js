import React from "react";

const Button = ({ buttonText, type = 'primary' }) => {
  const buttonClasses = type === 'primary' ? 'bg-black text-white hover:bg-white hover:text-black' : 'bg-red-500 text-white';

  return (
    <button className={`inline-block px-4 py-2 rounded-md ${buttonClasses}
    `}>
      {buttonText}
    </button>
  );
};

export default Button;
