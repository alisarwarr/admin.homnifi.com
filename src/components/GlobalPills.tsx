import React from 'react';

type Props = {
  status: 'active' | 'inactive';
  pillsClassName?: string;
};

const GlobalPills = ({ status, pillsClassName }: Props) => {
  return (
    <div
      className={`py-1 px-2  rounded-full flex items-center gap-1 text-xs ${status === 'active' ? 'bg-pillsActiveSuccess text-primaryGreen' : 'bg-pillsActiveDanger text-primaryRed'} ${pillsClassName}`}
    >
      <span className="relative flex h-2 w-2">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status === 'active' ? 'bg-primaryGreen' : 'bg-primaryRed'}`}
        ></span>
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${status === 'active' ? 'bg-primaryGreen' : 'bg-primaryRed'}`}
        ></span>
      </span>
      {status === 'active' ? 'Active' : 'Inactive'}
    </div>
  );
};

export default GlobalPills;
