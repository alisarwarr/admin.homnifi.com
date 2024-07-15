import React from 'react';
import GaugeChart from '../../../../../components/Cloud/Test1Chart';

type Props = {};

const ExpiresIn = (props: Props) => {
  return (
    <section className="px-2 py-3 border border-borderBlue rounded-lg shadow-tableCardShadow text-primaryGrey font-normal w-full h-full flex gap-2 flex-col items-center justify-center">
      <span className="text-primaryDark font-medium text-sm uppercase">
        Expires In
      </span>

      <article className="flex items-center gap-2 relative justify-center">
        <GaugeChart containerWidth={200} containerHeight={125} />
        <div className="flex flex-col gap-2 font-semibold text-redDanger absolute bottom-4 text-center">
          <span className="md:text-md">1 Month</span>
          <span className="text-xs">25 Days</span>
        </div>
      </article>
    </section>
  );
};

export default ExpiresIn;
