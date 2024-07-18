import { useState } from 'react';
import { MachineImage } from '../../../../images/cloud';
import { ArrowDownSvg, CopyIcon, InfoIcon } from '../../../../images/svg';
import Toottip from '../../../../components/Global/Toottip';
import Product from './MachinesAccordion/Product';
import LifetimeRewards from './MachinesAccordion/LifetimeRewards';
import Staked from './MachinesAccordion/Staked';
import ExpiresIn from './MachinesAccordion/ExpiresIn';
import Skalable from './MachinesAccordion/Skalable';
import GlobalTable from '../../../../components/Table/GlobalTable';
import GlobalModal from '../../../../components/Global/GlobalModal';
import useModalHook from '../../../../utils/hooks/useModalHook';
import SingleMachineModalBody from './SingleMachineModalBody';
import GlobalButton from '../../../../components/Global/GlobalButton';

type Props = {};

type FILTER = {
  page: number;
  limit: number;
  search: string | null;
};

const RenderMachinesHistory = (props: Props) => {
  const [Accordion, setAccordion] = useState('1');
  const stakeModalHook = useModalHook();
  const machineDetailHook = useModalHook();
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
      <div className="flex gap-3 items-center justify-between text-xs font-light">
        <div className="flex  gap-3">
          <GlobalButton classNames="!text-xs !font-light " text="Stack History" />
          <GlobalButton classNames="!text-xs !font-light " text="Reward History" />
        </div>

        <InfoIcon onClick={() => stakeModalHook.handleOpen()} className="cursor-pointer" />

        {/* <button type="button" onClick={() => stakeModalHook.handleOpen()}>
          <ArrowDownSvg
            className={`w-4 h-4 text-searchColor transition-all ease-in-out duration-75 ${
              Accordion === cloud.id ? 'rotate-180' : 'rotate-0'
            } `}
          />
        </button> */}
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
      <GlobalModal
        onClose={() => {
          stakeModalHook.handleClose();
          // dispatch(setStackMoreAmount(0));
          // dispatch(setMoreStackPercentage(0));
          // setClouldk2Slice({
          //   stackMoreToken: '',
          // });
        }}
        isOpen={stakeModalHook.open}
        size="5xl"
      >
        <SingleMachineModalBody id={'1222'} />
      </GlobalModal>

      <GlobalTable
        rows={rows.length ? rows : []}
        headCells={headCells}
        isLoading={false}
        showSort={true}
        tableTitle="Product History"
        // searchIsLoading={false}
        showInnerFilters={true}
        totalPages={Math.ceil(rows.length / 10)}
        // emptyDataMessage="No Machines History!"
        // showTotalRecords={false}
        // searchFieldPlaceholderText="Search"
        // paginationPosition={'right'}
        // rowBorder={true}
        // rounded={true}
        // borderClassName="!border !border-borderLightGray !rounded-lg !shadow"
        // searchClassName="!font-normal"
        // showSearch={false}
        // pagination={false}
        // showFilters={false}
        // headStyles="text-cardSecondaryText !font-normal"
        // filterSearchClassName="text-xs text-blueGrey h-max !bg-transparent"
        // filterSearchBaseClassName="border border-borderLightGray"
        // filterSearchPlaceholderText="Enter TxID"
        // showAccordion={Accordion}
        // setAccordion={setAccordion}
        // handlePageChange={(page) => {
        //   // setFilters({ ...filters, page });
        // }}
        // openModal={(id: string) => {
        //   // machineDetailHook.handleOpen();
        //   // setMachineId(id);
        // }}
        // tableContainerClassname=""
      />

      {/* <div className="flex flex-col gap-5 sm:hidden overflow-x-auto">
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
      </div> */}
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
