import React from 'react';
import GlobalPills from '../../../../../components/GlobalPills';


const Product = () => {
  return (
    <section className="px-2 py-3 border border-borderBlue flex flex-col gap-1 justify-center rounded-lg shadow-tableCardShadow text-primaryGrey font-normal w-full h-full">
      <article className="flex lg:flex-row flex-col items-center justify-between border-b border-borderBlue">
        <span className="md:w-1/2">Status: </span>
        <span className="text-primaryDark font-normal text-left md:w-1/2 pb-2">
          <GlobalPills status="active" pillsClassName="w-max" />
        </span>
      </article>

      <article className="border-b border-borderBlue">
        <div className="flex lg:flex-row flex-col items-center justify-between">
          <span className="md:w-1/2">LYK Price: </span>
          <span className="text-primaryDark font-normal text-left md:w-1/2">
            $ 12,456.00
          </span>
        </div>

        <div className="flex lg:flex-row flex-col items-center justify-between">
          <span className="md:w-1/2">DLP: </span>
          <span className="text-primaryDark font-normal text-left md:w-1/2">
            $ 12,456.00
          </span>
        </div>

        <article className="flex lg:flex-row flex-col items-center justify-between">
          <span className="md:w-1/2">ATH: </span>
          <span className="text-primaryDark font-normal text-left md:w-1/2">
            $ 12,456.00
          </span>
        </article>
      </article>

      <article className="flex flex-col items-center justify-between">
        <div className="w-full flex lg:flex-row flex-col items-center justify-between">
          <span className="text-primaryGrey md:w-1/2 flex items-center justify-between pr-4">
            Minting Power
            <span>+</span>
          </span>
          <span className="text-primaryGrey md:w-1/2"> Boost = Total</span>
        </div>

        <div className="w-full flex lg:flex-row flex-col items-center justify-between">
          <span className="text-primaryDark font-normal text-left md:w-1/2 flex items-center justify-between pr-4">
            0.21% (daily)
            <span>+</span>
          </span>
          <span className="text-primaryDark font-normal text-left md:w-1/2">
            0.09 % = 0.30 %
          </span>
        </div>
      </article>
    </section>
  );
};

export default Product;
