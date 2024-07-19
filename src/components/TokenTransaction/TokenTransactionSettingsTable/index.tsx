import { useNavigate } from 'react-router-dom';
import { edit } from '../../../images/other';
import { TokenTransactionSettingType } from '../../../store/token/tokenSlice';
import GlobalTable from '../../Table/GlobalTable';
import { Chip, Tooltip } from '@mui/material';
import TokenNameWithLogo from '../../TokenNameWithLogo';
import { CapitalizeAllLetters, CapitalizeFirstLetter } from '../../../utils/utils';

type Props = {
  data: TokenTransactionSettingType[];
  loading: boolean;
};

const headCells = [
  // { id: 'tokenName', label: 'Token Name', headCellClass: 'w-32 ' },
  { id: 'trxProcess', label: 'Trx. Process', headCellClass: '' },
  { id: 'processType', label: 'Trx. Process Type', headCellClass: '' },
  { id: 'minimumTrxAmount', label: 'Min. Trx. Amount', headCellClass: '' },
  { id: 'maximumTrxAmount', label: 'Max. Trx. Amount', headCellClass: '' },

  // { id: 'dailyTrxCountLimit', label: 'Daily Trx. Count Limit', headCellClass: '' },
  // { id: 'dailyAmountLimit', label: 'Daily Amount Limit', headCellClass: '' },
  { id: 'fee', label: 'Fee', headCellClass: 'w-24 ' },
  { id: 'feeType', label: 'Fee Type', headCellClass: 'w-32' },
  { id: 'charges', label: 'Charges', headCellClass: 'w-24 ' },
  { id: 'chargesType', label: 'Charges Type', headCellClass: 'w-32' },
  { id: 'actions', label: 'Actions', headCellClass: 'text-center w-24 ' },
];

const TokenTransactionSettingsTable = ({ data, loading }: Props) => {
  const navigate = useNavigate();

  const rows = data?.map((_data) => {
    return {
      tokenName: <TokenNameWithLogo tokenName={_data.name ?? ''} />,
      trxProcess: CapitalizeFirstLetter(_data?.trxSettings?.trxType),
      processType: CapitalizeFirstLetter(_data?.trxSettings?.processType),
      minimumTrxAmount: _data?.trxSettings?.minAmount ?? 'Unlimited',
      maximumTrxAmount: _data?.trxSettings?.maxAmount ?? 'Unlimited',

      // dailyTrxCountLimit: _data.dailyTrxCountLimit ?? 'Unlimited',
      // dailyAmountLimit: _data.dailyAmountLimit ?? 'Unlimited',
      fee: _data.trxSettings?.fee,
      feeType: (
        <Chip
          label={CapitalizeFirstLetter(_data?.trxSettings?.feeType)}
          size="small"
          sx={{ fontSize: '11px', color: 'white' }}
          color={_data.feeType === 'fixed' ? 'default' : 'primary'}
        ></Chip>
      ),
      charges: _data.trxSettings?.charges,
      chargesType: (
        <Chip
          label={CapitalizeFirstLetter(_data?.trxSettings?.chargesType)}
          size="small"
          sx={{ fontSize: '11px', color: 'white' }}
          color={_data.feeType === 'fixed' ? 'default' : 'primary'}
        ></Chip>
      ),

      actions: (
        <div className="flex justify-center">
          <Tooltip title="Edit">
            <img
              src={edit}
              width={24}
              height={24}
              alt="Edit Icon"
              onClick={() =>
                navigate(`/tokens/settings/${_data?.trxSettings?.trxType?.toLowerCase()}/details/${_data._id}`, {
                  state: _data,
                })
              }
              className="cursor-pointer"
            />
          </Tooltip>
        </div>
      ),
    };
  });

  return (
    // TABLE
    <>
      <GlobalTable rows={rows} headCells={headCells} isLoading={loading} paginate={false} />
    </>
  );
};

export default TokenTransactionSettingsTable;
