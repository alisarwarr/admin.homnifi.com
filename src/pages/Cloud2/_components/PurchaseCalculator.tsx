import React, { useState } from 'react';
import CardLayout from '../../../components/Cards/CardLayout.tsx';
import GlobalSlider from '../../../components/Global/GlobalSlider';
import CustomSwitch from '../../../components/Global/GlobalSwitch';

import './cloud.css';
import { SettingsIcon } from '../../../images/svgs';
import { Accordion } from '@nextui-org/react';
import GlobalInput from '../../../components/Global/GlobalInput';
import { Fade, Grow } from '@mui/material';

type Props = {};

const PurchaseCalculator = (props: Props) => {
  const [purchaseCalculatorStates, setPurchaseCalculatorStates] = useState({
    purchaseValue: 10000,
    autoCompounding: false,
    advancedOptions: false,
  });

  return (
    <CardLayout className="md:col-span-1 col-span-2  p-5 flex flex-col justify-between gap-2">
      <section className="flex flex-col gap-2">
        <h1 className="text-secondaryBlack font-medium text-lg">Purchase Calculator</h1>
        <span className="text-cardSecondaryText text-sm font-normal">
          Lorem ipsum dolor sit amet consectetur.Cras egestas et placerat aliquet id
        </span>

        <span className="text-defaultBlack text-xl font-medium">
          $ {purchaseCalculatorStates.purchaseValue.toLocaleString()}
        </span>

        <GlobalSlider
          maxValue={30000}
          currentValue={10000}
          getCurrentValue={(value) => {
            setPurchaseCalculatorStates({
              ...purchaseCalculatorStates,
              purchaseValue: Number(value),
            });
          }}
        />

        <article className="flex items-center gap-2">
          <span className="text-primaryDark text-xs font-medium">AUTO COMPOUND</span>
          <CustomSwitch
            checked={purchaseCalculatorStates.autoCompounding}
            onChange={(checked) =>
              setPurchaseCalculatorStates({
                ...purchaseCalculatorStates,
                autoCompounding: checked,
              })
            }
          />
        </article>
      </section>

      <section className="flex flex-col gap-2 justify-self-end overflow-hidden">
        <button
          className="flex items-center gap-2"
          type="button"
          onClick={() =>
            setPurchaseCalculatorStates((prev) => ({
              ...prev,
              advancedOptions: !prev.advancedOptions,
            }))
          }
        >
          <SettingsIcon className="w-4 h-4" />
          <span className="text-sm font-medium">Advance Options</span>
        </button>

        <article
          className={`grid grid-cols-2 gap-2 transition-all ease-in-out duration-300 ${!purchaseCalculatorStates.advancedOptions ? 'w-0 -translate-x-10 h-0' : 'h-12 w-full translate-x-0'}`}
        >
          <GlobalInput name="remarks" placeholder="Add any Optional Remarks" type="text" className="col-span-1" />
          <GlobalInput name="remarks" placeholder="Add any Optional Remarks" type="text" className="col-span-1" />
        </article>
      </section>
    </CardLayout>
  );
};

export default PurchaseCalculator;
