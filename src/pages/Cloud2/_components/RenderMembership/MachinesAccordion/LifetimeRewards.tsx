import React from 'react';
import { TriangleIcon } from '../../../../../images/svg';

const LifetimeRewards = () => {
  return (
    <section className="px-2 py-3 border border-borderBlue rounded-lg shadow-tableCardShadow text-primaryGrey font-normal w-full h-full flex gap-2 flex-col justify-center">
      <span className="text-primaryDark font-medium text-sm uppercase">Total Rewards</span>
      <span className="text-primary font-semibold text-lg">
        $ 25,000 <span className="text-sm">LYK</span>
      </span>
      <span className="text-primaryGreen text-sm font-medium flex items-center gap-2">
        <TriangleIcon className="w-5 h-5" /> + 0.20 %
      </span>
    </section>
  );
};

export default LifetimeRewards;
