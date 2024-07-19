import React from 'react';
import { ResponsiveRadialBar } from '@nivo/radial-bar';
import { data } from '../../constants/cloud';

const RadialChart = () => {
  const currentValue = 25000; // Example current value
  const maxValue = 45000; // Example max value
  const angle = (currentValue / maxValue) * 180 - 90;

  return (
    // <div className="w-full h-96">
    //   <ResponsiveRadialBar
    //     data={data}
    //     startAngle={-90}
    //     layers={['tracks']}
    //     endAngle={90}
    //     innerRadius={0.5}
    //     padding={0.5}
    //     cornerRadius={26}
    //     colors={'#EEEEEE'}
    //     margin={{ top: 40, right: 120, bottom: 40, left: 40 }}
    //     enableRadialGrid={false}
    //     enableCircularGrid={false}
    //     radialAxisStart={null}
    //     labelsSkipAngle={8}
    //     legends={[]}
    //     circularAxisOuter={null}
    //     borderWidth={4}
    //     borderColor={{
    //       from: 'color',
    //       modifiers: [['darker', 0.3]],
    //     }}
    //   />
    // </div>
    <div className="relative w-full h-96">
      <ResponsiveRadialBar
        data={data}
        startAngle={-90}
        endAngle={90}
        innerRadius={0.5}
        padding={0.5}
        cornerRadius={26}
        colors={[
          '#1B9FDA',
          '#89D5ED',
          '#1B9FDA',
          '#1B9FDA',
          '#EEEEEE',
          '#FF6363',
          '#1B9FDA',
        ]} // Customize the colors as needed
        margin={{ top: 40, right: 120, bottom: 40, left: 40 }}
        enableRadialGrid={false}
        enableCircularGrid={false}
        radialAxisStart={null}
        labelsSkipAngle={8}
        legends={[]}
        circularAxisOuter={null}
        borderWidth={4}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.3]],
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-bold">$ 25,000</span>
        <span className="text-sm">LYK - D</span>
      </div>
      <div className="absolute left-0 bottom-0 ml-4 mb-4 text-xs">$0</div>
      <div className="absolute right-0 bottom-0 mr-4 mb-4 text-xs">
        $45,000.00
      </div>
    </div>
  );
};

export default RadialChart;
