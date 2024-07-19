import { RadialBarCustomLayerProps, ResponsiveRadialBar } from '@nivo/radial-bar';
import React from 'react';
import { bgData, data } from '../../constants/cloud';

function GaugePointer() {
  // if (valueAngle === null) {
  //   // No value to display
  //   console.log(valueAngle);
  //   return null;
  // }

  const target = {
    x: 130 + 0.37 * Math.sin(140),
    y: 78 - 0.37 * Math.cos(90),
  };

  console.log('Target', target);

  return (
    <g>
      {/* <circle cx={130} cy={78} r={5} fill="white" strokeWidth={3} stroke='white' className='shadow' /> */}
      <circle cx={target.x} cy={target.y} r={5} fill="black" strokeWidth={3} stroke="black" className="shadow" />
      {/* <path
          d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
          stroke="red"
          strokeWidth={3}
        /> */}
    </g>
  );
}

const TestChart = () => {
  return (
    <div className="relative w-full h-96">
      <ResponsiveRadialBar
        data={bgData}
        maxValue={100}
        startAngle={-90}
        endAngle={90}
        innerRadius={0.35}
        padding={0.5}
        cornerRadius={45}
        margin={{ top: 40, right: 120, bottom: 40, left: 40 }}
        colors={['#EEEEEE']} // background color
        borderWidth={0} // no border for background
        enableRadialGrid={false}
        enableCircularGrid={false}
        radialAxisStart={null}
        circularAxisOuter={null}
        labelsSkipAngle={13}
        legends={[]}
      />

      <div className="absolute top-0 left-0 w-full h-full">
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
        <ResponsiveRadialBar
          data={data}
          maxValue={100}
          startAngle={-85}
          endAngle={85}
          innerRadius={0.37} // slightly larger inner radius to create space
          padding={0.75}
          cornerRadius={45}
          margin={{ top: 40, right: 120, bottom: 40, left: 40 }}
          colors={() => 'url(#gradientColor)'} // color scheme for actual bar
          borderColor={{
            from: 'color',
            modifiers: [['darker', 1]],
          }}
          enableRadialGrid={false}
          enableCircularGrid={false}
          radialAxisStart={null}
          circularAxisOuter={null}
          labelsSkipAngle={13}
          legends={[]}
          enableTracks={false}
          layers={['bars', GaugePointer]}
        />
      </div>
    </div>
  );
};

export default TestChart;
