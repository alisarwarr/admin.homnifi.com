import React, { useEffect, useState } from 'react';
import GlobalTable from '../../../components/Table/GlobalTable';
import { useAdminActions } from '../../../store/admin/adminActions';
import { useSelector } from 'react-redux';
import { selectAdmin } from '../../../store/admin/adminSlice';
import moment from 'moment';

function CronJob() {
  const { getCronJobs } = useAdminActions();
  const { cronJobList, cronJobData } = useSelector(selectAdmin);
  const [loading, setLoading] = useState(true);

  const headCells = [
    { id: 'startTime', label: 'Start Time' },
    { id: 'endTime', label: 'End Time' },
    { id: 'tokenPrice', label: 'Taken Price' },
    { id: 'status', label: 'Status' },
    { id: 'totalMachines', label: 'Total Machine' },
    // { id: 'timeTaken', label: 'Time Taken' },
  ];

  const calculateDurations = (startTime, endTime) => {
    const start = moment(startTime);
    const end = moment(endTime);
    const duration = moment.duration(end.diff(start));
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();

    return `${hours} : ${minutes}`;
  };
  const rows =
    cronJobList?.length > 0
      ? cronJobList?.map((_data: any, index: number) => {
          return {
            id: index + 1,
            startTime: moment(_data.startTime).format('hh:mm a'),
            endTime: _data.endTime
              ? moment(_data.endTime).format('hh:mm a')
              : '-',
            tokenPrice: _data.tokenPrice,
            status: _data.status,
            totalMachines: _data.totalMachines,
            // timeTaken: calculateDurations(_data.startTime, _data.endTime),
          };
        })
      : [];

  useEffect(() => {
    if (cronJobList?.length == 0) {
      getCronJobs();
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="w-full px-2 border py-4 rounded-md">
      <div className="flex bg-primary items-center table-head-bg text-white">
        <h1 className="flex-1 font-bold text-2xl px-3 py-1">Cron Jobs</h1>
      </div>
      <GlobalTable
        rows={rows}
        headCells={headCells}
        isLoading={false}
        paginate={cronJobData?.totalPages > 1}
        page={cronJobData?.currentPage ?? 1}
        totalPages={cronJobData?.totalPages ?? 1}
        handlePageChange={(page: number) => {
          getCronJobs(page);
        }}
      />
    </div>
  );
}

export default CronJob;
