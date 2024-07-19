import React from 'react';
import GlobalSubheading from '../../../components/Global/GlobalSubheading';
import GlobalTable from '../../../components/Global/GlobalTable';
import { dummyUser } from '../../../images';
import GlobalRowTable from '../../../components/Global/GlobalRowTable';
import { useSelector } from 'react-redux';
import { selectClouldSlice } from '../../../store/clouldk2Slice';

type Props = {};

const EstimatedRewards = (props: Props) => {
  const { activeMachines } = useSelector(selectClouldSlice);

  const TableData = [
    {
      key: '5 Years',
      value: activeMachines.map((machine) => `$ ${machine.estimatedRewards.fiveYearRewards.toFixed(2)}`),
    },
    {
      key: 'Added Collateral',
      value: activeMachines.map((machine) => `$ ${machine.estimatedRewards.adedCollateral.toFixed(2)}`),
    },
    {
      key: 'Total Receivable',
      value: activeMachines.map((machine) => `$ ${machine.estimatedRewards.totalReceivable.toFixed(2)}`),
    },
  ];

  return (
    <section
      className="col-span-2 flex flex-col gap-2
    "
    >
      <article>
        <GlobalSubheading text="Estimated Rewards*" />
      </article>

      <article>
        <GlobalRowTable TableData={TableData} cols={4} />
      </article>
    </section>
  );
};

export default EstimatedRewards;
