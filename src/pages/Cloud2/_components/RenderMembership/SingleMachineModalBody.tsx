import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useCloudActions } from '../../../../store/Cloudk2/cloudk2Actions';
import { selectConvertedPrice } from '../../../../store/general/generalSlice';
import { useGeneralActions } from '../../../../store/general/generalActions';
import { RootState } from '../../../../store';
// import {
//   selectCloudMachine,
//   setClouldk2Slice,
// } from '../../../../store/Cloudk2/clouldk2Slice';
import NoData from '../../../../components/Table/NoData';
import Product from './MachinesAccordion/Product';
import LifetimeRewards from './MachinesAccordion/LifetimeRewards';
import Staked from './MachinesAccordion/Staked';
import Skalable from './MachinesAccordion/Skalable';
import ExpiresIn from './MachinesAccordion/ExpiresIn';
import useModalHook from '../../../../utils/hooks/useModalHook';

type Props = {
  id: string;
};

const SingleMachineModalBody = ({ id }: Props) => {
  console.log('🚀 ~ SingleMachineModalBody ~ id:', id);
  // const machine = useSelector((state: RootState) => selectCloudMachine(state, id));
  const machine: any = {};

  const { GetConvertedPrice } = useGeneralActions();

  const dispatch = useDispatch();

  const conversionRate = useSelector(selectConvertedPrice);

  // const { getUserMachineById } = useCloudActions();

  const fetchUserMachineById = async () => {
    // const fetchedMachine = await getUserMachineById({ id });
  };

  const fetchConversionRate = async () => {
    try {
      const conversionRateResponse = await GetConvertedPrice();

      // dispatch(
      //   setClouldk2Slice({
      //     conversionRate: conversionRateResponse.data.buy,
      //   })
      // );
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchUserMachineById();

    if (!conversionRate) {
      fetchConversionRate();
    }
  }, [conversionRate]);

  if (!machine) {
    return (
      <td colSpan={6}>
        <NoData visible />
      </td>
    );
  }

  return (
    <section className="grid grid-cols-6">
      <article className="col-span-6 p-4 font-medium text-sm h-[200px]">
        <span className="text-lg font-medium text-defaultBlack">Product</span>
        <div className="flex items-center gap-5">
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                machine.status === 'active' ? 'bg-primaryGreen' : 'bg-primaryRed'
              }`}
            ></span>
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                machine.status === 'active' ? 'bg-primaryGreen' : 'bg-primaryRed'
              }`}
            ></span>
          </span>

          <img src={machine.imageUrl} alt="MachineImage" className="w-32" />

          <span className="text-sm text-defaultBlack font-medium">{machine.name}</span>
        </div>
      </article>

      <article className="lg:col-span-2 md:col-span-3 col-span-6 p-4 font-medium text-sm">
        <Product />
      </article>
      <article className="lg:col-span-2 md:col-span-3 col-span-6 p-4 font-medium text-sm">
        <LifetimeRewards />
      </article>
      <article className="lg:col-span-2 md:col-span-3 col-span-6 p-4 font-medium text-sm">
        <Staked />
      </article>
      <article className="lg:col-span-3 md:col-span-3 col-span-6 p-4 font-medium text-sm">
        <Skalable />
      </article>
      <article className="lg:col-span-3 md:col-span-3 col-span-6 p-4 font-medium text-sm">
        <ExpiresIn />
      </article>
    </section>
  );
};

export default SingleMachineModalBody;
