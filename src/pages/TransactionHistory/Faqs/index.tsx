import { useEffect, useState } from 'react';
// REDUX
import { useSelector } from 'react-redux';

// COMMON
import { add, refresh } from '../../../images/other';
import { Link } from 'react-router-dom';
import FaqTable from '../../../components/FaqTable';
import { useFaqActions } from '../../../store/wallet/faqs/faqActions';
import { selectFaqSlice } from '../../../store/wallet/faqs/faqSlice';

const Faqs = () => {
  const { getFaqs } = useFaqActions();
  const { products } = useSelector(selectFaqSlice);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getFaqs();
      setLoading(false);
    })();
  }, []);

  return (
    <div className="w-full px-2">
      {/* PAGE TITLE */}
      <div className="flex bg-primary items-center  text-white">
        <h1 className="flex-1 font-bold text-2xl px-3 py-1">Products</h1>

        <div
          className="flex gap-1 items-center cursor-pointer px-3"
          onClick={async () => {
            setLoading(true);
            await getFaqs(true);
            setLoading(false);
          }}
        >
          <img src={refresh} alt="" width={24} height={24} />
          <span>Refresh</span>
        </div>

        <Link to={'/history/faq/add'} className="flex gap-1 text-white items-center cursor-pointer px-3">
          <img src={add} alt="" width={24} height={24} />
          <span>Add Faq</span>
        </Link>
      </div>

      {/* TABLE */}
      <FaqTable data={products} loading={loading} page={page} setPage={setPage} />
    </div>
  );
};

export default Faqs;
