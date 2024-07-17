import { useEffect, useState } from 'react';
// REDUX
import { useSelector } from 'react-redux';

// COMMON
import { refresh } from '../../../images/other';

import GlobalTable from '../../../components/Table/GlobalTable';

import { getTableIndexNumber } from '../../../utils/utils';
import GlobalInput from '../../../components/Global/GlobalInput';
import GlobalButton from '../../../components/Global/GlobalButton';
import { useCloudActions } from '../../../store/cloudk/cloudk.action';
import { selectCloudkSlice } from '../../../store/cloudk/cloudk.slice';
import GlobalModal from '../../../components/Global/GlobalModal';
import CloneModalContent from './_components/CloneModal';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const headCells = [
  { id: 'id', label: 'ID', show: true },
  { id: 'dropPercentage', label: '% Fall in the LYK Price', show: true },
  { id: 'productionDecreasePercentage', label: 'Decrease Producation', show: true },
  { id: 'increaseDLPPercentage', label: 'Increase DLP', show: true },
  { id: 'mintingBoost', label: 'Minting Boost', show: true },
];
type FILTER = {
  page: number;
  limit: number;
  search: string | null;
};
const InflationRules = () => {
  //   const { getDepositHistoryRequests } = useHistoryActions();
  const { getInfalationRules } = useCloudActions();
  const { infalationRules } = useSelector(selectCloudkSlice);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [columns, setColumns] = useState<any[]>(headCells);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FILTER>({
    page: 1,
    limit: 10,
    search: null,
  });
  const [cloneRows, setCloneRows] = useState();

  const rows = infalationRules?.[0]?.rules?.map((_data, index) => {
    console.log('🚀 ~ rows ~ _data:', _data.mintingBoost);
    return {
      id: getTableIndexNumber(filter.page, index, filter.limit),
      dropPercentage: _data?.dropPercentage,
      productionDecreasePercentage: _data.productionDecreasePercentage,
      increaseDLPPercentage: _data.increaseDLPPercentage,
      mintingBoost: _data.mintingBoost,
    };
  });

  useEffect(() => {
    setLoading(true);
    getInfalationRules();
    setLoading(false);
  }, [filter.limit, filter.page]);




  useEffect(() => {
    if (filter.search !== null) {
      const search = setTimeout(async () => {
        await getInfalationRules();
      }, 400);
      return () => clearTimeout(search);
    }
  }, [filter.search]);

  const handleSave = (values: any) => {
    
    console.log('🚀 ~ InflationRules ~ values:', values);
  };

  return (
    <div className="w-full px-2">
      <div className="flex bg-primary items-center  text-white">
        <h1 className="flex-1 font-bold text-2xl px-3 py-1">Inflation Rules</h1>
        <div className="flex gap-1 items-center cursor-pointer px-3">
          <img src={refresh} alt="" width={24} height={24} />
          <span>Refresh</span>
        </div>
      </div>

      <section className="flex  flex-row gap-5 justify-end items-center py-5">
        <div>
          <GlobalButton onClick={() => setIsModalOpen(true)} type="button" text="Clone" classNames="!w-52" />
        </div>
      </section>

      <GlobalTable
        rows={rows}
        headCells={columns?.filter((itm) => itm?.show === true)}
        isLoading={loading}
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
        // showInnerFilters={true}
        // csvData={getCsvData}
      />

      <GlobalModal size="5xl" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Clone Inflation Rules">
        <CloneModalContent rows={rows} setCloneRows={setCloneRows} handleSave={handleSave} />
      </GlobalModal>
    </div>
  );
};

export default InflationRules;
