import React, { useState } from 'react';
import Button from '../../../components/Button';
import AddWithdrawSettings from './AddWithdrawSetting';

function WithdrawSetting() {
  const [open, setOpen] = useState(false);
  const onPopupHandler = () => {
    setOpen(!open);
  };
  return (
    <div className="w-full px-2 border py-4 rounded-md">
      {/* PAGE TITLE */}
      <div className="flex bg-gray-100 items-center">
        <h1 className="flex-1 font-bold text-2xl px-3 py-1">Withdraw Setting</h1>

        <div
          className="flex gap-1 items-center cursor-pointer px-3"
          //   onClick={async () => {
          //     setLoading(true);
          //     await getTokensList(true);
          //     setLoading(false);
          //   }}
        ></div>
      </div>
      <div className="flex justify-end">
        <Button
          className=" bg-primary rounded-md my-2"
          loadingType="circular"
          buttonType="button"
          onClick={onPopupHandler}
        >
          Add Withdraw Settings
        </Button>
      </div>
      <AddWithdrawSettings onClose={onPopupHandler} open={open} />
    </div>
  );
}

export default WithdrawSetting;
