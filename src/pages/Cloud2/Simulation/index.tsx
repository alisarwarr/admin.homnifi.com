import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useLayoutEffect, useState } from 'react';
import { selectCloudkSlice } from '../../../store/cloudk/cloudk.slice';
import { useCloudActions } from '../../../store/cloudk/cloudk.action';
import { refresh } from '../../../images/other';
import GlobalSelect from '../../../components/Global/GlobalSelect';
import {
  selectSimulationSlice,
  simulationSliceAction,
} from '../../../store/cloudk/simulation';

import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { Spinner } from '../../../images/svg';
import LineChart from './LineChart';
import {
  TChartDataDefs,
  TChartDataFill,
  TChartDataType,
} from '../../../interfaces/lineChart.types';
import GlobalInput from '../../../components/Global/GlobalInput';
import useDebounce from '../../../utils/hooks/useDebounceHook';
import GlobalTable from '../../../components/Table/GlobalTable';
import GlobalSwitch from '../../../components/Global/GlobalSwitch';

const Simulation = () => {
  const {
    getUserMachineList,
    startSimulation,
    getUserSimulationList,
    chnageAutoCompund,
  } = useCloudActions();
  const dispatch = useDispatch();
  const { userMachineList, simulationMachineList } =
    useSelector(selectCloudkSlice);
  const [erroMessage, setErrorMessage] = useState({
    fileError: '',
    collateralError: '',
    selectedMachineError: '',
  });
  const [filters, setFilters] = useState({
    limit: 10,
    page: 1,
    timeperiod: 'alltime',
    type: 'all',
    search: '',
    totalPages: 1,
  });
  const debouncedSearchValue = useDebounce(filters.search, 1000);
  const [isChecked, setIsChecked] = useState(false);
  const {
    machines,
    selectedMachine,
    startSimulationLoading,
    prices,
    collateral,
    simulationData,
  } = useSelector(selectSimulationSlice);
  useEffect(() => {
    getUserSimulationList({
      search: debouncedSearchValue,
      limit: filters.limit,
      page: filters.page,
    });
  }, [selectedMachine]);

  useEffect(() => {
    if (simulationMachineList) {
      if (simulationMachineList?.length > 0 && !selectedMachine) {
        dispatch(
          simulationSliceAction.setSimulationSlice({
            selectedMachine: simulationMachineList[0],
          })
        );
      }
    }
  }, [simulationMachineList, dispatch, selectedMachine]);

  const machinesDropdown =
    simulationMachineList?.map((item: any, i: number) => ({
      label: item.name,
      value: item.name,
    })) || [];

  const handleChange = (selectedOption: any | null) => {
    if (selectedOption) {
      const selectedMachineDetails =
        simulationMachineList?.find(
          (machine) => machine.name === selectedOption
        ) || null;
      dispatch(
        simulationSliceAction.setSimulationSlice({
          selectedMachine: selectedMachineDetails,
        })
      );
    } else {
      dispatch(
        simulationSliceAction.setSimulationSlice({ selectedMachine: null })
      );
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setErrorMessage({ ...erroMessage, fileError: '' });
    if (!file) return;

    const fileType = file.type;
    if (
      fileType === 'text/csv' ||
      fileType === 'application/vnd.ms-excel' ||
      fileType ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;

        if (fileType === 'text/csv') {
          Papa.parse(data as string, {
            header: true,
            complete: (results) => {
              console.log('🚀 ~ handleFileUpload ~ results:', results);
              const prices = results.data
                .map((row: any) => parseFloat(row.prices))
                .filter((price) => !isNaN(price) && price !== null);
              dispatch(
                simulationSliceAction.setSimulationSlice({ prices: prices })
              );

              console.log(prices);
            },
          });
        } else {
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          console.log('🚀 ~ handleFileUpload ~ jsonData:', jsonData);

          const prices = jsonData
            .slice(1)
            .map((row: any) => parseFloat(row[0]));
          console.log('🚀 ~ handleFileUpload ~ prices:', prices);
          dispatch(
            simulationSliceAction.setSimulationSlice({ prices: prices })
          );
        }
      };
      if (fileType === 'text/csv') {
        reader.readAsText(file);
      } else {
        reader.readAsBinaryString(file);
      }
    } else {
      alert('Please upload a CSV or Excel file.');
    }
  };

  const handleStartSmiulation = async () => {
    if (!collateral) {
      setErrorMessage({
        ...erroMessage,
        collateralError: 'collateral is required',
        selectedMachineError: '',
        fileError: '',
      });
      return;
    }
    if (!prices.length) {
      setErrorMessage({
        ...erroMessage,
        fileError: 'File  is required',
        selectedMachineError: '',
        collateralError: '',
      });
    }
    if (!selectedMachine) {
      setErrorMessage({
        ...erroMessage,
        selectedMachineError: 'Machine  is required',
        collateralError: '',
        fileError: '',
      });
    }
    if (selectedMachine && prices.length > 0 && collateral) {
      const payload = {
        machine: selectedMachine._id,
        prices: prices,
        collatoral: Number(collateral),
      };
      const resp = await startSimulation(payload);
      console.log('🚀 ~ handleStartSmiulation ~ resp:', resp);
    }
  };

  const ath = (simulationData || []).map((reward, index) => ({
    x: `Day ${index + 1}`,
    y: reward.allTimeHigh,
  }));
  const price = (simulationData || []).map((reward, index) => ({
    x: `Day ${index + 1}`,
    y: reward.tokenPrice,
  }));
  const dlp = (simulationData || []).map((reward, index) => ({
    x: `Day ${index + 1}`,
    y: reward.dlp,
  }));
  const totalPrice = (simulationData || []).map((reward, index) => ({
    x: `Day ${index + 1}`,
    y: reward.totalPrice,
  }));

  const RewardsCalculatorChartData: TChartDataType = [
    {
      id: 'Total Price',
      data: totalPrice,
    },
    {
      id: 'ATH',
      color: 'hsl(226, 70%, 50%)',
      data: ath,
    },
    {
      id: 'DLP',
      color: 'hsl(24, 90%, 50%)',

      data: dlp,
    },
    {
      id: 'Token Price',
      data: price,
    },
  ];

  console.log(RewardsCalculatorChartData);

  const RewardsCalculatorChartDefs: TChartDataDefs = [
    {
      id: 'gradient1',
      type: 'linearGradient',
      colors: [
        { offset: 0, color: '#F2F4F7' },
        {
          offset: 70,
          color: '#F2F4F7',
        },
      ],
    },
  ];
  const row = (simulationData || []).map((reward, index) => ({
    day: `${'Day '}${index + 1}`,
    totalPrice: reward.totalPrice,
    dlp: reward.dlp,
    tokenPrice: reward.tokenPrice,
    allTimeHigh: reward.allTimeHigh,
  }));

  const RewardsCalculatorChartFill: TChartDataFill = [
    { match: { id: 'ATH' }, id: 'gradient1' },
    { match: { id: 'DLP' }, id: 'gradient1' },
    { match: { id: 'Token Price' }, id: 'gradient1' },
    { match: { id: 'Total Price' }, id: 'gradient1' },
  ];
  const headCells = [
    { id: 'day', label: 'Day' },

    { id: 'tokenPrice', label: 'Token Price' },
    { id: 'dlp', label: 'DLP' },
    { id: 'allTimeHigh', label: 'ATH' },
    { id: 'totalPrice', label: 'Total Price' },
  ];
  useEffect(() => {
    setIsChecked(Boolean(selectedMachine?.autoCompound));
  }, [selectedMachine?.autoCompound]);

  const handleAutoCompund = async (checked) => {
    setIsChecked(checked);
    const values = {
      machine: selectedMachine?._id,
      enabled: checked,
    };

    const resp = await chnageAutoCompund(values);
  };

  return (
    <div className="w-full px-2">
      <div className="flex bg-primary items-center  text-white">
        <h1 className="flex-1 font-bold text-2xl px-3 py-1">Simulation</h1>
        <div className="flex gap-1 items-center cursor-pointer px-3">
          <img src={refresh} alt="refresh" width={24} height={24} />
          <span>Refresh</span>
        </div>
      </div>

      <div className="flex md:flex-row flex-col gap-16">
        {/* Left column (div 1/3) */}
        <div className="md:w-1/3 w-full p-4 flex flex-col gap-3">
          <div className="">
            <GlobalSelect
              label="Select Machine"
              name="machineSelect"
              options={machinesDropdown}
              onChange={handleChange}
              placeholder="Select Machine"
              value={selectedMachine?.name}
              isError={false}
            />
            {erroMessage?.selectedMachineError && (
              <div className="text-red-500 text-sm">
                {erroMessage?.selectedMachineError}
              </div>
            )}
            <GlobalInput
              name="collateral"
              label="Collateral"
              type="number"
              value={collateral}
              onChange={(e) => {
                dispatch(
                  simulationSliceAction.setSimulationSlice({
                    collateral: e.target.value,
                  })
                );
                setErrorMessage({ ...erroMessage, collateralError: '' });
              }}
              isError={false}
            />
            {erroMessage?.collateralError && (
              <div className="text-red-500 text-sm">
                {erroMessage?.collateralError}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-primary">
              Upload CSV or Excel File
            </label>

            <input
              type="file"
              accept=".csv, .xlsx, .xls"
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handleFileUpload}
            />
          </div>
          <div>
            {erroMessage?.fileError && (
              <div className="text-red-500 text-sm">
                {erroMessage?.fileError}
              </div>
            )}
          </div>

          <a
            href="/files/Prices_Sample.csv" // Adjust the file path as needed
            download
          >
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Download Sample CSV
            </button>
          </a>
          <div>
            <button
              onClick={handleStartSmiulation}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              {startSimulationLoading ? (
                <Spinner className="animate-spin h-6" />
              ) : (
                '  Start Simulator'
              )}
            </button>
          </div>
        </div>

        {selectedMachine && (
          <div className="md:w-2/3  w-full flex flex-row py-5 gap-16">
            <div>
              <div>
                <p className="text-2xl font-semibold text-gray-600">
                  {selectedMachine.name}
                </p>
              </div>
              <div className=" flex flex-row gap-16 py-5  ">
                <div>
                  <img
                    src={selectedMachine.imageUrl}
                    alt="Machine Image"
                    className="w-60 h-60 rounded-lg object-cover "
                  />
                </div>
                <div className=" flex flex-col gap-3  ">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 ">
                      Auto Compound
                    </label>
                    <p className="text-sm text-gray-600">
                      <GlobalSwitch
                        checked={isChecked}
                        onChange={(checked) => handleAutoCompund(checked)}
                      />
                      {/* {selectedMachine.autoCompound ? 'True' : 'False'} */}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 ">
                      DLP
                    </label>
                    <p className="text-sm text-gray-600">
                      {selectedMachine.dlp}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 ">
                      ATH
                    </label>
                    <p className="text-sm text-gray-600">
                      {selectedMachine.allTimeHigh}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 ">
                      Mintng Power
                    </label>
                    <p className="text-sm text-gray-600">
                      {selectedMachine.mintingPower}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 ">
                      Boost
                    </label>
                    <p className="text-sm text-gray-600">
                      {selectedMachine.boost}
                    </p>
                  </div>
                  {/* Add more machine details as needed */}
                </div>
                {/* Add more machine details as needed */}
              </div>
            </div>
          </div>
        )}
      </div>
      {simulationData.length > 0 && (
        <div className="flex flex-col gap-5">
          <article className=" bg-white m rounded-lg p-5  ">
            <LineChart
              data={RewardsCalculatorChartData}
              defs={RewardsCalculatorChartDefs}
              fill={RewardsCalculatorChartFill}
              margin={{
                top: 50,
                right: 50,
                bottom: 50,
                left: 60,
              }}
              enableCustomtooltip={true}
              colors={['#F23838', '#3B89FF', '#FFD16C', '#12B76A']}
              containerClassName="w-full h-[30rem]"
            />
          </article>
          <GlobalTable
            rows={row}
            headCells={headCells}
            isLoading={false}
            paginate={true}
            // handlePageChange={(page: number) => {
            //   getAdminList(page);
            // }}
            handleOpen={() => {}}
          />
        </div>
      )}
    </div>
  );
};

export default Simulation;
