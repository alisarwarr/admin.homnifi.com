import React, { useState } from 'react';
import GaugeChart from '../../../../../components/Cloud/Test1Chart';
import GlobalInput from '../../../../../components/Global/GlobalInput';
import GlobalDropdown from '../../../../../components/Global/GlobalDropdown';
import GlobalSelect from '../../../../../components/Global/GlobalSelect';
import GlobalButton from '../../../../../components/Global/GlobalButton';
import { ArrowDownCircleOutlined } from '../../../../../images/svgs';
import ReviewModeStakeMoreModal from './ReviewModeStakeMoreModal';
import { EditModeFieldStakeMoreModal, EditModeGaugeStakeMoreModal } from './EditModeStakeMoreModal';

type Props = {};

const PILLS_DATA = [
  { id: '1', value: 25, selected: true },
  { id: '2', value: 50, selected: false },
  { id: '3', value: 75, selected: false },
  { id: '4', value: 100, selected: false },
];

const StakeMoreModalBody = (props: Props) => {
  const [selectedPill, setSelectedPill] = useState(PILLS_DATA);
  const [selectedToken, setSelectedToken] = useState('');
  const [mode, setMode] = useState('edit');

  return (
    <article className="flex flex-col gap-5">
      <h2 className="text-xs font-medium">Stake More</h2>

      <h3 className="text-cardSecondaryText font-normal text-sm">Staking In</h3>
      <span className="text-primaryDark text-lg font-medium">XK 5000</span>

      <section className="flex items-center justify-between gap-4 w-full">
        {mode === 'review' ? <ReviewModeStakeMoreModal /> : <EditModeGaugeStakeMoreModal />}
      </section>

      <section className="flex flex-col gap-4">
        {mode === 'edit' ? (
          <EditModeFieldStakeMoreModal
            setSelectedToken={setSelectedToken}
            selectedPill={selectedPill}
            setSelectedPill={setSelectedPill}
          />
        ) : (
          <article className="flex flex-col gap-2">
            <span className="text-cardSecondaryText text-xs font-medium">Token</span>
            <span className="bg-primary px-3 py-1 rounded-full text-white font-normal text-xs w-max">
              {selectedToken}
            </span>
          </article>
        )}

        {mode === 'review' ? (
          <GlobalButton text="Stake" classNames="font-normal" onClick={() => setMode('edit')} />
        ) : (
          <GlobalButton text="Review" classNames="font-normal" onClick={() => setMode('review')} />
        )}
      </section>
    </article>
  );
};

export default StakeMoreModalBody;
