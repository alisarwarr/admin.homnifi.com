import { useNavigate } from 'react-router-dom';
import { edit } from '../../../images/other';
import { Token } from '../../../store/token/tokenSlice';
import GlobalTable from '../../Table/GlobalTable';
import { Tooltip } from '@mui/material';
import StatusChip from '../../StatusChip';
import TokenNameWithLogo from '../../TokenNameWithLogo';

type Props = {
  data: Token[];
  loading: boolean;
};

const headCells = [
  { id: 'name', label: 'Name' },
  { id: 'symbol', label: 'Sybmol' },
  { id: 'depositEnabled', label: 'Deposit' },
  { id: 'withdrawEnabled', label: 'Withdraw' },
  { id: 'toSwapEnabled', label: 'Swap To' },
  { id: 'fromSwapEnabled', label: 'Swap From' },
  { id: 'actions', label: 'Actions', headCellClass: 'text-center' },
];

const TokensTable = ({ data, loading }: Props) => {
  const navigate = useNavigate();

  const rows = data?.map((_data) => {
    console.log('🚀 ~ rows ~ _data:', _data);
    return {
      name: <TokenNameWithLogo tokenName={_data.name} />,
      symbol: _data.symbol,
      depositEnabled: <StatusChip status={_data.settings.depositEnabled} />,
      withdrawEnabled: <StatusChip status={_data.settings.withdrawEnabled} />,
      // canTopup: <StatusChip status={_data.canTopup} />,
      // allowNegativeBalance: <StatusChip status={_data.allowNegativeBalance} />,
      toSwapEnabled: <StatusChip status={_data.settings.toSwapEnabled} />,
      fromSwapEnabled: <StatusChip status={_data.settings.fromSwapEnabled} />,
      actions: (
        <div className="flex justify-start">
          <Tooltip title="Edit Token">
            <img
              src={edit}
              width={24}
              height={24}
              color='red'
              alt="View Icon"
              onClick={() => navigate(`/tokens/details/${_data._id}`)}
              className="cursor-pointer"
            />
          </Tooltip>
        </div>
      ),
    };
  });

  return (
    // TABLE
    <GlobalTable rows={rows} headCells={headCells} isLoading={loading} paginate={false} />
  );
};

export default TokensTable;
