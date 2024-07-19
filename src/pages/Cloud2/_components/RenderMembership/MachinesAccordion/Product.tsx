import React from 'react';
import GlobalPills from '../../../../../components/GlobalPills';
import { TMACHINE_DATA } from '../../../../../interfaces/cloudk';
import { useSelector } from 'react-redux';
import { selectCloudkSlice } from '../../../../../store/cloudk/cloudk.slice';
import GlobalSkeleton from '../../../../../components/Global/GlobalSkeleton';

type TProps = {
  data: TMACHINE_DATA;
};

const Product = ({ data }: TProps) => {
  const { lykPrice, dlp, ath, boost, mintingPower } = data;
  const { getMachineDetailsLoading } = useSelector(selectCloudkSlice);

  return (
    <section className="px-2 py-3 border border-borderBlue flex flex-col gap-1 justify-center rounded-lg shadow-tableCardShadow text-primaryGrey font-normal w-full h-full">
      <article className="flex items-center justify-between border-b border-borderBlue">
        <span className="md:w-1/2">Status: </span>
        <span className="text-primaryDark font-normal text-left md:w-1/2 pb-2">
          <GlobalPills status="active" pillsClassName="w-max" />
        </span>
      </article>

      <article className="border-b border-borderBlue">
        <div className="flex items-center justify-between">
          <span className="md:w-1/2">LYK Price: </span>
          <span className="text-primaryDark font-normal text-left md:w-1/2">
            {getMachineDetailsLoading ? (
              <GlobalSkeleton animationValue="pulse" width={60} height={40} />
            ) : (
              `$ ${(lykPrice && lykPrice.toLocaleString()) || '0'}`
            )}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="md:w-1/2">DLP: </span>
          <span className="text-primaryDark font-normal text-left md:w-1/2">
            {getMachineDetailsLoading ? (
              <GlobalSkeleton animationValue="pulse" width={60} height={40} />
            ) : (
              `$ ${(dlp && dlp.toLocaleString()) || '0'}}`
            )}
          </span>
        </div>

        <article className="flex items-center justify-between">
          <span className="md:w-1/2">ATH: </span>
          <span className="text-primaryDark font-normal text-left md:w-1/2">
            {getMachineDetailsLoading ? (
              <GlobalSkeleton animationValue="pulse" width={60} height={40} />
            ) : (
              `$ ${(ath && ath?.toLocaleString()) || '0'}}`
            )}
          </span>
        </article>
      </article>

      <article className="flex flex-col items-center justify-between">
        <div className="w-full flex items-center justify-between">
          <span className="text-primaryGrey md:w-1/2 flex items-center justify-between pr-4">
            Minting Power
            <span>+</span>
          </span>
          <span className="text-primaryGrey md:w-1/2"> Boost = Total</span>
        </div>

        <div className="w-full flex items-center justify-between">
          <span className="text-primaryDark font-normal text-left md:w-1/2 flex items-center justify-between pr-4">
            {getMachineDetailsLoading ? (
              <GlobalSkeleton animationValue="pulse" width={60} height={40} />
            ) : (
              `$ ${(mintingPower && mintingPower * 100) || '0.21'}% (daily)`
            )}

            <span>+</span>
          </span>
          <span className="text-primaryDark font-normal text-left md:w-1/2 flex items-center gap-2">
            {getMachineDetailsLoading ? (
              <GlobalSkeleton animationValue="pulse" width={60} height={40} />
            ) : (
              `$ ${(boost && boost * 100) || '0.09'} %`
            )}{' '}
            =
            {getMachineDetailsLoading ? (
              <GlobalSkeleton animationValue="pulse" width={60} height={40} />
            ) : (
              `$ ${
                (mintingPower && boost && mintingPower * 100 + boost * 100) ||
                '0.30'
              }
            %`
            )}
          </span>
        </div>
      </article>
    </section>
  );
};

export default Product;
