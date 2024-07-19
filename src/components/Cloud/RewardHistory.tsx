import React from 'react';
import { MachineImage } from '../../images/cloud';
import { ReactComponent as InfoIcon } from '../../SVGIcons/info-circle.svg';
import GlobalPills from '../GlobalPills';
import { CapitalizeAllLetters } from '../../utils/utils';

const RewardHistory = () => {
  const headCells = [
    {
      id: 'machine',
      label: 'Machine',
      dataClass: 'w-[25%]',
    },
    {
      id: 'reward',
      label: 'Reward',
      dataClass: 'w-[15%]',
    },
    {
      id: 'penalty',
      label: 'Penalty',
      dataClass: 'w-[15%]',
    },
    {
      id: 'receivable',
      label: 'Receivable',
      dataClass: 'w-[20%]',
    },
    {
      id: 'date',
      label: 'Date',
      dataClass: 'w-[50%]',
    },
  ];

  const rowData = [
    {
      machine: {
        name: 'XK 5000',
        status: false,
        image: MachineImage,
      },
      reward: 12000,
      penalty: 1000,
      receivable: 11000,
      date: CapitalizeAllLetters(new Date()),
    },
    {
      machine: {
        name: 'XK 500',
        status: true,
        image: MachineImage,
      },
      reward: 12000,
      penalty: 1000,
      receivable: 11000,
      date: CapitalizeAllLetters(new Date()),
    },
    {
      machine: {
        name: 'XK 1000',
        status: false,
        image: MachineImage,
      },
      reward: 12000,
      penalty: 1000,
      receivable: 11000,
      date: CapitalizeAllLetters(new Date()),
    },
    {
      machine: {
        name: 'XK 10000',
        status: false,
        image: MachineImage,
      },
      reward: 12000,
      penalty: 1000,
      receivable: 11000,
      date: CapitalizeAllLetters(new Date()),
    },
    {
      machine: {
        name: 'XK validator',
        status: false,
        image: MachineImage,
      },
      reward: 12000,
      penalty: 1000,
      receivable: 11000,
      date: CapitalizeAllLetters(new Date()),
    },
    {
      machine: {
        name: 'XK validator',
        status: false,
        image: MachineImage,
      },
      reward: 12000,
      penalty: 1000,
      receivable: 11000,
      date: CapitalizeAllLetters(new Date()),
    },
    {
      machine: {
        name: 'XK 5000',
        status: false,
        image: MachineImage,
      },
      reward: 12000,
      penalty: 1000,
      receivable: 11000,
      date: CapitalizeAllLetters(new Date()),
    },
  ];

  const rows = rowData.map((trx, i) => ({
    machine: (
      <div className="flex items-center gap-5">
        <span className="w-12">
          <img src={trx.machine.image} width={44} height={44} alt="MachineImage" className="rounded-full" />
        </span>{' '}
        <div className="flex gap-1">
          <span className="text-defaultBlack font-medium capitalize">{trx.machine.name}</span>{' '}
          {trx.machine.status ? <GlobalPills status={'active'} /> : <GlobalPills status="inactive" />}
        </div>
      </div>
    ),
    reward: <span className="text-defaultBlack">{trx.reward} LYK</span>,
    penalty: <span className="text-defaultBlack">{trx.penalty} LYK</span>,
    receivable: <span className="text-defaultBlack">{trx.receivable} LYK</span>,
    date: <span className="text-primaryGrey">{trx.date}</span>,
  }));

  return (
    <div className="w-full overflow-hidden">
      <></>
      {/* <GlobalTable
        rows={rows.length ? rows : []}
        headCells={headCells}
        isLoading={false}
        searchIsLoading={false}
        totalPages={Math.ceil(10)}
        emptyDataMessage="No Top Users History!"
        showTotalRecords={false}
        searchFieldPlaceholderText="Search"
        paginationPosition={'right'}
        rowBorder={true}
        rounded={true}
        borderClassName="!border !border-borderLightGray !rounded-lg !shadow"
        searchClassName="!font-normal"
        showSearch={false}
        pagination={true}
        headStyles="text-cardSecondaryText !font-normal"
        filterSearchClassName="text-xs text-blueGrey h-max !bg-transparent"
        filterSearchBaseClassName="!bg-transparent"
        filterSearchPlaceholderText="Enter TxID"
        dropdownButtonClassname="py-2 text-primaryGrey text-xs font-normal !gap-5 !bg-transparent"
        firstDropDownText="Coin"
        firstDropdownData={[
          { key: 'all', label: 'All' },
          { key: 'bitcoin', label: 'Bitcoin' },
          { key: 'ethereum', label: 'Ethereum' },
        ]}
        secondDropDownText="Status"
        secondDropdownData={[
          { key: 'all', label: 'All' },
          { key: 'pending', label: 'Pending' },
          { key: 'rejected', label: 'Rejected' },
          { key: 'accepted', label: 'Accepted' },
        ]}
        thirdDropdownText="Date"
        thirdDropdown={[
          { key: 'all', label: 'All' },
          { key: 'weekly', label: 'Weekly' },
          { key: 'monthly', label: 'Monthly' },
          { key: 'yearly', label: 'Yearly' },
        ]}
        dropDownWithValues={true}
      /> */}

      {/* <table className="w-full table-bordered">
        <thead className="text-primaryGrey bg-white">
          <tr>
            <th className="text-left p-4 font-normal text-sm border-b border-borderLightGray">
              Machine
            </th>
            <th className="text-left p-4 font-normal text-sm border-b border-borderLightGray">
              Reward
            </th>
            <th className="text-left p-4 font-normal text-sm border-b border-borderLightGray flex items-center gap-2">
              Penality
              <InfoIcon className="w-4" />
            </th>
            <th className="text-left p-4 font-normal text-sm border-b border-borderLightGray">
              Receivable
            </th>
            <th className="text-left p-4 font-normal text-sm border-b border-borderLightGray">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {rewards.map((reward, index) => (
            <tr key={index}>
              <td className="p-4 font-medium text-sm border-b border-borderLightGray flex gap-2 items-center">
                <img src={MachineImage} alt="Machine" className="w-20" />
                {reward.machine}
                <div
                  className={`py-1 px-2  rounded-full flex items-center gap-1 text-xs ${reward.status ? 'bg-primaryGreen/20 text-primaryGreen' : 'bg-primaryRed/20 text-primaryRed'}`}
                >
                  <span className="relative flex h-2 w-2">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${reward.status ? 'bg-primaryGreen' : 'bg-primaryRed'}`}
                    ></span>
                    <span
                      className={`relative inline-flex rounded-full h-2 w-2 ${reward.status ? 'bg-primaryGreen' : 'bg-primaryRed'}`}
                    ></span>
                  </span>
                  {reward.status ? 'Active' : 'Inactive'}
                </div>
              </td>
              <td className="p-4 font-normal text-sm border-b border-borderLightGray">
                {reward.reward}
              </td>
              <td className="p-4 font-normal text-sm border-b border-borderLightGray">
                {reward.penality}
              </td>
              <td className="p-4 font-normal text-sm border-b border-borderLightGray text-primaryGrey">
                {reward.receivable}
              </td>
              <td className="p-4 font-normal text-sm border-b border-borderLightGray text-primaryGrey">
                {reward.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default RewardHistory;
