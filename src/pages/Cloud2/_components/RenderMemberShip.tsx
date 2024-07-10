import RewardHistory from '../../../components/Cloud/RewardHistory';
import RewardsTillNow from './RenderMembership/RewardsTillNow';
import RenderMachinesHistory from './RenderMembership/RenderMachinesHistory';

type Props = {};

const RenderMemberShip = (props: Props) => {
  return (
    <div className="flex flex-col gap-10">
      <div className="w-full flex gap-4">
        {/* <RewardsAnalytics /> */}

        <RewardsTillNow />
      </div>

      <div className="flex flex-col gap-4">
        <div className="text-lg font-medium">Machines</div>
        <div className="w-full bg-white border border-borderLightGray rounded-lg shadow overflow-hidden flex flex-wrap">
          <RenderMachinesHistory />

          {/* <RenderMachineRewardCharts /> */}
        </div>
      </div>


    </div>
  );
};

export default RenderMemberShip;
