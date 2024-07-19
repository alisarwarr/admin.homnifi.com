// import GlobalTable from '../../../../components/Table/GlobalTable';
// import GlobalModal from '../../../../components/Global/GlobalModal';
// import useModalHook from '../../../../utils/hooks/useModalHook';
// import SingleMachineModalBody from './SingleMachineModalBody';
// import { useCloudActions } from '../../../../store/cloudk/cloudk.action';
// import { selectCloudkSlice } from '../../../../store/cloudk/cloudk.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
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

const Simulation = () => {
  const { getUserMachineList, startSimulation } = useCloudActions();
  const dispatch = useDispatch();
  const { userMachineList } = useSelector(selectCloudkSlice);
  const {
    machines,
    selectedMachine,
    startSimulationLoading,
    prices,
    collateral,
    simulationData,
  } = useSelector(selectSimulationSlice);
  useEffect(() => {
    getUserMachineList();
    // handleSelectFirstProduct();
  }, []);
  const handleSelectFirstProduct = () => {
    dispatch(
      simulationSliceAction.setSimulationSlice({
        selectedMachine: machines?.[0],
      })
    );
  };

  const machinesDropdown =
    userMachineList?.map((item: any, i: number) => ({
      label: item.name,
      value: item.name,
    })) || [];

  const handleChange = (selectedOption: any | null) => {
    if (selectedOption) {
      const selectedMachineDetails =
        userMachineList?.find((machine) => machine.name === selectedOption) ||
        null;
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
              const prices = results.data.map((row: any) =>
                parseFloat(row.prices)
              );
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
    const payload = {
      machine: selectedMachine._id,
      prices: prices,
      collatoral: Number(collateral),
    };
    const resp = await startSimulation(payload);
    console.log('🚀 ~ handleStartSmiulation ~ resp:', resp);
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
      id: 'Price',
      data: price,
    },
    {
      id: 'Reward',
      data: totalPrice,
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

  const RewardsCalculatorChartFill: TChartDataFill = [
    { match: { id: 'ATH' }, id: 'gradient1' },
    { match: { id: 'DLP' }, id: 'gradient1' },
    { match: { id: 'Price' }, id: 'gradient1' },
    { match: { id: 'Reward' }, id: 'gradient1' },
  ];

  return (
    <div className="w-full px-2">
      <div className="flex bg-primary items-center  text-white">
        <h1 className="flex-1 font-bold text-2xl px-3 py-1">Simulation</h1>
        <div className="flex gap-1 items-center cursor-pointer px-3">
          <img src={refresh} alt="refresh" width={24} height={24} />
          <span>Refresh</span>
        </div>
      </div>

      <div className="flex flex-row gap-16">
        {/* Left column (div 1/3) */}
        <div className="w-1/3 p-4 flex flex-col gap-3">
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
            <GlobalInput
              name="collateral"
              label="Collateral"
              type="number"
              value={collateral}
              onChange={(e) =>
                dispatch(
                  simulationSliceAction.setSimulationSlice({
                    collateral: e.target.value,
                  })
                )
              }
              isError={false}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary">
              Upload CSV or Excel File
            </label>
            {/* <input
              type="file"
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            /> */}
            <input
              type="file"
              accept=".csv, .xlsx, .xls"
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handleFileUpload}
            />
          </div>
          <div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Download Sample CSV
            </button>
          </div>
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

        {/* Right column (div 2/3) */}
        <div className="w-2/3 flex flex-row py-5 gap-16">
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
                    {selectedMachine.autoCompound ? 'True' : 'False'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 ">
                    DLP
                  </label>
                  <p className="text-sm text-gray-600">{selectedMachine.dlp}</p>
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
                    Minitng Power
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
      </div>
      {simulationData.length > 0 && (
        <article className=" ">
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
      )}
    </div>
  );
};

export default Simulation;
