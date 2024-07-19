import { Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';
import { edit } from '../../../images/other';
import { useNavigate } from 'react-router-dom';
import GlobalTable from '../../Table/GlobalTable';
import { selectToken, Token } from '../../../store/token/tokenSlice';

type Props = {
  // data: Token[];
  data: any[];
  loading: boolean;
  onEditHanlder: Function;
};

// table heading
const headCells = [
  { id: 'id', label: 'Id' },
  { id: 'name', label: 'Name' },
  { id: 'symbol', label: 'Symbol' },
  { id: 'type', label: 'Type' },
  { id: 'withdrawType', label: 'Withdraw Type' },
  { id: 'color', label: 'Color' },
  { id: 'iconUrl', label: 'Icon Url' },
  { id: 'networkList', label: 'networkList' },
  { id: 'actions', label: 'Actions', headCellClass: 'text-center' },
];

const TokensTable = ({ data, loading, onEditHanlder }: Props) => {
  const { tokensList } = useSelector(selectToken);

  //table rows data format here
  const rows = tokensList?.map((_data, index: number) => {
    return {
      id: index + 1,
      name: _data.name,
      color: _data?.color ?? '-',
      symbol: _data?.symbol,
      type: _data.type ?? '-',
      iconUrl: `${_data?.iconUrl?.slice(0, 30)} ${_data?.iconUrl && _data?.iconUrl?.length > 30 ? ' ...' : ''}` ?? '-',
      withdrawType: _data?.withdrawType ?? '-',
      networkList: _data?.networks?.map((dt: any) => dt.name).join(', '),
      actions: (
        <div className="flex justify-start">
          <Tooltip title="Edit Token">
            <img
              src={edit}
              width={24}
              height={24}
              color="red"
              alt="View Icon"
              onClick={() => {
                onEditHanlder(_data);
              }}
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
