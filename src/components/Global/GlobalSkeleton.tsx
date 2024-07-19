import { Skeleton } from '@mui/material';
import React from 'react';

type Props = {
  animationValue: false | 'wave' | 'pulse' | undefined;
  sx?: object;
  className?: string;
  width?: number | string;
  height?: number | string;
  variant?: 'text' | 'rectangular' | 'rounded' | 'circular';
};

const GlobalSkeleton = ({ animationValue, sx, className, width, height, variant }: Props) => {
  return (
    <Skeleton
      variant={variant}
      animation={animationValue}
      sx={{ ...sx }}
      className={className}
      width={width}
      height={height}
    />
  );
};

export default GlobalSkeleton;
