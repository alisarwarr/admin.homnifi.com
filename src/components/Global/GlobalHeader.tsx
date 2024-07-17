import React from 'react';

type Props = {
  title?: string;
  sub?: string;
  third?: React.ReactNode;
};

const GlobalHeader = ({ title, sub, third }: Props) => {
  return (
    <aside>
      {sub && (
        <div className="text-primaryGrey text-sm tracking-wider font-montserrat font-semibold">
          {sub}
        </div>
      )}
      {(sub || title) && (
        <div className="flex items-center gap-2">
          {title && (
            <p className="text-2xl text-defaultBlack font-baumans">{title}</p>
          )}
          {third && (
            <span className="flex items-end gap-2 text-xs font-medium underline font-montserrat">
              {third}
            </span>
          )}
        </div>
      )}
    </aside>
  );
};

export default GlobalHeader;
