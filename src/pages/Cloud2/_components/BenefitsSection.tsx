import React from 'react';
import GlobalAccordian from '../../../components/Accordian';
import { AccordionItem } from '@nextui-org/react';
import BenefitsLayerK from './BenefitsLayerK';
import GlobalRowTable from '../../../components/Global/GlobalRowTable';
import { useSelector } from 'react-redux';
import { selectClouldSlice } from '../../../store/clouldk2Slice';

type Props = {};

const BenefitsSection = (props: Props) => {
  const { activeMachines } = useSelector(selectClouldSlice);

  const GlobalPoolTableData = [
    {
      key: 'GLOBAL POOL LAYERK',
      value: activeMachines.map((machine) => {
        let globalPoolLayerk = machine.globalPoolLayerk;

        if (!globalPoolLayerk || globalPoolLayerk < 0) {
          return '-';
        } else {
          return `SNGP ${globalPoolLayerk.toLocaleString()}`;
        }
      }),
    },
  ];

  const BonusTableData = [
    {
      key: 'BONUS',
      value: activeMachines.map((machine) => {
        let bonus = machine.bonus;

        if (!bonus || bonus < 0) {
          return '-';
        } else {
          return `SNGP ${bonus.toLocaleString()}`;
        }
      }),
    },
  ];

  return (
    <GlobalAccordian headingClassName="bg-gradient-primary-blue rounded-lg text-lg text-white font-medium px-4">
      <AccordionItem key="1" aria-label={'Benefits'} title={'Benefits'}>
        <BenefitsLayerK />
        <GlobalRowTable
          TableData={GlobalPoolTableData}
          highlightResult={false}
          headerClassNames="text-lg text-defaultBlack font-medium"
          alignHeader={'start'}
          cols={4}
        />

        <GlobalRowTable
          TableData={BonusTableData}
          highlightResult={false}
          headerClassNames="text-lg text-defaultBlack font-medium"
          alignHeader={'start'}
          cols={4}
        />
      </AccordionItem>
    </GlobalAccordian>
  );
};

export default BenefitsSection;
