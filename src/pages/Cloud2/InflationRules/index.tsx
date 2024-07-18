import { useEffect, useState } from 'react';
// REDUX
import { useSelector } from 'react-redux';

// COMMON
import { refresh } from '../../../images/other';

import GlobalTable from '../../../components/Table/GlobalTable';

import { getTableIndexNumber } from '../../../utils/utils';
import { useCloudActions } from '../../../store/cloudk/cloudk.action';
import { selectCloudkSlice } from '../../../store/cloudk/cloudk.slice';
import GlobalModal from '../../../components/Global/GlobalModal';
import CloneModalContent from './_components/CloneModal';
import { useFormik } from 'formik';
import useLoading from '../../../utils/hooks/useLoading';
import GlobalSelect from '../../../components/Global/GlobalSelect';
import GlobalAccordian from '../../../components/Accordian';
import { AccordionItem } from '@nextui-org/react';

const headCells = [
  { id: 'id', label: 'ID', show: true, rowDataClass: '!py-1' },
  { id: 'dropPercentage', label: '% Fall in the LYK Price', show: true, rowDataClass: '!py-1' },
  { id: 'productionDecreasePercentage', label: 'Decrease Producation', show: true, rowDataClass: '!py-1' },
  { id: 'increaseDLPPercentage', label: 'Increase DLP', show: true, rowDataClass: '!py-1' },
  { id: 'mintingBoost', label: 'Minting Boost', show: true, rowDataClass: '!py-1' },
];
type FILTER = {
  page: number;
  limit: number;
  search: string | null;
};

const InflationRules = () => {
  const { getInfalationRules, createInfalationRules, getCurrentInfalationRules } = useCloudActions();
  const { infalationRules, currentinfalationRules } = useSelector(selectCloudkSlice);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [selectValue, setSelectValue] = useState('');
  const [columns, setColumns] = useState<any[]>(headCells);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FILTER>({
    page: 1,
    limit: 10,
    search: null,
  });

  const rows = currentinfalationRules?.rules?.map((_data, index) => {
    return {
      id: getTableIndexNumber(filter.page, index, filter.limit),
      dropPercentage: _data?.dropPercentage,
      productionDecreasePercentage: _data.productionDecreasePercentage,
      increaseDLPPercentage: _data.increaseDLPPercentage,
      mintingBoost: _data.mintingBoost,
    };
  });

  const [cloneRows, setCloneRows] = useState<any>(rows); // Ensure cloneRows is always an array

  useEffect(() => {
    startLoading();
    getInfalationRules();
    getCurrentInfalationRules();
    stopLoading();
  }, [filter.limit, filter.page]);

  useEffect(() => {
    if (filter.search !== null) {
      const search = setTimeout(async () => {
        await getInfalationRules();
        getCurrentInfalationRules();
      }, 400);
      return () => clearTimeout(search);
    }
  }, [filter.search]);

  const handleSave = (values: any) => {
    startLoading();
    const resp: any = createInfalationRules(values);
    setIsModalOpen(false);
    stopLoading();
  };

  const handledropDown = (value: string) => {
    if (value === 'create_new_rules') {
      setCloneRows([{ dropPercentage: 0, productionDecreasePercentage: 0, increaseDLPPercentage: 0, mintingBoost: 0 }]);
    } else if (value === 'clone_pervious_rules') {
      console.log(selectValue === 'clone_pervious_rules', selectValue);
      setCloneRows(rows);
    }
    setIsModalOpen(true);
  };

  return (
    <div className="w-full px-2">
      <div className="flex bg-primary items-center  text-white">
        <h1 className="flex-1 font-bold text-2xl px-3 py-1">Inflation Rules</h1>
        <div className="flex gap-1 items-center cursor-pointer px-3">
          <img src={refresh} alt="refresh" width={24} height={24} />
          <span>Refresh</span>
        </div>
      </div>

      <section className="flex  flex-row gap-5 justify-end items-center py-5">
        <div>
          <GlobalSelect
            // label="Clone/Create Rules"
            name="clone_create_rules"
            placeholder="Clone/Create Rules"
            options={[
              { label: 'Clone  Pervious Rules', value: 'clone_pervious_rules' },
              { label: 'Create New Rules', value: 'create_new_rules' },
            ]}
            isError={false}
            value={selectValue}
            inputClass="!w-72 !bg-primary !text-white"
            onChange={(value) => handledropDown(value)}
          />
        </div>
      </section>
      <h1 className="flex-1 font-semibold text-2xl px-3 py-5 ">
        {currentinfalationRules?.inflation.name}{' '}
        <span className="text-sm px-2">{`(${currentinfalationRules?.inflation.adminNote})`}</span>
      </h1>

      <GlobalTable
        rows={rows}
        headCells={columns?.filter((itm) => itm?.show === true)}
        isLoading={isLoading}
        paginate={false}

        // showInnerFilters={true}
        // csvData={getCsvData}
      />

      <GlobalModal size="5xl" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Inflation Rules">
        <CloneModalContent loading={isLoading} rows={cloneRows} setCloneRows={setCloneRows} handleSave={handleSave} />
      </GlobalModal>

      <h1 className="flex-1 font-semibold text-2xl px-3 py-5">All Inflation Rules</h1>

      <div className="bg-white rounder-lg p-2">
        {infalationRules.map((e, ind) => {
          const rows = e?.rules?.map((_data, index) => {
            return {
              id: getTableIndexNumber(filter.page, index, filter.limit),
              dropPercentage: _data?.dropPercentage,
              productionDecreasePercentage: _data.productionDecreasePercentage,
              increaseDLPPercentage: _data.increaseDLPPercentage,
              mintingBoost: _data.mintingBoost,
            };
          });
          return (
            <GlobalAccordian
              selectionMode="single"
              headingClassName="bg-gradient-white rounded-lg text-lg text-defaultBlack font-medium px-4 border-b border-borderBlue"
            >
              <AccordionItem
                key={e?.inflation?.name}
                aria-label={e?.inflation?.name}
                title={`${e?.inflation?.name} ( ${e?.inflation?.adminNote} )`}
              >
                <GlobalTable
                  rows={rows}
                  headCells={columns?.filter((itm) => itm?.show === true)}
                  isLoading={isLoading}
                  paginate={false}

                  // showInnerFilters={true}
                  // csvData={getCsvData}
                />
              </AccordionItem>
            </GlobalAccordian>
          );
        })}

        {}
      </div>
    </div>
  );
};

export default InflationRules;
