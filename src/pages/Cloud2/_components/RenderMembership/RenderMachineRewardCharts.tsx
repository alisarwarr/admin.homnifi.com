import React from 'react';
import RadialChart from '../../../../components/Cloud/RadialChart';
import { MachineImage } from '../../../../images/cloud';

type Props = {};

const RenderMachineRewardCharts = (props: Props) => {
  return (
    <div className="xl:w-2/5 w-full flex justify-between gap-2 p-6">
      <div className="w-full flex flex-col gap-6">
        <span className="text-xl font-medium text-primaryDark">XK 5000</span>
        <div className="w-full flex justify-center">
          <img src={MachineImage} alt="Machine" className="w-1/2" />
        </div>
        <table>
          <thead>
            <tr>
              <th className="text-left font-normal text-primaryGrey text-sm">
                Status:
              </th>
              <td>
                <div className="bg-primaryGreen/20 rounded-full w-20 flex items-center justify-center gap-2 px-2 py-1">
                  <span className="relative flex h-2 w-2">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-primaryGreen`}
                    ></span>
                    <span
                      className={`relative inline-flex rounded-full h-2 w-2 bg-primaryGreen`}
                    ></span>
                  </span>
                  <span className="text-sm text-primaryGreen">Active</span>
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="text-left font-normal text-primaryGrey text-sm">
                Product
              </th>
              <td>75.00 (0.21%)</td>
            </tr>
          </tbody>
        </table>

        <div className="w-full bg-borderLightGray h-0.5" />

        <div className="flex flex-col items-center gap-4">
          <div className="w-full flex gap-10 justify-center items-center">
            <span className="uppercase font-medium text-primaryDark">
              staked
            </span>
            <button className="bg-primaryDark rounded text-white px-2 py-1 text-sm hover:bg-primary transition-all duration-300">
              + Stake More
            </button>
          </div>
          <div className="text-5xl text-primary font-medium">
            12,000
            <span className="text-base"> LYK</span>
          </div>
          <div className="flex gap-4 items-center">
            <div className="uppercase font-medium">Auto Compound</div>
          </div>
        </div>
      </div>
      <div className="w-0.5 bg-borderLightGray h-full" />

      <div className="w-full flex flex-col items-center gap-6">
        <span className="text-sm font-medium text-primaryDark">Rewards</span>
        <div className="w-full">
          <RadialChart />
        </div>
        <div className="w-full bg-borderLightGray h-0.5" />
      </div>
    </div>
  );
};

export default RenderMachineRewardCharts;
