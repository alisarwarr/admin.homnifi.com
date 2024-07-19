import React, { useEffect, useState } from 'react';
import GlobalTable from '../../../components/Table/GlobalTable';
import { Tooltip } from 'antd';
import { edit, view } from '../../../images/other';
import { useAdminActions } from '../../../store/admin/adminActions';

function CronJob() {
  const { getCronJobs } = useAdminActions();
  const [loading, setLoading] = useState(true);

  const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'startTime', label: 'Start Time' },
    { id: 'endTime', label: 'End Time' },
    { id: 'takenPrice', label: 'Taken Price' },
    { id: 'status', label: 'Status' },
    { id: 'tatalMachine', label: 'Total Machine' },
    { id: 'timeTaken', label: 'Time Taken' },
    // { id: 'actions', label: 'Actions', headCellClass: 'text-center' },
  ];
  const data = [
    {
      id: 1,
      startTime: '03:30',
      endTime: '03:30',
      takenPrice: '300',
      status: 'Completed',
      tatalMachine: '50',
      timeTaken: '50 hours',
    },
  ];
  const rows =
    data?.length > 0
      ? data?.map((_data: any) => {
          return {
            id: _data.id,
            startTime: _data.startTime,
            endTime: _data.endTime,
            takenPrice: _data.takenPrice,
            status: _data.status,
            tatalMachine: _data.tatalMachine,
            timeTaken: _data.timeTaken,
          };
        })
      : [];

  useEffect(() => {
    // if (tokensList.length === 0) {
    getCronJobs();
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    // } else {
    // setLoading(false);
    // }
  }, []);

  return (
    <div className="w-full px-2">
      <div className="flex bg-primary items-center table-head-bg text-white">
        <h1 className="flex-1 font-bold text-2xl px-3 py-1">Cron Jobs</h1>
      </div>
      <GlobalTable
        rows={rows}
        headCells={headCells}
        isLoading={false}
        paginate={false}
      />
    </div>
  );
}

export default CronJob;
