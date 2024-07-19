import { useState } from 'react';
import GlobalHeader from '../Global/GlobalHeader';
import CardLayout from '../Cards/CardLayout.tsx';
import GlobalSlider from '../Global/GlobalSlider';

type Props = {};

const TABS_DATA = [
  { name: 'Homnifi A', selected: true },
  { name: 'Homnifi B', selected: false },
  { name: 'Homnifi C', selected: false },
  { name: 'Homnifi D', selected: false },
  { name: 'Homnifi E', selected: false },
];

const Time_TABS_DATA = [
  { name: '1 YEAR', selected: true, price: '$200 (~30 LYK)' },
  { name: '2 YEAR', selected: false, price: '$200 (~30 LYK)' },
  { name: '3 YEAR', selected: false, price: '$200 (~30 LYK)' },
  { name: '4 YEAR', selected: false, price: '$200 (~30 LYK)' },
  { name: '5 YEAR', selected: false, price: '$200 (~30 LYK)' },
];

const RewardsCalculator = (props: Props) => {
  const [selectedTab, setSelectedTab] = useState(TABS_DATA);

  const [timeTab, setSelectedTimeTab] = useState(Time_TABS_DATA);

  const [rewardsCalculator, setRewardsCalculator] = useState({
    tokenCalculation: 0,
  });

  return (
    <section className="w-full flex flex-col gap-10">
      <article className="flex items-center justify-between">
        <GlobalHeader title="Rewards Calculator" />
      </article>

      <article className="col-span-12 flex flex-col gap-3">
        <span className="text-base text-primaryDark font-medium">Select a Minter</span>

        <div className="flex items-center gap-3">
          {selectedTab.map((tab, index) => (
            <button
              type="button"
              className={`text-base font-normal px-5 py-2 rounded-md w-max ${
                tab.selected ? 'bg-primary/10 text-primary' : 'text-primaryGrey border border-blueGrey'
              }`}
              key={index}
              onClick={() => {
                setSelectedTab((prev) => {
                  let newPill = [...prev];

                  newPill = newPill.map((pill) => ({
                    ...pill,
                    selected: false,
                  }));

                  newPill[index].selected = !newPill[index].selected;
                  return newPill;
                });
              }}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </article>

      <article>
        <CardLayout className="!rounded-md bg-white p-5 flex flex-col gap-3">
          <h1 className="text-primaryDark text-lg font-semibold">Add Token</h1>

          <section className="grid grid-cols-2">
            <article className="md:col-span-1 col-span-2 flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-defaultBlack text-xl font-medium">
                  $ {rewardsCalculator.tokenCalculation.toLocaleString()} LYK
                </span>

                <span className="text-defaultBlack text-xl font-medium">
                  ≈ {rewardsCalculator.tokenCalculation * 3}
                  LYK
                </span>
              </div>

              <GlobalSlider
                maxValue={30000}
                currentValue={10000}
                getCurrentValue={(value) => {
                  setRewardsCalculator({
                    ...rewardsCalculator,
                    tokenCalculation: Number(value),
                  });
                }}
                baseClassName="!w-full !col-span-2 !max-w-full"
              />

              <div className="flex items-center gap-3">
                {timeTab.map((tab, index) => (
                  <button
                    type="button"
                    className={`text-xs flex flex-col items-center gap-1 font-normal px-5 py-2 rounded-full w-max ${
                      tab.selected ? 'bg-primary text-white' : 'text-primaryGrey border border-blueGrey'
                    }`}
                    key={index}
                    onClick={() => {
                      setSelectedTimeTab((prev) => {
                        let newPill = [...prev];

                        newPill = newPill.map((pill) => ({
                          ...pill,
                          selected: false,
                        }));

                        newPill[index].selected = !newPill[index].selected;
                        return newPill;
                      });
                    }}
                  >
                    <span className="font-medium">{tab.name}</span>
                    <span>{tab.price}</span>
                  </button>
                ))}
              </div>
            </article>

            <article className="md:col-span-1 col-span-2"></article>
          </section>
        </CardLayout>
      </article>
    </section>
  );
};

export default RewardsCalculator;
