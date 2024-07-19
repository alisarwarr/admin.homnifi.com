import React from 'react';
import GaugeChart from '../../../../../components/Cloud/Test1Chart';
import GlobalSelect from '../../../../../components/Global/GlobalSelect';
import GlobalInput from '../../../../../components/Global/GlobalInput';

type TEditModeGaugeStakeMoreModalProps = {};

export const EditModeGaugeStakeMoreModal = (
  props: TEditModeGaugeStakeMoreModalProps
) => {
  return (
    <article className="flex justify-between items-center w-full">
      <article className="flex flex-col gap-2">
        <span className="text-cardSecondaryText">Balance:</span>
        <span className="text-lg font-bold text-primary">$ 8023,586 mLYK</span>
      </article>

      <article className="flex items-center gap-2 relative justify-center">
        <GaugeChart
          containerWidth={150}
          containerHeight={100}
          strokeWidth={2}
        />

        <div className="flex flex-col font-bold text-primaryDark absolute bottom-4 text-center">
          <span className="text-sm font-semibold">$ 25,000</span>
          <span className="text-xs">mLYK</span>
        </div>
      </article>
    </article>
  );
};

type TEditModeFieldStakeMoreModal = {
  setSelectedToken: React.Dispatch<React.SetStateAction<string>>;
  setSelectedPill: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        value: number;
        selected: boolean;
      }[]
    >
  >;
  selectedPill: {
    id: string;
    value: number;
    selected: boolean;
  }[];
};

export const EditModeFieldStakeMoreModal = ({
  setSelectedToken,
  setSelectedPill,
  selectedPill,
}: TEditModeFieldStakeMoreModal) => {
  return (
    <>
      <article>
        <span className="text-defaultBlack font-medium text-sm">
          Select Token <span className="text-redDanger">*</span>
        </span>

        <GlobalSelect
          name="token-modal"
          options={[
            { label: 'bitcoin', value: 'Bitcoin' },
            { label: 'ethereum', value: 'Ethereum' },
            { label: 'solana', value: 'Solana' },
          ]}
          isError={false}
          onChange={(value) => setSelectedToken(value)}
        />
      </article>
      <article>
        <span className="text-defaultBlack font-medium text-sm">
          Amount to Stake <span className="text-redDanger">*</span>
        </span>

        <div className="relative">
          <GlobalInput name="token" type="input" />

          <span className="absolute top-4 right-4 text-placeholderGrey text-xs bg-white">
            Balance: 20.00 USDT
          </span>
        </div>
      </article>
      <article className="flex items-center justify-end gap-2">
        {selectedPill.map((item, index) => (
          <button
            type="button"
            key={index}
            className={`text-primaryGrey border border-borderBlue rounded-full text-xs font-normal py-1 px-3 ${item.selected ? 'bg-primary text-white' : ''}`}
            onClick={() => {
              setSelectedPill((prev) => {
                const newPill = [...prev];
                newPill[index].selected = !newPill[index].selected;
                return newPill;
              });
            }}
          >
            {item.value} %
          </button>
        ))}
      </article>
    </>
  );
};
