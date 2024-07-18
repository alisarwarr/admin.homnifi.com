import React from 'react';
import { TriangleIcon } from '../../../../../images/svg';
import { TMACHINE_DATA } from '../../../../../interfaces/cloudk';
import { useSelector } from 'react-redux';
import { selectConvertedPrice } from '../../../../../store/general/generalSlice';

type TProps = {
  data: TMACHINE_DATA;
};

const LifetimeRewards = ({ data }: TProps) => {
  const conversionRate = useSelector(selectConvertedPrice);

  const { rewards, profitGained } = data;

  return (
    <section className="px-2 py-3 border border-borderBlue rounded-lg shadow-tableCardShadow text-primaryGrey font-normal w-full h-full flex gap-2 flex-col justify-center">
      <span className="text-primaryDark font-medium text-sm uppercase">
        Total Rewards
      </span>
      <span className="text-primary font-semibold text-lg">
        ${' '}
        {(conversionRate &&
          rewards &&
          (rewards?.lifetimeReward * conversionRate).toLocaleString()) ||
          '25,000'}{' '}
        <span className="text-sm">LYK</span>
      </span>
      <span
        className={`${profitGained ? (profitGained > 0 ? 'text-primaryGreen' : 'text-redDanger') : ''} text-sm font-medium flex items-center gap-2`}
      >
        <TriangleIcon className="w-5 h-5" />{' '}
        {profitGained && profitGained > 0 ? '+' : '-'}{' '}
        {(profitGained && profitGained.toLocaleString()) || '0.20'} %
      </span>
    </section>
  );
};

export default LifetimeRewards;
