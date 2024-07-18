import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import RenderProductHistory from '../_components/RenderMembership/RenderProductHistory';
import { useSelector } from 'react-redux';
import { useProductActions } from '../../../store/products/productActions';
import { selectProductSlice } from '../../../store/products/productSlice';
import { add, refresh } from '../../../images/other';

const ProductList = () => {
  const { getProducts } = useProductActions();
  const { products } = useSelector(selectProductSlice);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex bg-primary items-center  text-white">
        <h1 className="flex-1 font-bold text-2xl px-3 py-1">Product List</h1>
        <div
          className="flex gap-1 items-center cursor-pointer px-3"
          onClick={async () => {
            // await getDepositHistoryRequests(true, filter);
          }}
        >
          <img src={refresh} alt="refresh" width={24} height={24} />
          <span>Refresh</span>
        </div>
        <div
          className="flex gap-1 items-center cursor-pointer px-3"
          onClick={() =>
            navigate('/cloudk2/products/add', { state: { edit: false } })
          }
        >
          <img src={add} alt="" width={24} height={24} />
          <span>Add Product</span>
        </div>
      </div>
      <RenderProductHistory products={products} />
    </div>
  );
};

export default ProductList;
