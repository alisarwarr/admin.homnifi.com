import React from 'react';
import GlobalStepper from '../../../Global/GlobalSteper';
import GlobalDialog from '../../../Dialog';
import { ReactComponent as CrossIcon } from '../../../../SVGIcons/crossIcon.svg';
interface Props {
  onClose: () => void;
  open?: boolean;
}
function HistoryPopup({ onClose, open = false }: Props) {
  return (
    <div>
      <GlobalDialog
        open={open}
        size="md"
        closeButtonShow={false}
        onClose={onClose}
        content={
          <div>
            <div
              className="flex justify-end items-center cursor-pointer"
              onClick={onClose}
            >
              <CrossIcon />
            </div>
            <div className="w-full h-full flex flex-col md:flex-row">
              <div className="w-2/3 my-2">
                <div className="flex py-2 w-full">
                  <div className="w-14">
                    <GlobalStepper
                      step={1}
                      enableBackground={true}
                      lineEnable={true}
                    />
                  </div>
                  <div className="flex flex-col items-start w-full gap-2">
                    <div className="text-defaultBlack text-sm font-semibold">
                      Withdraw Order Submitted
                    </div>
                    <div className="text-sm pt-2 pb-4">2024-06-27 17:54</div>
                  </div>
                </div>

                <div className="flex py-4 w-full">
                  <div className="w-14">
                    <GlobalStepper
                      step={2}
                      enableBackground={true}
                      lineEnable={true}
                    />
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <div className="text-defaultBlack text-sm font-semibold">
                      System Processing
                    </div>
                    <div className="text-sm pt-2 pb-4">2024-06-27 17:58</div>
                  </div>
                </div>

                <div className="flex w-full py-2">
                  <div className="w-14">
                    <GlobalStepper
                      step={3}
                      enableBackground={false}
                      lineEnable={false}
                    />
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <div className="text-defaultBlack text-sm font-semibold">
                      Completed
                    </div>
                    <div className="text-sm">2024-06-27 18:45</div>
                  </div>
                </div>

                <div className="flex w-full py-2">
                  <div className="flex flex-col w-full gap-2 mx-12">
                    <div className="flex">
                      <button className="text-xs px-2 py-1 rounded-md text-white bg-primaryGreen cursor-pointer">
                        Accept
                      </button>
                      <button className="text-xs px-2 py-1  rounded-md text-white bg-primaryRed cursor-pointer ml-2">
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/3 my-2 mx-12">
                <div className="w-full">
                  <div className="flex flex-row md:flex-col w-full gap-2 py-2">
                    <div className="text-defaultBlack text-sm font-semibold">
                      Status
                    </div>
                    <div className="text-sm">Completed</div>
                  </div>
                  <div className="flex flex-row md:flex-col w-full gap-2 py-2">
                    <div className="text-defaultBlack text-sm font-semibold">
                      Transiction ID
                    </div>
                    <div className="text-sm">W0x603758db5</div>
                  </div>
                  <div className="flex flex-row md:flex-col w-full gap-2 py-2">
                    <div className="text-defaultBlack text-sm font-semibold">
                      Withdraw Token
                    </div>
                    <div className="text-sm">LYK - W</div>
                  </div>
                  <div className="flex flex-row md:flex-col w-full gap-2 py-2">
                    <div className="text-defaultBlack text-sm font-semibold">
                      Receive Token
                    </div>
                    <div className="text-sm">USDT</div>
                  </div>
                  <div className="flex flex-row md:flex-col w-full gap-2 py-2">
                    <div className="text-defaultBlack text-sm font-semibold">
                      Amount
                    </div>
                    <div className="text-sm">$ 350.00</div>
                  </div>
                  <div className="flex flex-row md:flex-col w-full gap-2 py-2">
                    <div className="text-defaultBlack text-sm font-semibold">
                      Destination
                    </div>
                    <div className="text-sm">0x6037d5v5gsd8e1fb157</div>
                  </div>
                  <div className="flex flex-row md:flex-col w-full gap-2 py-2">
                    <div className="text-defaultBlack text-sm font-semibold">
                      TxID
                    </div>
                    <div className="text-sm">0x6037d5v5gsd8e52284f</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}

export default HistoryPopup;
