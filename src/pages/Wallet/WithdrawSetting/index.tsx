import React, { useState } from 'react';
import Button from '../../../components/Button';
import AddWithdrawSettings from './AddWithdrawSetting';
import { add, edit } from '../../../images/other';
import GlobalTable from '../../../components/Table/GlobalTable';
import { Tooltip } from 'antd';

function WithdrawSetting() {
  const [open, setOpen] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState<null>(null);
  const onPopupHandler = () => {
    setOpen(!open);
  };

  const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'type', label: 'type' },
    { id: 'withdrawFrom', label: 'Withdraw From' },
    { id: 'withdrawTo', label: 'Withdraw To' },
    { id: 'limit', label: 'Limit' },
    { id: 'fees', label: 'Fees' },
    { id: 'commission', label: 'commission' },
    { id: 'actions', label: 'Actions', headCellClass: 'text-center' },
  ];

  const data = [
    {
      id: 1,
      type: 'internal',
      withdrawFrom: 10,
      withdrawTo: 100,
      fees: 50,
      commission: '5 %',
    },
    {
      id: 2,
      type: 'external',
      withdrawFrom: 100,
      withdrawTo: 200,
      fees: 50,
      commission: '5 %',
    },
  ];

  const rows = data?.map((_data: any, index: number) => {
    return {
      id: index,
      type: _data.type,
      withdrawFrom: _data.withdrawFrom,
      withdrawTo: _data.withdrawTo,
      limit: ` ${'Min ' + _data.withdrawFrom + '-  Max ' + _data.withdrawTo}`,
      fees: _data.fees,
      commission: _data.commission,
      actions: (
        <div className="flex items-center gap-2">
          <Tooltip title="Edit Admin Role">
            <img
              src={edit}
              width={18}
              height={18}
              alt="Edit Icon"
              onClick={() => {
                onPopupHandler();
                setSelectedSetting(_data);
              }}
              className="cursor-pointer"
            />
          </Tooltip>
        </div>
      ),
    };
  });

  return (
    <div className="w-full px-2 border py-4 rounded-md">
      <div className="flex bg-primary items-center table-head-bg text-white">
        <h1 className="flex-1 font-bold text-2xl px-3 py-1">
          Withdraw Settings
        </h1>
        <div
          className="flex gap-1 items-center cursor-pointer px-3"
          onClick={() => {
            onPopupHandler();
          }}
        >
          <img src={add} alt="" width={24} height={24} />
          <span> Add Withdraw Settings</span>
        </div>
      </div>
      <AddWithdrawSettings
        onClose={onPopupHandler}
        open={open}
        selectedSetting={selectedSetting}
      />
      <GlobalTable
        rows={rows}
        headCells={headCells}
        isLoading={false}
        paginate={false}
      />
    </div>
  );
}

export default WithdrawSetting;
