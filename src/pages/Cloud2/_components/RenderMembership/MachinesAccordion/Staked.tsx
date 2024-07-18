import { TMACHINE_DATA } from '../../../../../interfaces/cloudk';
import { useSelector } from 'react-redux';
import { selectConvertedPrice } from '../../../../../store/general/generalSlice';
import { RootState } from '../../../../../store';
import { selectCloudMachine } from '../../../../../store/cloudk/cloudk.slice';
import GlobalSwitch from '../../../../../components/Global/GlobalSwitch';

type TProps = {
  data: TMACHINE_DATA;
};

const Staked = ({ data }: TProps) => {
  const { totalStaked, _id } = data;

  const machine = useSelector((state: RootState) =>
    selectCloudMachine(state, _id)
  );

  const conversionRate = useSelector(selectConvertedPrice);

  return (
    <section className="px-2 py-3 border border-borderBlue rounded-lg shadow-tableCardShadow text-primaryGrey font-normal w-full h-full flex gap-2 flex-col justify-center">
      <article className="flex items-center justify-between w-full">
        <span className="text-primaryDark font-medium text-sm uppercase">
          staked
        </span>
      </article>
      <span className="text-primary font-semibold text-lg">
        $
        {(conversionRate &&
          totalStaked &&
          (totalStaked * conversionRate)?.toLocaleString()) ||
          '25,000'}
        <span className="text-sm">LYK</span>
      </span>

      <article className="flex items-center gap-2">
        <span className="text-primaryDark text-xs font-medium">
          AUTO COMPOUND
        </span>

        <GlobalSwitch checked={data?.autoCompound || false} disabled={true} />
      </article>

      {!machine?.autoCompound ? (
        <span className="bg-cardBg text-primary w-max p-2 rounded-md text-xs">
          Turn on and get 30% more
        </span>
      ) : (
        ''
      )}
    </section>
  );
};

export default Staked;
