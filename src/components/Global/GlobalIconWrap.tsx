import React from 'react';

type Props = {
  children: React.ReactNode;
  notificationCount?: number;
};

const GlobalIconWrap = ({ children, notificationCount }: Props) => {
  return (
    <div className="relative flex items-center justify-center border-2 border-borderBlue p-3 rounded-full text-defaultBlack hover:text-primary hover:border-primary/80 transition ease-in-out">
      {children}

      {notificationCount ? (
        <span className="absolute -top-1 -right-1 flex items-center justify-center bg-redSecondary rounded-full w-5 h-5 text-white font-semibold text-sm">
          {notificationCount}
        </span>
      ) : (
        ''
      )}
    </div>
  );
};

export default GlobalIconWrap;
