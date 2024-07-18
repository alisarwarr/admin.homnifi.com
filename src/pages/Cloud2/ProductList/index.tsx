import React, { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import RenderMemberShip from '../_components/RenderMemberShip';
import RenderProductHistory from '../_components/RenderMembership/RenderProductHistory';
import useLoading from '../../../utils/hooks/useLoading';
import { useCloudActions } from '../../../store/cloudk/cloudk.action';
import { selectCloudkSlice } from '../../../store/cloudk/cloudk.slice';
import { useSelector } from 'react-redux';
import { useProductActions } from '../../../store/products/productActions';
import { selectProductSlice } from '../../../store/products/productSlice';
import { add, refresh } from '../../../images/other';

const ProductList = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const { isLoading, startLoading, stopLoading } = useLoading();
  const { getProducts } = useProductActions();
  const { products } = useSelector(selectProductSlice);
  const navigate = useNavigate();
  console.log('🚀 ~ ProductList ~ products:', products);
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
          onClick={() => navigate('/cloudk2/products/add', { state: { edit: false } })}
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
