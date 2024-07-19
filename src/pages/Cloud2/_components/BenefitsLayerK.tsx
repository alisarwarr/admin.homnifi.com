import React from 'react';
import GlobalAccordian from '../../../components/Accordian';
import { AccordionItem } from '@nextui-org/react';
import GlobalRowTable from '../../../components/Global/GlobalRowTable';
import { useSelector } from 'react-redux';
import { selectClouldSlice } from '../../../store/clouldk2Slice';

type Props = {};

const BenefitsLayerK = (props: Props) => {
  const { activeMachines } = useSelector(selectClouldSlice);

  const LayerKTableData = [
    {
      key: 'Minting Power',
      value: activeMachines.map((machine) => {
        let bonusValue = machine.layerK.mintigPower;

        return bonusValue.toLocaleString();
      }),
    },
    {
      key: 'Minting Power in %',
      value: activeMachines.map((machine) => {
        let mintinPowerPercentage = machine.layerK.mintingPowerInPercentage;

        return `${mintinPowerPercentage.toLocaleString()} %`;
      }),
    },
    {
      key: 'Defi Portal',
      value: activeMachines.map((machine) => (machine.layerK.defiPortal ? 'YES' : 'NO')),
    },
    {
      key: 'Staking Capping',
      value: activeMachines.map((machine) => {
        let stakingCapping = machine.layerK.stakingCapping;

        if (!stakingCapping) {
          return `-`;
        }
        return `${stakingCapping.toLocaleString()} %`;
      }),
    },
    {
      key: 'LYK - Airdrop Promo',
      value: activeMachines.map((machine) => {
        let lykAirdropPromo = machine.layerK.lykAirdropPromo;

        if (!lykAirdropPromo) {
          return `-`;
        }
        return `${lykAirdropPromo.toLocaleString()} %`;
      }),
    },
    {
      key: 'sLYK - Airdrop',
      value: activeMachines.map((machine) => {
        let slykAirdrop = machine.layerK.slykAirdrop;

        if (!slykAirdrop) {
          return `-`;
        }
        return `${slykAirdrop.toLocaleString()} %`;
      }),
    },
  ];

  const QuantwiseTableData = [
    {
      key: 'license',
      value: activeMachines.map((machine) => {
        let license = machine.quantwise.license;

        if (!license) {
          return `-`;
        }
        return `${license.toLocaleString()}`;
      }),
    },
    {
      key: 'Profit Split Fee',
      value: activeMachines.map((machine) => {
        let profitSplitFee = machine.quantwise.profitSplitFee;

        if (!profitSplitFee) {
          return `-`;
        }
        return `${profitSplitFee.toLocaleString()} %`;
      }),
    },
    {
      key: 'AI Trading, News...',
      value: activeMachines.map((machine) => {
        let aiTradingNews = machine.quantwise.aiTradingNews;

        return aiTradingNews ? 'Yes' : 'No';
      }),
    },
    {
      key: 'Capping',
      value: activeMachines.map((machine) => {
        let capping = machine.quantwise.capping;

        if (!capping) {
          return `Unlimited`;
        }
        return `$ ${capping.toLocaleString()}`;
      }),
    },
    {
      key: 'AI Trading Software',
      value: activeMachines.map((machine) => {
        let aiTradingSoftware = machine.quantwise.aiTradingSoftware;

        if (!aiTradingSoftware) {
          return `-`;
        }
        return `${aiTradingSoftware.toLocaleString()}`;
      }),
    },
  ];

  return (
    <GlobalAccordian
      selectionMode="multiple"
      headingClassName="bg-gradient-white rounded-lg text-lg text-defaultBlack font-medium px-4 border-b border-borderBlue"
    >
      <AccordionItem key="1" aria-label={'LAYER K'} title={'LAYER K'}>
        <GlobalRowTable TableData={LayerKTableData} highlightResult={false} cols={4} />
      </AccordionItem>

      <AccordionItem key="2" aria-label={'QUANTWISE'} title={'QUANTWISE'}>
        <GlobalRowTable TableData={QuantwiseTableData} highlightResult={false} cols={4} />
      </AccordionItem>

      <AccordionItem key="3" aria-label={'SUPERNODE'} title={'SUPERNODE'}>
        <GlobalRowTable TableData={QuantwiseTableData} highlightResult={false} cols={4} />
      </AccordionItem>
    </GlobalAccordian>
  );
};

export default BenefitsLayerK;
