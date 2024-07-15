import React from 'react';
import { Tooltip, Button } from '@nextui-org/react';
interface ToottipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}
const Toottip = ({ content, children }: ToottipProps) => {
  return (
    <div>
      <Tooltip placement={'right-start'} content={content}>
        {children}
      </Tooltip>
    </div>
  );
};

export default Toottip;
