import React, { useState } from 'react';

import RenderCloudMain from './_components/RenderCloudMain';
import { Alert } from '@mui/material';
import { dangerYellow, refresh } from '../../images/other';
import { useLocation } from 'react-router-dom';
import RenderMemberShip from './_components/RenderMemberShip';

const Cloud2 = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  return (
    <section className="w-full flex flex-col gap-10">
       <div className="flex bg-primary items-center  text-white">
        <h1 className="flex-1 font-bold text-2xl px-3 py-1">Cloud K 2.0</h1>
        <div
          className="flex gap-1 items-center cursor-pointer px-3"
          onClick={async () => {
            setLoading(true);
          }}
        >
          <img src={refresh} alt="" width={24} height={24} />
          <span>Refresh</span>
        </div>
      </div>
      <RenderMemberShip />
    </section>
  );
};

export default Cloud2;
