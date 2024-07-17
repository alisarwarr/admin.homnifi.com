import { useState } from 'react';
import { MachineImage } from '../../../../images/cloud';
import { ArrowDownSvg, CopyIcon, DeleteIcon, InfoIcon } from '../../../../images/svg';
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
import { edit } from '../../../../images/other';
import { TProduct } from '../../../../store/products/productSlice';

type FILTER = {
  page: number;
  limit: number;
  search: string | null;
};
interface RenderProductHistoryProps {
  products: TProduct[];
}

const RenderProductHistory: React.FC<RenderProductHistoryProps> = ({ products }) => {
  const [productID, setProductID] = useState('');
  const stakeModalHook = useModalHook();
  const machineDetailHook = useModalHook();

  const headCells = [
    {
      id: 'product',
      label: 'Product',
      dataClass: 'w-72',
    },
    {
      id: 'externalProductId',
      label: 'Ex Product ID ',
      dataClass: 'w-44',
    },

    {
      id: 'mintingPowerPerc',
      label: 'Minting Power (%)',
      dataClass: 'w-40',
    },
    {
      id: 'stakeLimit',
      label: 'Stake Limit',
      dataClass: 'w-40',
    },
    {
      id: 'licenseName',
      label: 'License Name',
      dataClass: 'w-40',
    },
    {
      id: 'capping',
      label: 'Capping',
      dataClass: 'w-40',
    },
    {
      id: 'tokenAirdrop',
      label: 'Token AirDrop',
      dataClass: 'w-40',
    },
    {
      id: 'airdropPromo',
      label: 'Airdrop Promo',
      dataClass: 'w-40',
    },
    {
      id: 'superNodeLevel',
      label: 'Super Node Lvl',
      dataClass: 'w-40',
    },
    {
      id: 'bonus',
      label: 'Bonus',
      dataClass: 'w-40',
    },
    {
      id: 'quickActions',
      label: 'Actions',
      dataClass: 'w-40',
    },
  ];

  const rows = products.map((product, i) => ({
    id: product._id,
    product: (
      <div className="font-medium flex flex-row  text-sm gap-2 items-center text-defaultBlack">
        <span className="relative flex h-2 w-2">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              true ? 'bg-primaryGreen' : 'bg-primaryRed'
            }`}
          ></span>
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${true ? 'bg-primaryGreen' : 'bg-primaryRed'}`}
          ></span>
        </span>
        <img src={product.imageUrl} alt="Machine" className="w-20 bg-black" />

        <span className="w-24">{product.name}</span>
      </div>
    ),
    externalProductId: <span className="font-medium ">{product.externalProductId}</span>,
    mintingPowerPerc: <span className="font-medium "> {product.mintingPowerPerc}%</span>,
    stakeLimit: <span className="font-medium "> {product.stakeLimit}</span>,
    licenseName: <span className="font-medium "> {product.licenseName}</span>,
    capping: <span className="font-medium "> {product.capping !== null ? product.capping : 'Unlimited'}</span>,
    bonus: <span className="font-medium "> {product.bonus}</span>,
    tokenAirdrop: <span className="font-medium "> {product.tokenAirdrop}</span>,

    airdropPromo: <span className="font-medium "> {product.airdropPromo}</span>,
    superNodeLevel: <span className="font-medium "> {product.superNodeLevel || 0}</span>,

    // claimableRewards: <span className=" font-medium">$ {trx.claimableRewards.toLocaleString()}</span>,
    quickActions: (
      <div className="flex justify-start">
        <img
          src={edit}
          width={24}
          height={24}
          color="red"
          alt="View Icon"
          onClick={() => {
            // onEditHanlder(_data);
          }}
          className="cursor-pointer"
        />

        <div className="w-6 h-6 flex justify-center items-center rounded-md text-white cursor-pointer mx-2">
          <DeleteIcon />
        </div>
        <InfoIcon onClick={() => (setProductID(product._id), stakeModalHook.handleOpen())} className="cursor-pointer" />
      </div>
    ),
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
        <SingleMachineModalBody id={productID} />
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

export default RenderProductHistory;
