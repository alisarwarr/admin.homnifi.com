import React from 'react';
import GaugeChart from '../../../../../components/Cloud/Test1Chart';
import { useMediaQuery } from 'react-responsive';
import Toottip from '../../../../../components/Global/Toottip';
import { TMACHINE_DATA } from '../../../../../interfaces/cloudk';
import { useSelector } from 'react-redux';
import { selectConvertedPrice } from '../../../../../store/general/generalSlice';
import { selectCloudkSlice } from '../../../../../store/cloudk/cloudk.slice';
import GlobalSkeleton from '../../../../../components/Global/GlobalSkeleton';

type TProps = {
  data: TMACHINE_DATA;
};

const Skalable = ({ data }: TProps) => {
  const { getMachineDetailsLoading } = useSelector(selectCloudkSlice);

  const conversionRate = useSelector(selectConvertedPrice);

  const isDesktop = useMediaQuery({
    query: '(min-width: 1440px)',
  });

  const { stakeLimit, totalStaked } = data;

  return (
    <section className="px-2 py-3 border border-borderBlue rounded-lg shadow-tableCardShadow text-primaryGrey font-normal w-full h-full flex gap-2 flex-col items-center justify-center">
      <article className="flex items-center justify-around w-full">
        <span className="text-primaryDark font-medium text-sm uppercase">
          Stakable
        </span>

        {totalStaked && stakeLimit && totalStaked >= stakeLimit ? (
          <Toottip
            content={
              <div className="p-3 bg-white shadow-md rounded-lg text-xs font-normal w-52">
                You’ve reached your maximum Limit of staking for this machine.
                <span className="text-primary">Buy New Machine</span>
              </div>
            }
          >
            <button
              disabled
              type="button"
              className="px-4 py-1 bg-primaryDark text-white rounded-md text-xs hover:bg-primary transition-all shadow-buttonShadow"
            >
              Buy New
            </button>
          </Toottip>
        ) : (
          ''
        )}
      </article>

      <article className="flex items-center gap-2 relative justify-center w-full">
        <GaugeChart
          containerWidth={isDesktop ? 200 : 150}
          containerHeight={isDesktop ? 125 : 100}
          value={totalStaked}
          limit={stakeLimit}
          startText="0"
          endText={`$ ${stakeLimit?.toLocaleString()}`}
        />
        <div className="flex flex-col lg:gap-1 font-bold text-primaryDark absolute bottom-12 text-center">
          <span className="md:text-md font-semibold">
            {getMachineDetailsLoading ? (
              <GlobalSkeleton animationValue="pulse" width={60} height={40} />
            ) : (
              `$  ${
                (conversionRate &&
                  totalStaked &&
                  stakeLimit &&
                  (stakeLimit - totalStaked)?.toLocaleString()) ||
                '0'
              }`
            )}
          </span>
          <span className="text-xs">mLYK</span>
        </div>
      </article>
    </section>
  );
};

export default Skalable;
