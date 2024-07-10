import * as React from 'react';
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from '@mui/x-charts/Gauge';

function GaugePointer({ strokeWidth }: { strokeWidth?: number }) {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) {
    // No value to display
    return null;
  }

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle) + 11,
  };
  return (
    <g>
      <circle
        cx={target.x}
        cy={target.y}
        r={5}
        rx="9.5"
        fill="white"
        strokeWidth={strokeWidth || 8}
        stroke="white"
      />
    </g>
  );
}

type TGaugeChart = {
  containerHeight?: number;
  containerWidth?: number;
  strokeWidth?: number;
};

export default function GaugeChart({
  containerHeight,
  containerWidth,
  strokeWidth,
}: TGaugeChart) {
  return (
    <>
      <svg width="0" height="0">
        <defs>
          <linearGradient id="gradientColor" x1="0" y1="0" x2="1" y2="1">
            <stop stop-color="#8AD5EC" />
            <stop offset="0%" stop-color="#8AD5EC" />
            <stop offset="50%" stop-color="#1D9FDA" />
            <stop offset="100%" stop-color="#F16364" />
          </linearGradient>
        </defs>
      </svg>
      <GaugeContainer
        width={containerWidth || 200}
        height={containerHeight || 200}
        startAngle={-90}
        endAngle={90}
        value={30}
        cornerRadius="50%"
        //   outerRadius='50%'
        margin={{ top: 10, bottom: 10, left: 10, right: 10 }}
        // outerRadius={10}
        sx={{
          stroke: '#EEEEEE',
          strokeWidth: 6,
          veExclude: 'outside',
          background: 'url(#gradientColor)',
        }}
      >
        <GaugeReferenceArc />
        <GaugeValueArc />
        <GaugePointer strokeWidth={strokeWidth} />
      </GaugeContainer>
    </>
  );
}
