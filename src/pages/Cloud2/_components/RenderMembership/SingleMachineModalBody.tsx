import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectConvertedPrice } from '../../../../store/general/generalSlice';
import { useGeneralActions } from '../../../../store/general/generalActions';
import NoData from '../../../../components/Table/NoData';
import Product from './MachinesAccordion/Product';
import LifetimeRewards from './MachinesAccordion/LifetimeRewards';
import Staked from './MachinesAccordion/Staked';
import Skalable from './MachinesAccordion/Skalable';
import ExpiresIn from './MachinesAccordion/ExpiresIn';
import { useCloudActions } from '../../../../store/cloudk/cloudk.action';
import { RootState } from '../../../../store';
import { selectCloudMachine } from '../../../../store/cloudk/cloudk.slice';

type Props = {
  id: string;
};

const SingleMachineModalBody = ({ id }: Props) => {
  const machine = useSelector((state: RootState) =>
    selectCloudMachine(state, id)
  );
  const { GetConvertedPrice } = useGeneralActions();

  const conversionRate = useSelector(selectConvertedPrice);

  const { getMachineDetails } = useCloudActions();

  const fetchUserMachineById = async () => {
    await getMachineDetails(id);
  };

  const fetchConversionRate = async () => {
    try {
      await GetConvertedPrice();
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
                machine.status === 'active'
                  ? 'bg-primaryGreen'
                  : 'bg-primaryRed'
              }`}
            ></span>
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                machine.status === 'active'
                  ? 'bg-primaryGreen'
                  : 'bg-primaryRed'
              }`}
            ></span>
          </span>

          <img src={machine.imageUrl} alt="MachineImage" className="w-32" />

          <span className="text-sm text-defaultBlack font-medium">
            {machine.name}
          </span>
        </div>
      </article>

      <article className="lg:col-span-2 md:col-span-3 col-span-6 p-4 font-medium text-sm">
        <Product data={machine} />
      </article>
      <article className="lg:col-span-2 md:col-span-3 col-span-6 p-4 font-medium text-sm">
        <LifetimeRewards data={machine} />
      </article>
      <article className="lg:col-span-2 md:col-span-3 col-span-6 p-4 font-medium text-sm">
        <Staked data={machine} />
      </article>
      <article className="lg:col-span-3 md:col-span-3 col-span-6 p-4 font-medium text-sm">
        <Skalable data={machine} />
      </article>
      <article className="lg:col-span-3 md:col-span-3 col-span-6 p-4 font-medium text-sm">
        <ExpiresIn data={machine} />
      </article>
    </section>
  );
};

export default SingleMachineModalBody;
