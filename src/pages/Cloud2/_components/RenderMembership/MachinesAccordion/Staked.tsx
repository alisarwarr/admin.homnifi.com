import { useState } from 'react';
import CustomSwitch from '../../../../../components/Global/GlobalSwitch';
import Toottip from '../../../../../components/Global/Toottip';

const Staked = () => {
  const [autoCompundToggle, setAutoCompundToggle] = useState(false);

  // const { handleClose, handleOpen, open } = useModalHook();

  return (
    <section className="px-2 py-3 border border-borderBlue rounded-lg shadow-tableCardShadow text-primaryGrey font-normal w-full h-full flex gap-2 flex-col justify-center">
      {/* <GlobalModal onClose={handleClose} isOpen={open} size="5xl">
        <StakeMoreModalBody />
      </GlobalModal> */}

      <article className="flex items-center justify-between w-full">
        <span className="text-primaryDark font-medium text-sm uppercase">staked</span>

        <Toottip
          content={
            <div className="p-3 bg-white shadow-md rounded-lg text-xs font-normal w-52">
              You’ve reached your maximum Limit of staking for this machine.
              <span className="text-primary">Buy New Machine</span>
            </div>
          }
        >
          <button
            type="button"
            className="px-4 py-1 bg-primaryDark text-xs text-white rounded-md hover:bg-primary transition-all shadow-buttonShadow"
          >
            + Stake More
          </button>
        </Toottip>
      </article>
      <span className="text-primary font-semibold text-lg">
        $ 25,000 <span className="text-sm">LYK</span>
      </span>

      <article className="flex items-center gap-2">
        <span className="text-primaryDark text-xs font-medium">AUTO COMPOUND</span>
        <CustomSwitch checked={autoCompundToggle} onChange={(checked: any) => setAutoCompundToggle(checked)} />
      </article>

      <span className="bg-cardBg text-primary w-max p-2 rounded-md text-xs">Turn on and get 30% more</span>
    </section>
  );
};

export default Staked;
