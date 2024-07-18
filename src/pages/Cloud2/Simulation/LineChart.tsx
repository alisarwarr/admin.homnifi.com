import React from 'react';

import { ResponsiveLine } from '@nivo/line';
import { TChartDataType, TChartDataDefs, TChartDataFill } from '../../../interfaces/lineChart.types';

type TLineChart = {
  enableCustomtooltip?: boolean;
  data: TChartDataType;
  defs?: TChartDataDefs;
  fill?: TChartDataFill;
  margin?: object;
  colors?: string[];
  containerClassName?: string;
};

const LineChart = ({
  enableCustomtooltip = false,
  data,
  defs,
  fill,
  margin = { top: 50, right: 110, bottom: 50, left: 60 },
  colors,
  containerClassName,
}: TLineChart) => {
  const CustomTooltip = ({ point }: { point: any }) => (
    <div
      style={{
        padding: '12px',
        background: 'white',
        border: '1px solid #ccc',
        fontSize: '12px',
        color: '#939393',
      }}
    >
      <div className="flex items-center justify-between">
        <div>{point.data.xFormatted}</div>
        <div>17:56</div>
      </div>
      <br />
      <div className="flex items-center gap-2">
        <div
          style={{
            width: '10px',
            height: '10px',
            backgroundColor: point.serieColor,
            borderRadius: '100%',
          }}
        ></div>
        <div>
          {point.serieId}: <span className="font-medium text-secondaryBlack">{point.data.xFormatted}</span>
        </div>
      </div>
      <br />
    </div>
  );

  const DashedLine = ({
    series,
    lineGenerator,
    xScale,
    yScale,
  }: {
    series: any;
    lineGenerator: any;
    xScale: any;
    yScale: any;
  }) => {
    return (
      <>
        {series.map((serie: any) => (
          <path
            key={serie.id}
            d={lineGenerator(
              serie.data.map((d: any) => ({
                x: xScale(d.data.x),
                y: yScale(d.data.y),
              }))
            )}
            fill="none"
            stroke={serie.color}
            style={{
              strokeWidth: 2,
              strokeDasharray: '6, 6', // Custom dashed style
            }}
          />
        ))}
      </>
    );
  };

  return (
    <div className={containerClassName || `w-full h-72`}>
      {!enableCustomtooltip ? (
        <ResponsiveLine
          data={data}
          margin={{ top: 10, right: 10, bottom: 20, left: 10 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false,
          }}
          colors={colors || ['#0E173F', '#1B9FDA']}
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
          layers={['grid', 'markers', 'areas', DashedLine, 'slices', 'points', 'axes', 'legends']}
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
      ) : (
        <ResponsiveLine
          data={data}
          defs={defs}
          fill={fill}
          margin={margin}
          colors={colors || ['#0E173F', '#1B9FDA']}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false,
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: 36,
            legendPosition: 'middle',
            truncateTickAt: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: -40,
            legendPosition: 'middle',
            truncateTickAt: 0,
            format: (value) => `$ ${value}`,
          }}
          enableGridX={false}
          enablePoints={false}
          pointSize={11}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={6}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabel="data.yFormatted"
          pointLabelYOffset={-12}
          enableTouchCrosshair={true}
          useMesh={true}
          legends={[
            {
              anchor: 'top-right',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: -30,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
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
          theme={{
            axis: {
              ticks: {
                text: {
                  fontSize: 14,
                  fill: '#616161', // Change the color
                  fontFamily: 'Rubik, sans-serif', // Change the font family
                  fontWeight: 400, // Change the font weight
                },
              },
              legend: {
                text: {
                  fontSize: 16,
                  fill: '#616161', // Change the color
                  fontFamily: 'Rubik, sans-serif', // Change the font family
                  fontWeight: 400, // Change the font weight
                },
              },
            },
          }}
          tooltip={CustomTooltip}
        />
      )}
    </div>
  );
};

export default LineChart;
