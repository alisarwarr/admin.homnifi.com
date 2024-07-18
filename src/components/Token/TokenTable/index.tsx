import { useNavigate } from 'react-router-dom';
import { edit } from '../../../images/other';
import { selectToken, Token } from '../../../store/token/tokenSlice';
import GlobalTable from '../../Table/GlobalTable';
import { Tooltip } from '@mui/material';
import { ReactComponent as Delete } from '../../../SVGIcons/deleteIcon.svg';
import { useSelector } from 'react-redux';

type Props = {
  // data: Token[];
  data: any[];
  loading: boolean;
  onEditHanlder: Function;
  onDeleteToken: Function;
};

const headCells = [
  { id: 'id', label: 'Id' },
  { id: 'name', label: 'Name' },
  { id: 'symbol', label: 'Symbol' },
  { id: 'actions', label: 'Actions', headCellClass: 'text-center' },
];

const TokensTable = ({ data, loading, onEditHanlder, onDeleteToken }: Props) => {
  const { tokensList } = useSelector(selectToken);
  const navigate = useNavigate();

  const rows = tokensList?.map((_data, index: number) => {
    return {
      id: index + 1,
      name: _data.name,
      symbol: _data.symbol,
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
          <div className="w-6 h-6 flex justify-center items-center rounded-md text-white cursor-pointer mx-2">
            <Tooltip title="Delete Token">
              <div
                onClick={() => {
                  onDeleteToken(_data);
                }}
              >
                <Delete />
              </div>
            </Tooltip>
          </div>
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
