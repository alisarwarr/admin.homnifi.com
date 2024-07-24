import { useEffect, useState } from 'react';
// REDUX
import { useSelector } from 'react-redux';

// COMMON
import { refresh } from '../../../images/other';
import { useHistoryActions } from '../../../store/wallet/historyActions';
import { selectHistorySlice } from '../../../store/wallet/historySlice';
import GlobalTable from '../../../components/Table/GlobalTable';
import moment from 'moment';
import StatusChip from '../../../components/StatusChip';
import TokenNameWithLogo from '../../../components/TokenNameWithLogo';
import GlobalSelect from '../../../components/Global/GlobalSelect';
import GlobalInput from '../../../components/Global/GlobalInput';

const headCells = [
  { id: 'requestId', label: 'ID', show: true },
  { id: 'user', label: 'User Email', show: true },
  { id: 'createdAt', label: 'Date', show: true },
  { id: 'toWallet', label: 'To Wallet', show: true },
  { id: 'amount', label: 'Amount', show: true },
  { id: 'hash', label: 'Fee', show: true },
  { id: 'status', label: 'Status', show: true, dataClass: 'text-center' },
];

type FILTER = {
  page: number;
  limit: number;
  query: string | null;
  status: string | null;
};

const DepositHistory = () => {
  const { getDepositHistoryRequests } = useHistoryActions();
  const { depositHistory } = useSelector(selectHistorySlice);
  console.log('🚀 ~ DepositHistory ~ depositHistory:', depositHistory);
  const [columns, setColumns] = useState<any[]>(headCells);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FILTER>({
    page: 1,
    limit: 10,
    query: null,
    status: null,
  });

  const rows = depositHistory?.list?.map((_data, index) => {
    return {
      requestId: _data?.requestId,
      user: _data?.user?.email,
      createdAt: moment(_data?.createdAt).format('MMM, DD YYYY hh:mm'),
      toWallet: (
        <TokenNameWithLogo
          tokenName={_data?.toWallet?.token?.name}
          src={_data?.toWallet?.token?.iconUrl}
        />
      ),
      amount: _data?.amount,
      status: <StatusChip status={_data?.transactionStatus} />,
      hash: _data.hash,
    };
  });

  const getCsvData = () => {
    // GET THE SELECTED COLUMNS
    const showKeys: any = [];
    columns.forEach((cell: any) => {
      if (cell.show && cell.id !== 'id') showKeys.push(cell.id);
    });

    const csvData: any[] = [];

    // GET DATA FOR SELECTED COLUMN IN EACH ROW
    for (const row of depositHistory.list) {
      const data: any = {};
      const _data = {
        ...row,
        user: `${row?.user?.firstName ? row?.user?.firstName : ''} ${row?.user?.lastName ? row?.user?.lastName : '-'}`,
        createdAt: moment(row?.createdAt).format('MMM, DD YYYY hh:mm'),
        fromToken: row?.wallet?.token?.name ?? '',
        wallet: '',
        fee: row?.fee.toString(),
        requestDate: moment(row?.createdAt).format('MMM, DD YYYY hh:mm'),
      };
      showKeys.forEach((key) => (data[key] = _data[key] || ''));
      csvData.push(data);
    }

    return csvData;
  };

  useEffect(() => {
    setLoading(true);
    getDepositHistoryRequests(true, filter);
    setLoading(false);
  }, [filter.limit, filter.page, filter.query, filter.status]);

  useEffect(() => {
    if (filter.query !== null) {
      const search = setTimeout(async () => {
        await getDepositHistoryRequests(true, filter);
      }, 400);
      return () => clearTimeout(search);
    }
  }, [filter.query]);

  const filterData = [
    {
      placeholder: 'Status',
      text: 'All',
      name: 'status',
      options: [
        { label: 'All', value: null },
        { label: 'Pending', value: 'pending' },
        { label: 'Success', value: 'success' },
        { label: 'Failed', value: 'failed' },
      ],
    },
  ];

  const onFilterStateHandler = (name: string, value: string) => {
    console.log('🚀 ~ onFilterStateHandler ~ value:', value, name);
    setFilter((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onResetFilter = () => {
    setFilter({
      page: 1,
      limit: 10,
      query: null,
      status: null,
    });
  };

  return (
    <div className="w-full px-2">
      <div className="flex bg-primary items-center text-white">
        <h1 className="flex-1 font-bold text-2xl px-3 py-1">Deposit History</h1>
        <div
          className="flex gap-1 items-center cursor-pointer px-3"
          onClick={async () => {
            setLoading(true);
            await getDepositHistoryRequests(true, filter);
            setLoading(false);
          }}
        >
          <img src={refresh} alt="refresh" width={24} height={24} />
          <span>Refresh</span>
        </div>
      </div>

      <div className="flex flex-row   justify-center items-center gap-5 p-2">
        {/* <div className="flex gap-x-2 items-center flex-wrap !w-full"> */}
        <div className="">
          <GlobalInput
            type="string"
            name="search"
            required={false}
            label="Search"
            placeholder="Search"
            className="!w-96"
            value={filter['query']}
            onChange={(e) => {
              onFilterStateHandler('query', e.target.value);
            }}
            isError={false}
          />
        </div>
        <div className="flex flex-row w-full gap-5 ">
          {filterData.map((dt: any, index) => {
            console.log('🚀 ~ {filterData.map ~ dt:', filter[dt.name]);
            return (
              <GlobalSelect
                key={index}
                labelOptionClass={'text-left'}
                name={dt.name}
                label={dt.placeholder}
                placeholder={dt.placeholder}
                options={dt.options}
                isError={false}
                value={filter[dt.name] || ''}
                onChange={(e) => {
                  console.log('🚀 ~ {filterData.map ~ e:', e);
                  onFilterStateHandler(dt.name, e);
                }}
                containerClassnames=" xs:max-w-44 w-full"
              />
            );
          })}
        </div>
        <div className="flex items-center  mt-5">
          <p
            onClick={onResetFilter}
            className="text-primary px-4 font-normal cursor-pointer"
          >
            Reset
          </p>
        </div>
        {/* </div> */}
      </div>

      <GlobalTable
        rows={rows}
        headCells={columns?.filter((itm) => itm?.show === true)}
        isLoading={loading}
        totalPages={depositHistory?.totalPages}
        page={filter.page}
        handlePageChange={(page) => {
          setFilter({ ...filter, page });
        }}
        handleLimitChange={(limit) => {
          setFilter({ ...filter, limit });
        }}
        setColumns={setColumns}
        ColumnsList={columns}
        filter={filter}
        setFilter={setFilter}
        csvData={getCsvData}
      />
    </div>
  );
};

export default DepositHistory;
