import { useState } from 'react';
import { MachineImage } from '../../../../images/cloud';
import { ArrowDownSvg, CopyIcon } from '../../../../images/svg';
// import GlobalTable from '../../../../components/Global/GlobalTable';
import Toottip from '../../../../components/Global/Toottip';
import GlobalTable from '../../../../components/Table/GlobalTable';
import Product from './MachinesAccordion/Product';
import LifetimeRewards from './MachinesAccordion/LifetimeRewards';
import Staked from './MachinesAccordion/Staked';
import ExpiresIn from './MachinesAccordion/ExpiresIn';
import Skalable from './MachinesAccordion/Skalable';


type Props = {};
type FILTER = {
  page: number;
  limit: number;
  search: string | null;
};
const RenderMachinesHistory = (props: Props) => {
  const [Accordion, setAccordion] = useState('1');

  const RenderActions = ({
    cloud,
  }: {
    cloud: {
      id: string;
      product: {
        name: string;
        status: boolean;
        image: string;
      };
      lifetimeRewards: number;
      staked: number;
      claimableRewards: number;
    };
  }) => {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="px-4 py-1 bg-primaryDark text-white rounded-full hover:bg-primary transition-all"
          >
            + Stake
          </button>

          <Toottip
            content={
              <div className="p-3 bg-white shadow-md rounded-lg text-xs font-normal w-52">
                You’ll start claiming your reward after 3 Years of staking. The due date is:{' '}
                <span className="text-primary">25-July-2027</span>
              </div>
            }
          >
            <button
              type="button"
              disabled
              className="px-4 py-1 bg-primary text-white rounded-full transition-all flex items-center gap-2"
            >
              <CopyIcon className="text-white w-2 h-2" /> Claim
            </button>
          </Toottip>
        </div>

        <button type="button" onClick={() => setAccordion((prev) => (prev !== cloud.id ? cloud.id : ''))}>
          <ArrowDownSvg
            className={`w-4 h-4 text-searchColor transition-all ease-in-out duration-75 ${
              Accordion === cloud.id ? 'rotate-180' : 'rotate-0'
            } `}
          />
        </button>
      </div>
    );
  };

  const headCells = [
    {
      id: 'product',
      label: 'Product',
      dataClass: 'w-[25%] ',
    },
    {
      id: 'lifetimeRewards',
      label: 'Lifetime Rewards',
      dataClass: 'w-[15%]',
    },
    {
      id: 'staked',
      label: 'Staked',
      dataClass: 'w-[15%]',
    },
    {
      id: 'claimableRewards',
      label: 'Claimable Rewards',
      dataClass: 'w-[20%]',
    },
    {
      id: 'quickActions',
      label: 'Quick Actions',
      dataClass: 'w-[50%]',
    },
  ];

  const rowData = [
    {
      id: '1',
      product: {
        name: 'XK 5000',
        status: false,
        image: MachineImage,
      },
      lifetimeRewards: 12000,
      staked: 1000,
      claimableRewards: 11000,
    },
    {
      id: '2',
      product: {
        name: 'XK 500',
        status: true,
        image: MachineImage,
      },
      lifetimeRewards: 12000,
      staked: 1000,
      claimableRewards: 11000,
    },
    {
      id: '3',
      product: {
        name: 'XK 1000',
        status: false,
        image: MachineImage,
      },
      lifetimeRewards: 12000,
      staked: 1000,
      claimableRewards: 11000,
    },
    {
      id: '4',
      product: {
        name: 'XK 10000',
        status: false,
        image: MachineImage,
      },
      lifetimeRewards: 12000,
      staked: 1000,
      claimableRewards: 11000,
    },
    {
      id: '5',
      product: {
        name: 'XK validator',
        status: false,
        image: MachineImage,
      },
      lifetimeRewards: 12000,
      staked: 1000,
      claimableRewards: 11000,
    },
    {
      id: '6',
      product: {
        name: 'XK validator',
        status: false,
        image: MachineImage,
      },
      lifetimeRewards: 12000,
      staked: 1000,
      claimableRewards: 11000,
    },
    {
      id: '7',
      product: {
        name: 'XK 5000',
        status: false,
        image: MachineImage,
      },
      lifetimeRewards: 12000,
      staked: 1000,
      claimableRewards: 11000,
    },
  ];







  const rows = rowData.map((trx, i) => ({
    id: trx.id,
    product: (
      <td className=" font-medium text-sm flex gap-2 items-center text-defaultBlack">
        <span className="relative flex h-2 w-2">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              trx.product.status ? 'bg-primaryGreen' : 'bg-primaryRed'
            }`}
          ></span>
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              trx.product.status ? 'bg-primaryGreen' : 'bg-primaryRed'
            }`}
          ></span>
        </span>
        <img src={trx.product.image} alt="Machine" className="w-20 bg-black" />
        {trx.product.name}
      </td>
    ),
    lifetimeRewards: <span className="text-defaultBlack">${trx.lifetimeRewards.toLocaleString()} ~$2</span>,
    staked: <span className="text-defaultBlack">$ {trx.staked.toLocaleString()}</span>,
    claimableRewards: <span className="text-defaultBlack">$ {trx.claimableRewards.toLocaleString()}</span>,
    quickActions: <RenderActions cloud={trx} />,
  }));


  const accordingrow:  any = {
    product: <Product   />,
    lifetimeRewards: <LifetimeRewards  />,
    staked: <Staked  />,
    claimableRewards: <Skalable  />,
    quickActions: <ExpiresIn  />,
  }


  const [filter, setFilter] = useState<FILTER>({
    page: 1,
    limit: 10,
    search: null,
  });
  // const [columns, setColumns] = useState<any[]>(headCells);

  return (
    <div className="w-full ">
      <GlobalTable
        rows={rows}
        accordion={accordingrow}

        headCells={headCells}
        isLoading={false}
        totalPages={Math.ceil(10)}
        page={filter.page}
        handlePageChange={(page) => {
          setFilter({ ...filter, page });
        }}
        handleLimitChange={(limit) => {
          setFilter({ ...filter, limit });
        }}
        // setColumns={setColumns}
        // ColumnsList={columns}
        filter={filter}
        setFilter={setFilter}
        showInnerFilters={true}
        showAccordion={Accordion}
      />

    </div>
  );
};

export default RenderMachinesHistory;
