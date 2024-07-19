import { TMACHINE_DATA } from '../../../../../interfaces/cloudk';
import { useSelector } from 'react-redux';
import { selectConvertedPrice } from '../../../../../store/general/generalSlice';
import { RootState } from '../../../../../store';
import {
  selectCloudkSlice,
  selectCloudMachine,
} from '../../../../../store/cloudk/cloudk.slice';
import GlobalSwitch from '../../../../../components/Global/GlobalSwitch';
import GlobalSkeleton from '../../../../../components/Global/GlobalSkeleton';

type TProps = {
  data: TMACHINE_DATA;
};

const Staked = ({ data }: TProps) => {
  const { totalStaked, _id } = data;

  const machine = useSelector((state: RootState) =>
    selectCloudMachine(state, _id)
  );

  const { getMachineDetailsLoading } = useSelector(selectCloudkSlice);

  const conversionRate = useSelector(selectConvertedPrice);

  return (
    <section className="px-2 py-3 border border-borderBlue rounded-lg shadow-tableCardShadow text-primaryGrey font-normal w-full h-full flex gap-2 flex-col justify-center">
      <article className="flex items-center justify-between w-full">
        <span className="text-primaryDark font-medium text-sm uppercase">
          staked
        </span>
      </article>
      <span className="text-primary font-semibold text-lg">
        {getMachineDetailsLoading ? (
          <GlobalSkeleton animationValue="pulse" width={60} height={40} />
        ) : (
          `$
        ${
          (conversionRate &&
            totalStaked &&
            (totalStaked * conversionRate)?.toLocaleString()) ||
          '0'
        } `
        )}
        <span className="text-sm">LYK</span>
      </span>

      <article className="flex items-center gap-2">
        <span className="text-primaryDark text-xs font-medium">
          AUTO COMPOUND
        </span>

        <GlobalSwitch checked={data?.autoCompound || false} disabled={true} />
      </article>

      {!data?.autoCompound ? (
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
