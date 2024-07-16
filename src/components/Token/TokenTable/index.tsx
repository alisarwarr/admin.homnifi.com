import { useNavigate } from 'react-router-dom';
import { edit } from '../../../images/other';
import { Token } from '../../../store/token/tokenSlice';
import GlobalTable from '../../Table/GlobalTable';
import { Tooltip } from '@mui/material';
import StatusChip from '../../StatusChip';
import TokenNameWithLogo from '../../TokenNameWithLogo';
import { displayName } from 'react-quill';
import { ReactComponent as DeleteIcon } from '../../../SVGIcons/deleteIcon.svg';

type Props = {
  // data: Token[];
  data: any[];
  loading: boolean;
  onEditHanlder: Function;
};

const headCells = [
  { id: 'id', label: 'Id' },
  { id: 'name', label: 'Name' },
  { id: 'displayName', label: 'Display Name' },
  { id: 'type', label: 'Type' },
  { id: 'rate', label: 'Rate' },
  { id: 'actions', label: 'Actions', headCellClass: 'text-center' },
];

const copyIconList = ['id'];

const TokensTable = ({ data, loading, onEditHanlder }: Props) => {
  const navigate = useNavigate();

  const rows = data?.map((_data) => {
    return {
      id: _data.id,
      name: _data.name,
      displayName: _data.displayName,
      type: _data.type,
      rate: _data.rate,
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
          <div className="w-6 h-6 bg-primaryRed flex justify-center items-center rounded-md text-white cursor-pointer mx-2">
            <Tooltip title="Delete Token">
              <DeleteIcon />
            </Tooltip>
          </div>
        </div>
      ),
    };
  });

  return (
    // TABLE
    <GlobalTable rows={rows} headCells={headCells} isLoading={loading} paginate={false} copyIconList={copyIconList} />
  );
};

export default TokensTable;
