import React from 'react';
import GaugeChart from '../../../../../components/Cloud/Test1Chart';
import { useMediaQuery } from 'react-responsive';
import Toottip from '../../../../../components/Global/Toottip';

type Props = {};

const Skalable = (props: Props) => {
  const isDesktop = useMediaQuery({
    query: '(min-width: 1440px)',
  });

  return (
    <section className="px-2 py-3 border border-borderBlue rounded-lg shadow-tableCardShadow text-primaryGrey font-normal w-full h-full flex gap-2 flex-col items-center justify-center">
      <article className="flex items-center justify-around w-full">
        <span className="text-primaryDark font-medium text-sm uppercase">Skalable</span>

        <Toottip
          content={
            <div className="p-3 bg-white shadow-md rounded-lg text-xs font-normal w-52">
              You’ll start claiming your reward after 3 Years of staking. The due date is:{' '}
              <span className="text-primary">25-July-2027</span>
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
      </article>

      <article className="flex items-center gap-2 relative justify-center">
        <GaugeChart containerWidth={isDesktop ? 200 : 150} containerHeight={isDesktop ? 125 : 100} />
        <div className="flex flex-col lg:gap-2 font-bold text-primaryDark absolute bottom-4 text-center">
          <span className="md:text-md font-semibold">$ 25,000</span>
          <span className="text-xs">mLYK</span>
        </div>
      </article>
    </section>
  );
};

export default Skalable;
