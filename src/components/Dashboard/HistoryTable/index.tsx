import React from 'react';
import GlobalTable from '../../Table/GlobalTable';
import Tabs from '../Tabs';
import GlobalSelect from '../../Global/GlobalSelect';
import FormikInput from '../../FormikInput';
import { ReactComponent as SeachIcon } from '../../../SVGIcons/searchIcon.svg';
import GlobalDialog from '../../Dialog';
import StepNumber from '../../Global/StepNumber';
import StepLine from '../../Global/StepLine';
import GlobalStepper from '../../Global/GlobalSteper';
import { ReactComponent as CrossIcon } from '../../../SVGIcons/crossIcon.svg';
import HistoryPopup from './HistoryPopup';

function HostoryTabla() {
  const [activeTab, setActiveTab] = React.useState('withdraw');
  const [test, setTest] = React.useState();
  const [clickeddRow, setClickeddRow] = React.useState<any>();
  const [filterState, setFilterState] = React.useState({
    id: '',
    coin: '',
    status: '',
    date: '',
  });

  const headCells = [
    { id: 'id', label: '#ID' },
    { id: 'time', label: 'Time' },
    { id: 'type', label: 'Type' },
    { id: 'withdrawToken', label: 'Withdraw Token' },
    { id: 'receiveToken', label: 'Receive Token' },
    { id: 'receivable', label: 'Receivable' },
    { id: 'destinations', label: 'Destinations' },
    { id: 'txId', label: 'TxID' },
    { id: 'status', label: 'Status' },
    { id: 'actions', label: 'Actions' },
  ];
  const copyIconList = ['destinations', 'txId'];
  const row = [
    {
      id: 1,
      time: '08:39',
      type: 'withdraw',
      withdrawToken: 'withdrawToken 321',
      receiveToken: 'receiveToken 123',
      receivable: 'USDT',
      destinations: 'destinationsABC',
      txId: 'txId 234ABC',
      status: 'Complete',
      actions: (
        <div className="flex">
          <button className="text-xs px-2 py-1 rounded-md text-white bg-primaryGreen cursor-pointer">Accept</button>
          <button className="text-xs px-2 py-1  rounded-md text-white bg-primaryRed cursor-pointer ml-2">Reject</button>
        </div>
      ),
    },
    {
      id: 2,
      time: '08:39',
      type: 'deposit',
      withdrawToken: 'withdrawToken 321',
      receiveToken: 'receiveToken 123',
      receivable: 'USDT',
      destinations: 'destinations ABC',
      txId: 'txId 234ABC',
      status: 'Pending',
      actions: (
        <div className="flex">
          <button className="text-xs px-2 py-1 rounded-md text-white bg-primaryGreen cursor-pointer">Accept</button>
          <button className="text-xs px-2 py-1  rounded-md text-white bg-primaryRed cursor-pointer ml-2">Reject</button>
        </div>
      ),
    },
    {
      id: 3,
      time: '08:39',
      type: 'swap',
      withdrawToken: 'withdrawToken 321',
      receiveToken: 'receiveToken 123',
      receivable: 'USDT',
      destinations: 'destinations ABC',
      txId: 'txId 234ABC',
      status: 'Failed',
      actions: (
        <div className="flex">
          <button className="text-xs px-2 py-1 rounded-md text-white bg-primaryGreen cursor-pointer">Accept</button>
          <button className="text-xs px-2 py-1  rounded-md text-white bg-primaryRed cursor-pointer ml-2">Reject</button>
        </div>
      ),
    },
  ].filter((dt: any) => (activeTab ? dt.type === activeTab : true));

  const tabHandler = (name) => {
    setActiveTab(name);
  };

  const tabsData = [
    {
      label: 'Withdraw',
      type: 'withdraw',
    },
    {
      label: 'Deposit',
      type: 'deposit',
    },
    {
      label: 'Swap',
      type: 'swap',
    },
  ];

  const filterData = [
    {
      placeholder: 'Coin',
      text: 'All',
      value: 'one',
      name: 'coin',
    },
    {
      placeholder: 'Status',
      text: 'All',
      value: 'two',
      name: 'status',
    },
    {
      placeholder: 'Date',
      text: 'All',
      value: 'three',
      name: 'date',
    },
  ];

  const onFilterStateHandler = (name: string, value: string) => {
    setFilterState((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onResetFilter = () => {
    setFilterState({
      id: '',
      coin: '',
      status: '',
      date: '',
    });
    setActiveTab('');
  };

  const onPopupHandler = () => {
    setClickeddRow('');
  };

  return (
    <>
      <div className="w-full  py-2 px-2 rounded-md">
        <div className="flex items-center bg-gray-100">
          <h1 className="flex-1 font-semibold text-2xl px-3 py-1">Wallet</h1>
        </div>

        <div className="flex gap-2 my-4">
          {tabsData.map((dt: any) => {
            return (
              <Tabs
                activeTab={dt.type === activeTab}
                onClick={() => {
                  tabHandler(dt.type);
                }}
                label={dt.label}
              />
            );
          })}
        </div>

        <div className="flex items-center justify-start gap-2 my-4 w-full">
          <div className="flex gap-2 items-center relative">
            <FormikInput
              type="string"
              name="id"
              shrink={true}
              placeholder="Enter ID"
              className="w-[10vw]"
              value={filterState['id']}
              onChange={(e) => {
                onFilterStateHandler('id', e.target.value);
              }}
              isError={false}
            />
            {filterData.map((dt: any, index) => {
              return (
                <GlobalSelect
                  labelOptionClass={'text-left'}
                  name={dt.name}
                  placeholder={dt.placeholder}
                  options={[
                    { label: 'one', value: 'one' },
                    { label: 'two', value: 'two' },
                    { label: 'three', value: 'three' },
                  ]}
                  setFieldValue={setTest}
                  isError={false}
                  value={filterState[dt.name]}
                  onChange={(e) => {
                    console.log('event ::', e);
                    onFilterStateHandler(dt.name, e.value);
                  }}
                  inputClass="mb-2 w-[20vw] md:w-[10vw]"
                />
              );
            })}
            <p onClick={onResetFilter} className="text-primary px-4 font-normal cursor-pointer">
              Reset
            </p>
            <div className="absolute left-3 cursor-pointer">
              <SeachIcon />
            </div>
          </div>
        </div>

        {/* TABLE*/}
        <GlobalTable
          rows={row}
          headCells={headCells}
          isLoading={false}
          paginate={false}
          setClickeddRow={setClickeddRow}
          copyIconList={copyIconList}
        />
      </div>
      <HistoryPopup open={clickeddRow ? true : false} onClose={onPopupHandler} />
    </>
  );
}

export default HostoryTabla;
