import GlobalTable from '../../../../components/Table/GlobalTable';
import GlobalModal from '../../../../components/Global/GlobalModal';
import useModalHook from '../../../../utils/hooks/useModalHook';
import SingleMachineModalBody from './SingleMachineModalBody';
import { useCloudActions } from '../../../../store/cloudk/cloudk.action';
import { selectCloudkSlice } from '../../../../store/cloudk/cloudk.slice';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { formatToUpperCase } from '../../../../utils/helper';
import useDebounce from '../../../../utils/hooks/useDebounceHook';

const RenderMachinesHistory = () => {
  const [machineResponse, setMachineResponse] = useState({
    totalCount: 0,
    totalPages: 1,
    currentPage: 1,
    list: [],
  });
  const stakeModalHook = useModalHook();

  const { getUserMachineList } = useCloudActions();
  const { userMachineList, userMachinesLoading } =
    useSelector(selectCloudkSlice);
  const [selectedIndex, setSelectedIndex] = useState('');
  const [filters, setFilters] = useState({
    limit: 10,
    page: 1,
    timeperiod: 'alltime',
    type: 'all',
    search: '',
    totalPages: 1,
  });

  // const [searchValue, setSearchValue] = useState('');
  // const [downloadTransaction, setDownloadTransaction] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);

  const debouncedSearchValue = useDebounce(filters.search, 1000);

  const fetchMachines = async () => {
    const userMachineResponse = await getUserMachineList({
      search: debouncedSearchValue,
      limit: filters.limit,
      page: filters.page,
    });

    setFilters({
      ...filters,
      totalPages: userMachineResponse.data.data.totalPages,
    });

    setMachineResponse({ ...userMachineResponse.data.data });
  };

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
    }

    if ((!initialLoad && userMachineList?.length) || !userMachineList?.length) {
      fetchMachines();
    }
  }, [filters.page, filters.limit, debouncedSearchValue]);

  const headCells = [
    {
      id: 'product',
      label: 'Product',
      dataClass: 'w-[8%]',
    },
    {
      id: 'user',
      label: 'User',
      dataClass: 'w-[8%]',
    },
    {
      id: 'externalProductId',
      label: 'Ex Product ID ',
      dataClass: 'w-[8%]',
    },
    {
      id: 'stakeToken',
      label: 'Stake Token',
      dataClass: 'w-[8%]',
    },
    {
      id: 'stakeLimit',
      label: 'Stake Limit',
      dataClass: 'w-[8%]',
    },
    {
      id: 'mintingPower',
      label: 'Minting Power',
      dataClass: 'w-[8%]',
    },
    {
      id: 'dlp',
      label: 'DLP',
      dataClass: 'w-[8%]',
    },
    {
      id: 'boost',
      label: 'Boost',
      dataClass: 'w-[8%]',
    },
    {
      id: 'autoCompound',
      label: 'Auto Compound',
      dataClass: 'w-[8%]',
    },
    {
      id: 'allTimeHigh',
      label: 'All Time High',
      dataClass: 'w-[8%]',
    },
    {
      id: 'createdAt',
      label: 'Date',
      dataClass: 'w-[8%]',
    },
  ];

  const rows = userMachineList?.map((item) => {
    return {
      _id: item._id,
      product: (
        <div className="font-medium flex justify-center text-sm gap-2 items-center text-defaultBlack">
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                item.status === 'active' ? 'bg-primaryGreen' : 'bg-primaryRed'
              }`}
            ></span>
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${item.status === 'active' ? 'bg-primaryGreen' : 'bg-primaryRed'}`}
            ></span>
          </span>
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="w-20">
              <img
                src={item.imageUrl}
                alt="Machine"
                className="w-full h-full object-cover"
              />
            </div>
            <span>{item.name}</span>
          </div>
        </div>
      ),
      externalProductId: (
        <span className="font-medium truncate">{item.externalMachineId}</span>
      ),
      user: item.user.blockchainId,
      stakeLimit: item.stakeLimit,
      stakeToken: (
        <div className="flex items-center justify-center gap-2">
          <img src={item.stakeToken.iconUrl} className="w-8 h-8" />{' '}
          <span>{item.stakeToken.name}</span>
        </div>
      ),
      mintingPower: item.mintingPower,
      dlp: item.dlp,
      boost: item.boost,
      autoCompound: item.autoCompound ? 'Yes' : 'No',
      allTimeHigh: item.allTimeHigh,
      createdAt: formatToUpperCase(item.createdAt),
    };
  });

  return (
    <>
      <GlobalModal
        onClose={() => {
          stakeModalHook.handleClose();
        }}
        isOpen={stakeModalHook.open}
        size="5xl"
      >
        <SingleMachineModalBody id={selectedIndex} />
      </GlobalModal>

      <GlobalTable
        rows={rows?.length ? rows : []}
        headCells={headCells}
        isLoading={userMachinesLoading}
        showSort={true}
        tableTitle="Product History"
        // searchIsLoading={false}
        showInnerFilters={true}
        imageItems={['imageUrl']}
        totalPages={machineResponse.totalPages}
        handleOpen={(id: string) => {
          setSelectedIndex(id);
          stakeModalHook.handleOpen();
        }}
        filter={filters}
        setFilter={setFilters}
        rowClasNames="cursor-pointer"
        handlePageChange={(page) => {
          setFilters({ ...filters, page });
        }}
        csvData={rows}
        paginate={true}
        filterButtons={<></>}
      />
    </>
  );
};

export default RenderMachinesHistory;
