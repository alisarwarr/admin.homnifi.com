import * as React from 'react';
import { useGaugeState, Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

const StartText = ({ startText }: { startText?: string }) => {
  const { valueAngle } = useGaugeState();
  if (valueAngle === null) {
    // No value to display
    return null;
  }

  return (
    <text x={5} y={170}>
      {startText || '0.00'}
    </text>
  );
};

const EndText = ({ limit, endText }: { limit?: number; endText?: string }) => {
  const { valueAngle } = useGaugeState();
  if (valueAngle === null) {
    // No value to display
    return null;
  }

  return (
    <text x={170} y={170}>
      {endText || limit}
    </text>
  );
};

const DotElement = () => {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();
  if (valueAngle === null) {
    // No value to display
    return null;
  }
  return (
    <g>
      <circle
        cx={cx + (outerRadius - 8) * Math.sin(valueAngle)}
        cy={cy - (outerRadius - 10) * Math.cos(valueAngle)}
        r={8}
        fill="white"
        strokeWidth={2}
        stroke="gray"
      />
    </g>
  );
};

type TGaugeChart = {
  containerHeight?: number;
  containerWidth?: number;
  strokeWidth?: number;
  value?: number;
  limit?: number;
  startText?: string;
  endText?: string;
};

export default function GaugeChart({
  value,
  limit,
  startText,
  endText,
}: TGaugeChart) {
  const normalizedValue = limit
    ? Math.min(((value || 0) / limit) * 100, 100)
    : 0;

  const settings = {
    width: 200,
    height: 200,
    value: normalizedValue,
    startAngle: -90,
    endAngle: 90,
  };

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

      <Gauge
        {...settings}
        cornerRadius="50%"
        sx={() => ({
          [`& .${gaugeClasses.valueArc}`]: {
            fill: 'url(#gradientColor)',
            stroke: '#EEEEEE',
            strokeWidth: 6,
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: '#EEEEEE',
          },
        })}
        text={''}
      >
        <DotElement />
        <StartText startText={startText} />
        <EndText limit={limit || 10000} endText={endText} />
      </Gauge>
    </>
  );
}
