import { useNavigate } from 'react-router-dom';
import { edit } from '../../images/other';
import GlobalTable from '../Table/GlobalTable';
import { Tooltip } from '@mui/material';
import StatusChip from '../StatusChip';
import { FAQ } from '../../store/wallet/faqs/faqSlice';

type Props = {
  data: {
    list: FAQ[];
    paginate: any;
  };
  loading: boolean;
  page: number;
  setPage: (_: any) => void;
};

const headCells = [
  // { id: 'name', label: 'Name', dataClass: 'w-32' },
  { id: 'question', label: 'Question' },
  { id: 'url', label: 'Answer' },
  { id: 'type', label: 'Transaction Type' },
  // { id: 'image', label: 'Image' },
  { id: 'status', label: 'Status', dataClass: 'text-center' },
  { id: 'actions', label: 'Actions', headCellClass: 'text-center' },
];

const FaqTable = ({ data, loading, page, setPage }: Props) => {
  const navigate = useNavigate();

  const rows = data?.list?.map((_data) => {
    return {
      question: _data?.question,
      url: _data?.url,

      status: <StatusChip status={_data.status} />,
      actions: (
        <div className="flex justify-center">
          <Tooltip title="Edit Product">
            <img
              src={edit}
              width={24}
              height={24}
              alt="Edit Icon"
              onClick={() => navigate(`/products/details/${_data?._id}`)}
              className="cursor-pointer"
            />
          </Tooltip>
        </div>
      ),
    };
  });

  return (
    // TABLE
    <GlobalTable rows={rows} headCells={headCells} isLoading={loading} page={page} handlePageChange={setPage} />
  );
};

export default FaqTable;
