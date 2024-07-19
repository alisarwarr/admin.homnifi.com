import AddToken from './AddToken';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import { refresh, add } from '../../images/other';

import { selectToken } from '../../store/token/tokenSlice';

import TokensTable from '../../components/Token/TokenTable';
import { useTokenActions } from '../../store/token/tokenAction';
import Loader from '../../components/Loader/Loader';

const Tokens = () => {
  const { getTokensList } = useTokenActions();
  const { tokensList } = useSelector(selectToken);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedToken, setSelectedToken] = useState<any>();

  useEffect(() => {
    if (tokensList.length === 0) {
      getTokensList();
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } else {
      setLoading(false);
    }
  }, []);

  //popup handler
  const onPopupHandler = () => {
    setOpen(!open);
    if (open) {
      setSelectedToken(null);
    }
  };

  const data = [
    {
      id: 'ufdfd98f9dso',
      name: 'Slyk',
      displayName: 'SLYK',
      type: 'onChain',
      rate: 4,
    },
    {
      id: 'kjrewjrhjhkl',
      name: 'myk',
      displayName: 'K Voucher',
      type: 'offChain',
      rate: 3,
    },
  ];

  const onEditHanlder = (itm: any) => {
    console.log('item edit ::', itm);
    setSelectedToken(itm);
    setOpen(true);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full px-2 border py-4 rounded-md">
      <div className="flex bg-primary items-center table-head-bg text-white">
        <h1 className="flex-1 font-bold text-2xl px-3 py-1">Tokens</h1>

        <div
          className="flex gap-1 items-center cursor-pointer px-3"
          onClick={onPopupHandler}
        >
          <img src={add} alt="" width={24} height={24} />
          <span> Add Token</span>
        </div>
      </div>

      {/* TABLE */}
      <TokensTable
        data={data}
        loading={loading}
        onEditHanlder={onEditHanlder}
      />
      <AddToken
        open={open}
        onClose={onPopupHandler}
        editToken={selectedToken}
      />
    </div>
  );
};

export default Tokens;
