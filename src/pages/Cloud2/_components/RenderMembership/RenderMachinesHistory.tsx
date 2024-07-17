import { useState } from 'react';
import { MachineImage } from '../../../../images/cloud';
import { ArrowDownSvg, CopyIcon } from '../../../../images/svg';
import Toottip from '../../../../components/Global/Toottip';
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
      <div className="flex gap-3 items-center justify-between">
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
      dataClass: 'w-72',
    },
    {
      id: 'lifetimeRewards',
      label: 'Lifetime Rewards',
      dataClass: 'w-72',
    },
    {
      id: 'staked',
      label: 'Staked',
      dataClass: 'w-72',
    },
    {
      id: 'claimableRewards',
      label: 'Claimable Rewards',
      dataClass: 'w-72',
    },
    {
      id: 'quickActions',
      label: 'Quick Actions',
      dataClass: 'w-72',
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
      <div className="font-medium flex flex-row  text-sm gap-2 items-center text-defaultBlack">
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


        <span className="w-24">{trx.product.name}</span>
      </div>
    ),
    lifetimeRewards: <span className="font-medium ">${trx.lifetimeRewards.toLocaleString()} ~$2</span>,
    staked: <span className="font-medium ">$ {trx.staked.toLocaleString()}</span>,
    claimableRewards: <span className=" font-medium">$ {trx.claimableRewards.toLocaleString()}</span>,
    quickActions: <RenderActions cloud={trx} />,
  }));

  const accordingrow: any = {
    product: <Product />,
    lifetimeRewards: <LifetimeRewards />,
    staked: <Staked />,
    claimableRewards: <Skalable />,
    quickActions: <ExpiresIn />,
  };

  const [filter, setFilter] = useState<FILTER>({
    page: 1,
    limit: 10,
    search: null,
  });

  return (
    <>
      <div className="overflow-x-auto">
        <div className="hidden  sm:flex flex-row bg-white  w-full  ">
          {headCells.map((cell) => (
            <div
              key={cell.id}
              className="flex justify-start text-sm font-light bg-white p-3 text-primaryGrey  items-center  min-w-40 w-72 "
            >
              {cell.label}
            </div>
          ))}
        </div>

        <div className="hidden sm:flex flex-col gap-4  ">
          {rows.map((row, index) => (
            <div key={index} className=" flex flex-row bg-white  ">
              {/* Cells */}
              {headCells.map((cell) => (
                <div
                  key={cell.id}
                  className="flex flex-col gap-2 justify-start  items-start text-start  p-3 min-w-40 w-72 "
                >
                  <div className="flex h-12 justify-center items-center ">{row[cell.id]}</div>
                  <div className=' h-56 w-full'>{accordingrow[cell.id]}</div>

                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5 sm:hidden overflow-x-auto">
        {rows.map((row, index) => (
          <div key={index} className="flex flex-col gap-5 w-full border-b border-gray-200 pb-5">
            {headCells.map((cell) => (
              <div key={cell.id} className="flex justify-between items-center p-2 ">
                <div className="font-medium">{cell.label}</div>
                <div className="self-end">{row[cell.id]}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>

    // <div className="flex flex-col gap-5 overflow-x-auto w-full">
    //   {/* Header for larger screens */}
    //   <div className="hidden sm:grid grid-cols-5 gap-5 w-full bg-gray-50 sticky top-0 z-10">
    //     {headCells.map((cell) => (
    //       <div key={cell.id} className="flex justify-center items-center p-2 w-72 bg-red-400">
    //         {/* {cell.label} */}
    //         pppppppppppppppppppppppppp
    //       </div>
    //     ))}
    //   </div>

    //   {/* Scrollable Container */}
    //   <div className="sm:flex flex-col gap-2 ">
    //     {/* Table Rows */}
    //     {rows.map((row, index) => (
    //       <div key={index} className="grid grid-cols-5 gap-5 w-full bg-red-100">
    //         {/* Cells */}
    //         {headCells.map((cell) => (
    //           <div key={cell.id} className="flex justify-center items-center p-2 w-72 bg-blue-400">
    //             {row[cell.id]}
    //           </div>
    //         ))}
    //       </div>
    //     ))}
    //   </div>

    //   {/* Rows for mobile screens */}
    //   <div className="flex flex-col gap-5 sm:hidden overflow-x-auto">
    //     {rows.map((row, index) => (
    //       <div key={index} className="flex flex-col gap-5 w-full border-b border-gray-200 pb-5">
    //         {headCells.map((cell) => (
    //           <div key={cell.id} className="flex justify-between items-center p-2 bg-red-50">
    //             <div className="font-medium">{cell.label}</div>
    //             <div>{row[cell.id]}</div>
    //           </div>
    //         ))}
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default RenderMachinesHistory;
