import { useEffect, useState } from 'react';
import Card from '../../components/Dashboard/Card';
import { useDashboardActions } from '../../store/Dashboard/dashboardActions';
import { useSelector } from 'react-redux';
import { selectDashboard } from '../../store/Dashboard/dashboardSlice';
import {
  dashboardUserOverviewTitles,
  dashboardOrdersOverviewTitles,
  dashboardProductsOverviewTitles,
} from '../../constants';
import Loader from '../../components/Loader/Loader';
import TokenNameWithLogo from '../../components/TokenNameWithLogo';
import { ReactComponent as ClaimableIcon } from '../../SVGIcons/claimable.svg';
import { ReactComponent as GASKIcon } from '../../SVGIcons/gsk.svg';
import { ReactComponent as LYKIcon } from '../../SVGIcons/lykIcon.svg';
import { ResponsivePie } from '@nivo/pie';
import HostoryTabla from '../../components/Dashboard/HistoryTable';

const Dashboard = () => {
  // const { getDashboardStats } = useDashboardActions();
  const { allTokensBalance, feeCollected, ordersOverview, productsOverview, usersOverview } =
    useSelector(selectDashboard);
  const [loading, setLoading] = useState(true);

  const CloudK2 = () => {
    return (
      <div className="w-full border py-4 px-6 rounded-md">
        <h3 className="text-lg font-medium py-2">Cloud K 2.0</h3>
        <div className="flex flex-col justify-between items-start  lg:w-[90%] gap-4">
          <div className="text-sm font-normal border-b-2 border-gray-100 w-full">Total Rewards Till Now</div>
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-4 items-center">
              <ClaimableIcon />
              <div className="text-primary text-2xl font-medium">$ 8,023,586</div>
            </div>
            <div className="flex gap-4 items-center">
              <LYKIcon />
              <div className="text-primaryDark text-2xl font-medium">8,023,586 LYK</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between items-start  w-[90%] gap-4 py-4">
          <div className="text-sm font-normal border-b-2 border-gray-100 w-full">Claimable Rewards</div>
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-4 items-center">
              <ClaimableIcon />
              <div className="text-primary text-2xl font-medium">$ 8,023,586</div>
            </div>
            <div className="flex gap-4 items-center">
              <LYKIcon />
              <div className="text-primaryDark text-2xl font-medium">8,023,586 LYK</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const data = [
    {
      id: 'Admin',
      label: 'Total Admin',
      value: 220,
      color: '#1B9FDA',
    },
    {
      id: 'Subscriber',
      label: 'Total Subscriber',
      value: 200,
      color: '#EB6535',
    },
    {
      id: 'Users',
      label: 'Total User',
      value: 300,
      color: '#5BAC0A',
    },
  ];

  const Users = () => {
    return (
      <div className="w-full border py-4 px-6 rounded-md">
        <h3 className="text-lg font-medium pt-2">Users</h3>
        <div className="flex flex-col justify-between items-start h-[30vh] w-full -mt-12">
          <ResponsivePie
            colors={['#357EEB', '#EB6535', '#5BAC0A']}
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            startAngle={2}
            innerRadius={0.7}
            padAngle={1}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 0.2]],
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
              from: 'color',
              modifiers: [['darker', 5]],
            }}
            legends={[
              {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 30,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#99',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 9,
                symbolShape: 'circle',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: '#000',
                    },
                  },
                ],
              },
            ]}
          />
        </div>
      </div>
    );
  };

  const Wallet = () => {
    return (
      <div className="px-2">
        <HostoryTabla />
      </div>
    );
  };

  // useEffect(() => {
  //   (async () => {
  //     await getDashboardStats();
  //     setLoading(false);
  //   })();
  // }, []);

  return (
    <>
      {false ? (
        <Loader />
      ) : (
        <div>
          <div className="py-2 px-2 grid md:grid-cols-2 gap-6">
            <CloudK2 />
            <Users />
          </div>
          <Wallet />
        </div>
      )}
    </>
  );
};

export default Dashboard;
