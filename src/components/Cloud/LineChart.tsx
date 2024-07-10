import React from 'react';

import { ResponsiveLine } from '@nivo/line';
import { lineData } from '../../constants/cloud';

const LineChart = () => {
  return (
    <div className="w-full h-72">
      <ResponsiveLine
        data={lineData}
        margin={{ top: 10, right: 10, bottom: 20, left: 10 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        colors={['#0E173F', '#1B9FDA']}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisLeft={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: 36,
          legendPosition: 'start',
          truncateTickAt: 0,
        }}
        enableGridX={false}
        enablePoints={false}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'color', modifiers: [] }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableArea={true}
        areaBaselineValue={40}
        areaOpacity={0.05}
        enableCrosshair={false}
        crosshairType="top-left"
        useMesh={true}
        legends={[
          {
            anchor: 'top-right',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 0,
            itemsSpacing: 20,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 10,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default LineChart;
