import { useEffect, useState } from 'react';
// REDUX
import { useTokenActions } from '../../store/token/tokenAction';
import { selectToken } from '../../store/token/tokenSlice';
import { useSelector } from 'react-redux';
// COMMON
import { refresh, add } from '../../images/other';
import TokensTable from '../../components/Token/TokenTable';
import Button from '../../components/Button';
import AddToken from './AddToken';

const Tokens = () => {
  const { getTokensList } = useTokenActions();
  const { tokensList } = useSelector(selectToken);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<any>();

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getTokensList();
      setLoading(false);
    })();
  }, []);

  const onPopupHandler = () => {
    setOpen(!open);
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
    setSelectedToken(itm);
    setOpen(true);
  };

  return (
    <div className="w-full px-2 border py-4 rounded-md">
      {/* PAGE TITLE */}
      <div className="flex bg-primary items-center  text-white">
        <h1 className="flex-1 font-bold text-2xl px-3 py-1">Tokens</h1>

        <div className="flex gap-1 items-center cursor-pointer px-3" onClick={onPopupHandler}>
          <img src={add} alt="" width={24} height={24} />
          <span> Add Token</span>
        </div>
      </div>

      {/* TABLE */}
      <TokensTable data={data} loading={loading} onEditHanlder={onEditHanlder} />
      <AddToken open={open} onClose={onPopupHandler} />
    </div>
  );
};

export default Tokens;
