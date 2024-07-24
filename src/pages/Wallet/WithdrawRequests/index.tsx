import { useEffect, useState } from 'react';
// REDUX
import { useSelector } from 'react-redux';

// COMMON
import { refresh } from '../../../images/other';
import { useWalletActions } from '../../../store/wallet/walletActions';
import { selectWalletSlice } from '../../../store/wallet/walletSlice';
import WithdrawRequestsTable from '../../../components/Wallet/WithdrawRequestTable';
import GlobalSelect from '../../../components/Global/GlobalSelect';
import FormikInput from '../../../components/FormikInput';
import GlobalInput from '../../../components/Global/GlobalInput';

type FILTER = {
  page: number;
  limit: number;
  query: string | null;
  status: string | null;
  type: string | null;
};

const WithdrawRequests = () => {
  const { getWithdrawRequests } = useWalletActions();
  const { withdrawRequests } = useSelector(selectWalletSlice);
  const [filter, setFilter] = useState<FILTER>({
    page: 1,
    limit: 10,
    query: null,
    status: null,
    type: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getWithdrawRequests(true, filter);
      setLoading(false);
    })();
  }, [filter]);

  useEffect(() => {
    if (filter.query !== null) {
      const search = setTimeout(async () => {
        await getWithdrawRequests(true, filter);
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
        { label: 'Approved', value: 'approved' },
        { label: 'Completed', value: 'completed' },
        { label: 'Pending for Admin', value: 'pending-for-admin' },
        { label: 'Rejected and Reimbursed', value: 'rejected-and-reimbursed' },
        {
          label: 'On Chain Failure and Reimbursed',
          value: 'on-chain-failure-and-reimbursed',
        },
      ],
    },

    {
      placeholder: 'Type',
      text: 'All',
      name: 'type',
      options: [
        { label: 'All', value: null },
        { label: 'External', value: 'external' },
        { label: 'Internal', value: 'internal' },
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
      type: null,
    });
  };

  return (
    <div className="w-full px-2">
      {/* PAGE TITLE */}
      <div className="flex bg-primary items-center  text-white">
        <h1 className="flex-1 font-bold text-2xl px-3 py-1">
          Withdraw Requests
        </h1>

        <div
          className="flex gap-1 items-center cursor-pointer px-3"
          onClick={async () => {
            setLoading(true);
            await getWithdrawRequests(true);
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
                setFieldTouched={() => {}}
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

      {/* TABLE */}
      <WithdrawRequestsTable
        data={withdrawRequests}
        loading={loading}
        filter={filter}
        setFilter={setFilter}
      />
    </div>
  );
};

export default WithdrawRequests;
