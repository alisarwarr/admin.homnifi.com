import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SaveBar from '../../../components/SaveBar';
import { download, photo } from '../../../images/other';
import { useNavigate } from 'react-router-dom';
import { useProductActions } from '../../../store/products/productActions';
import ReactSelect from '../../../components/ReactSelect';
import { errorAlert, successAlert } from '../../../utils/alerts';
import FormikInput from '../../../components/FormikInput';
import { useProvidersActions } from '../../../store/providers/providerActions';
import { useSelector } from 'react-redux';
import { selectProviderSlice } from '../../../store/providers/providerSlice';
import GlobalSelect from '../../../components/Global/GlobalSelect';

const validationSchema = Yup.object().shape({
  provider: Yup.string().required('Provider is required.'),
  status: Yup.string().required('Status is required.'),
  name: Yup.string().required('Name is required.'),
  description: Yup.string().required('Description is required.'),
  price: Yup.number().required('Price is required.'),
  image: Yup.string().required('Product Image is required.'),
  vouchers: Yup.string().required('Vouchers are required.'),
  externalProductId: Yup.string().required('External Product ID is required.'),
  skuId: Yup.string().required('SKU ID is required.'),
  mintingPower: Yup.number().required('Minting Power is required.'),
  mintingPowerPerc: Yup.number().required('Minting Power Percentage is required.'),
  defiPortal: Yup.boolean().required('Defi Portal is required.'),
  airdropPromo: Yup.number().required('Airdrop Promo is required.'),
  stakeLimit: Yup.number().required('Stake Limit is required.'),
  tokenAirdrop: Yup.number().required('Token Airdrop is required.'),
  licenseName: Yup.string().required('License Name is required.'),
  profitSplitFee: Yup.number().required('Profit Split Fee is required.'),
  aiTradingNews: Yup.boolean().required('AI Trading News is required.'),
  aiTradingSoftwareName: Yup.string().required('AI Trading Software Name is required.'),
  superNodeLevel: Yup.number().required('Super Node Level is required.'),
  globalPool: Yup.number().required('Global Pool is required.'),
  bonus: Yup.number().required('Bonus is required.'),
});

const AddProduct = () => {
  // STATES
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [duplicateVouchers, setDuplicateVouchers] = useState<{ open: boolean; duplicates: string[] }>({
    open: false,
    duplicates: [],
  });

  const { addProduct, getProducts } = useProductActions();
  const { getProviders } = useProvidersActions();

  const navigate = useNavigate();

  const { providers } = useSelector(selectProviderSlice);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const initialValues = {
    provider: '',
    status: 'ACTIVE',
    name: '',
    description: '',
    price: '',
    image: '',
    vouchers: '',
    externalProductId: '',
    skuId: '',
    mintingPower: '',
    mintingPowerPerc: '',
    defiPortal: false,
    airdropPromo: '',
    stakeLimit: '',
    tokenAirdrop: '',
    licenseName: '',
    profitSplitFee: '',
    aiTradingNews: false,
    aiTradingSoftwareName: '',
    superNodeLevel: '',
    globalPool: '',
    bonus: '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setSaveLoading(true);

      try {
        const response = await addProduct(values);

        if (response?.status) {
          await getProducts(true);
          successAlert(response?.message);
          navigate('/products');
        } else {
          if (response.data?.errorVouchers) {
            setDuplicateVouchers({ open: true, duplicates: response.data?.errorVouchers });
          } else {
            errorAlert(response?.message);
          }
        }
      } catch (error) {
        console.error('Product add failed', error);
      } finally {
        setSaveLoading(false);
      }
    },
  });

  useEffect(() => {
    if (!providers?.list?.length) {
      getProviders(true);
    }
  }, []);

  const handleProductImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      formik.setFieldValue('image', e.target.files[0]);
    }
  };

  const handleProductVouchersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      formik.setFieldValue('vouchers', e.target.files[0]);
    }
  };

  const handleSelectProductImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full px-6 py-2 sm:py-8 mb-20 lg:px-8 text-primary max-w-[1700px] mx-auto">
      <div className="mx-auto text-start">
        <h2 className="text-xl font-bold  tracking-tight sm:text-2xl">Add Product</h2>
      </div>

      <form onSubmit={formik.handleSubmit} className="">
        {/* PRODUCT IMAGE */}

        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 mt-12">
          <GlobalSelect
            required
            label="Status"
            name="status"
            placeholder="select status"
            options={[
              { label: 'Active', value: 'Active' },
              { label: 'Disable', value: 'In Active' },
            ]}
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isError={formik.touched.status && !!formik.errors.status}
            error={formik.errors.status}
            setFieldTouched={formik.setFieldTouched}
            setFieldValue={formik.setFieldValue}
          />

          {Object.keys(initialValues).map((key) => {
            if (key === 'provider' || key === 'status' || key === 'image') {
              return null;
            }

            return (
              <FormikInput
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                name={key}
                type={typeof initialValues[key] === 'number' ? 'number' : 'text'}
                placeholder={`Enter ${key}`}
                error={formik.errors[key]}
                touched={formik.touched[key]}
                value={formik.values[key]}
                onChange={formik.handleChange}
              />
            );
          })}
        </div>

        {/* SAVE BUTTON */}

        <div className="h-16" />
      </form>
    </div>
  );
};

export default AddProduct;
