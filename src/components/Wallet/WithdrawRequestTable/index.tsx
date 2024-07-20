import GlobalTable from '../../Table/GlobalTable';
import { WithdrawRequest } from '../../../store/wallet/walletSlice';
import GlobalDialog from '../../Dialog';
import UpdateRequest from '../UpdateRequest';
import { useState } from 'react';
import { WALLET_ACTIONS } from '../../../constants';
import moment from 'moment';
import WithdrawActionButton from '../WithdrawActionButton';
import TokenNameWithLogo from '../../TokenNameWithLogo';

export const statusDisplay = {
  pending: {
    label: 'Pending',
    color: 'blue',
  },
  approved: {
    label: 'Approved',
    color: 'green',
  },
  'on-chain-failure-and-reimbursed': {
    label: 'Failed Onchain',
    color: 'red',
  },
  'rejected-and-reimbursed': {
    label: 'Rejected and Reimbursed',
    color: 'black',
  },
  'pending-for-admin': {
    label: 'Approval Pending',
    color: 'orange',
  },
  completed: {
    label: 'Approval Pending',
    color: '#22bb33',
  },
};

type Props = {
  data: {
    list: WithdrawRequest[];
    currentPage: any;
    totalCount: any;
    totalPages: any;
  };
  loading: boolean;
  filter: any;
  setFilter: (_: any) => void;
};

const headCells = [
  { id: 'requestId', label: 'Hash Id', dataClass: 'min-w-32', show: true },
  { id: 'user', label: 'User Email', dataClass: 'min-w-24', show: true },
  {
    id: 'requestDate',
    label: 'Request Date',
    dataClass: 'min-w-36',
    show: true,
  },
  { id: 'token', label: 'Token', dataClass: 'min-w-24', show: true },
  { id: 'network', label: 'Network', dataClass: 'min-w-24', show: true },
  {
    id: 'amount',
    label: 'Amount',
    dataClass: 'min-w-32 text-center',
    show: true,
  },
  {
    id: 'actions',
    label: 'Status',
    headCellClass: 'text-center min-w-[100px]',
    show: true,
  },
];

const WithdrawRequestsTable = ({ data, loading, filter, setFilter }: Props) => {
  const [openWithdrawAction, setOpenWithdrawAction] = useState(false);
  const [withdrawAction, setWithdrawAction] = useState<any>();
  const [columns, setColumns] = useState<any[]>(headCells);

  const rows = data?.list?.map((_data: any) => {
    return {
      requestId: _data.requestId,
      user: _data?.user?.email,
      requestDate: moment(_data?.createdAt).format('MMM, DD YYYY hh:mm'),
      token: (
        <TokenNameWithLogo
          tokenName={_data?.token?.name}
          src={_data?.token?.iconUrl}
        />
      ),
      network: _data.network?.name,
      amount: _data.amount,
      actions: (
        <>
          {_data.requestStatus === 'pending-for-admin' ? (
            <div className="flex flex-col screen1500:flex-row justify-center gap-2">
              <WithdrawActionButton
                status={_data.requestStatus}
                onClick={() => {
                  setOpenWithdrawAction(true);
                  setWithdrawAction({
                    type: WALLET_ACTIONS.ACCEPT,
                    id: _data._id,
                  });
                }}
                className=" bg-green-800 hover:bg-green-800/70"
              >
                Complete
              </WithdrawActionButton>

              <WithdrawActionButton
                status={_data.requestStatus}
                onClick={() => {
                  setOpenWithdrawAction(true);
                  setWithdrawAction({
                    type: WALLET_ACTIONS.REJECT,
                    id: _data._id,
                  });
                }}
                className="bg-red-600 hover:bg-red-600/70"
              >
                Reject
              </WithdrawActionButton>
            </div>
          ) : (
            <span
              className="font-bold"
              style={{
                color: statusDisplay[_data.requestStatus]?.color,
              }}
            >
              {statusDisplay[_data.requestStatus]?.label}
            </span>
          )}
        </>
      ),
    };
  });

  const getCsvData = () => {
    // GET THE SELECTED COLUMNS
    const showKeys: any = [];
    columns.forEach((cell: any) => {
      if (cell.show) showKeys.push(cell.id);
    });

    const csvData: any[] = [];

    // GET DATA FOR SELECTED COLUMN IN EACH ROW
    for (const row of data.list) {
      const data: any = {};
      const _data = {
        ...row,
        requestDate: moment(row?.createdAt).format('MMM, DD YYYY hh:mm'),
        user: `${row?.user?.firstName ? row?.user?.firstName : ''} ${row?.user?.lastName ? row?.user?.lastName : '-'}`,
        token: row?.token?.name ?? '',
        network: row?.network.name ?? '',
      };
      showKeys.forEach((key) => (data[key] = _data[key] || ''));
      csvData.push(data);
    }

    return csvData;
  };

  return (
    <>
      <GlobalTable
        rows={rows}
        headCells={columns?.filter((itm) => itm?.show === true)}
        isLoading={loading}
        page={filter.page}
        totalPages={data?.totalPages}
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

      {/* ACTIONS DIALOG */}
      <GlobalDialog
        open={openWithdrawAction}
        title={`${withdrawAction?.type === WALLET_ACTIONS.ACCEPT ? 'Approve' : 'Reject'} Withdraw Request`}
        content={
          <UpdateRequest
            requestFor="WITHDRAW"
            action={withdrawAction}
            onClose={() => {
              setOpenWithdrawAction(false);
            }}
          />
        }
        closeButtonShow={false}
      />
    </>
  );
};

export default WithdrawRequestsTable;
