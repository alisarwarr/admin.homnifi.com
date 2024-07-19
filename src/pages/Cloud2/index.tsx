import React, { useState } from 'react';

import RenderCloudMain from './_components/RenderCloudMain';
import { Alert } from '@mui/material';
import { dangerYellow, refresh } from '../../images/other';
import { useLocation } from 'react-router-dom';
import RenderMemberShip from './_components/RenderMemberShip';

const Cloud2 = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  return <RenderMemberShip />;
};

export default Cloud2;
