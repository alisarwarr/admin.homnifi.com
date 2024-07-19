import React from 'react';
import GaugeChart from '../../../../../components/Cloud/Test1Chart';
import { TMACHINE_DATA } from '../../../../../interfaces/cloudk';
import { useMediaQuery } from 'react-responsive';
import {
  formatDuration,
  formatOnlyDate,
  getDatePercentage,
} from '../../../../../utils/helper';
import GlobalSkeleton from '../../../../../components/Global/GlobalSkeleton';
import { useSelector } from 'react-redux';
import { selectCloudkSlice } from '../../../../../store/cloudk/cloudk.slice';

type TProps = {
  data: TMACHINE_DATA;
};

const ExpiresIn = ({ data }: TProps) => {
  const isDesktop = useMediaQuery({
    query: '(min-width: 1440px)',
  });

  const { startDate, endDate } = data;
  const { getMachineDetailsLoading } = useSelector(selectCloudkSlice);

  const { totalDays, totalMonths } = formatDuration(endDate || '');

  return (
    <section className="px-2 py-3 border border-borderBlue rounded-lg shadow-tableCardShadow text-primaryGrey font-normal w-full h-full flex gap-2 flex-col items-center justify-center">
      <span className="text-primaryDark font-medium text-sm uppercase">
        Expires In
      </span>

      <article className="flex items-center gap-1 relative justify-center w-full">
        <GaugeChart
          containerWidth={isDesktop ? 200 : 150}
          containerHeight={isDesktop ? 125 : 100}
          value={0}
          limit={
            (startDate && endDate && getDatePercentage(startDate, endDate)) ||
            20
          }
          startText={(startDate && formatOnlyDate(startDate)) || ''}
          endText={(endDate && formatOnlyDate(endDate)) || ''}
        />
        <div className="flex flex-col lg:gap-1 font-semibold text-redDanger absolute bottom-12 text-center">
          {getMachineDetailsLoading ? (
            <GlobalSkeleton animationValue="pulse" width={60} height={40} />
          ) : (
            <>
              <span className="md:text-md">{totalMonths || 1} Month</span>
              <span className="text-xs">{totalDays || 25} Days</span>
            </>
          )}
        </div>
      </article>
    </section>
  );
};

export default ExpiresIn;
