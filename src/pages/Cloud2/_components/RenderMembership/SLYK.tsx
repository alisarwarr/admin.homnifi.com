import React from 'react';
import { cloudLykLogo } from '../../../../images';
import { useSelector } from 'react-redux';
import { selectCloudkSlice } from '../../../../store/cloudk/cloudk.slice';

const Slyk = () => {
  const { token } = useSelector(selectCloudkSlice);

  return (
    <article className="md:w-2/5 w-full h-full flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-6 h-full">
        <div className="flex gap-4 flex-col h-full justify-between">
          <div className="flex flex-col gap-2 font-medium">
            Total Staked sLYK
            <hr />
          </div>
          <div className="text-primaryDark sm:text-2xl text-lg font-medium flex flex-wrap items-center gap-2">
            <img src={cloudLykLogo} alt="cloudLykLogo" className="" />

            <>
              {token?.totalStaked?.toLocaleString() || ''}
              <span className="text-sm"> sLYK</span>
            </>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Slyk;
