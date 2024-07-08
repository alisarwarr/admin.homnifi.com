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

const Dashboard = () => {
  const { getDashboardStats } = useDashboardActions();
  const { allTokensBalance, feeCollected, ordersOverview, productsOverview, usersOverview } =
    useSelector(selectDashboard);
  const [loading, setLoading] = useState(true);

  const UsersOverview = () => {
    return (
      <>
        {usersOverview &&
          Object?.keys(usersOverview)?.map((user) => {
            return (
              <div className="flex justify-between border border-gray-700 rounded-md p-2 bg-gradient">
                <div>{dashboardUserOverviewTitles[user]}</div>
                <div>{usersOverview[user]}</div>
              </div>
            );
          })}
      </>
    );
  };

  const OrdersOverview = () => {
    return (
      <>
        {ordersOverview &&
          Object?.keys(ordersOverview)?.map((order) => {
            return (
              <div className="flex justify-between border border-gray-700 rounded-md p-2 bg-gradient">
                <div>{dashboardOrdersOverviewTitles[order]}</div>
                <div>{ordersOverview[order]}</div>
              </div>
            );
          })}
      </>
    );
  };

  const ProductsOverview = () => {
    return (
      <>
        {productsOverview &&
          Object?.keys(productsOverview)?.map((product) => {
            return (
              <div className="flex justify-between border border-gray-700 rounded-md p-2 bg-gradient ">
                <div>{dashboardProductsOverviewTitles[product]}</div>
                <div>{productsOverview[product]}</div>
              </div>
            );
          })}
      </>
    );
  };

  const TokensBalanceOverview = () => {
    return (
      <>
        {allTokensBalance?.map((token: any) => {
          return (
            <div className="flex justify-between border border-gray-700 rounded-md p-2 bg-gradient">
              <TokenNameWithLogo tokenName={token.name} />
              <div>{token.balance}</div>
            </div>
          );
        })}
      </>
    );
  };

  const FeeCollectedOverview = () => {
    return (
      <>
        {feeCollected?.map((fee: any) => {
          return (
            <div className="flex justify-between rounded-md p-2 bg-gradient">
              <div>{fee.transactionType}</div>
              <div>{fee.total}</div>
            </div>
          );
        })}
      </>
    );
  };

  useEffect(() => {
    (async () => {
      await getDashboardStats();
      setLoading(false);
    })();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="py-2 px-2 grid md:grid-cols-2 gap-6">
          <Card title={'Users'} Content={UsersOverview} />
          <Card title={'Orders Overview'} Content={OrdersOverview} />
          <Card title={'Products Overview'} Content={ProductsOverview} />
          <Card title={'Tokens Balance'} Content={TokensBalanceOverview} />
          <Card title={'Fee Collected'} Content={FeeCollectedOverview} />
        </div>
      )}
    </>
  );
};

export default Dashboard;
