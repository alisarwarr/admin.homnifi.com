import React from 'react';
import Product from '../../pages/Cloud2/_components/RenderMembership/MachinesAccordion/Product';
import LifetimeRewards from '../../pages/Cloud2/_components/RenderMembership/MachinesAccordion/LifetimeRewards';
import Staked from '../../pages/Cloud2/_components/RenderMembership/MachinesAccordion/Staked';
import Skalable from '../../pages/Cloud2/_components/RenderMembership/MachinesAccordion/Skalable';
import ExpiresIn from '../../pages/Cloud2/_components/RenderMembership/MachinesAccordion/ExpiresIn';

type Props = {
  data?: any;
  row?: any;
  headCells?: any;
};

const MachinesAccordion = ({ data, headCells, row }: Props) => {

  return (
    < >
      <td >
        <Product  />
      </td>
      <td >
        <LifetimeRewards />
      </td>
      <td >
        <Staked />
      </td>
      <td >
        <Skalable />
      </td>
      <td >
        <ExpiresIn />
      </td>
    </>

  );
};

export default MachinesAccordion;
