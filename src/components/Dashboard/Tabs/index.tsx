import React from 'react';

function Tabs({
  label,
  classNames,
  onClick,
  activeTab = false,
}: {
  label: string;
  classNames?: string;
  onClick?: any;
  activeTab: boolean;
}) {
  return (
    <>
      <button
        className={`flex cursor-pointer bg-white px-8 text-gray-400 border rounded-md items-center font-normal justify-center py-2 relative overflow-hidden outline-none
         text-xs md:text-base whitespace-nowrap ${
           activeTab ? 'bg-[#1B9FDA1A] text-[#1B9FDA] border-[#1B9FDA]' : ''
         } ${classNames}
        `}
        type={'button'}
        onClick={onClick}
      >
        {label}
      </button>
    </>
  );
}

export default Tabs;
