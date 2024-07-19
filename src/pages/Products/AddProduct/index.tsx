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
import { lowerCaseAllLetters } from '../../../utils/utils';

const validationSchema = Yup.object().shape({
  status: Yup.mixed().required('Status is required.'),
  defiPortal: Yup.mixed().required('Fefi Portal  is required.'),
  aiTradingNews: Yup.mixed().required('Ai Trading News   is required.'),
  name: Yup.string().required('Name is required.'),
  url: Yup.string().required('Url is required.'),
  imageUrl: Yup.string().required('Product Image is required.'),
  externalProductId: Yup.string().required('External Product ID is required.'),
  skuId: Yup.string().required('SKU ID is required.'),
  description: Yup.string().required('Description is required.'),
  price: Yup.number().required('Price is required.'),
  mintingPower: Yup.number().required('Minting Power is required.'),
  vouchers: Yup.string().required('Vouchers are required.'),
  airdropPromo: Yup.number().required('Airdrop Promo are required.'),
  stakeLimit: Yup.number().required('Stake Limit is required.'),
  tokenAirdrop: Yup.number().required('Token Air Drop is required.'),
  mintingPowerPerc: Yup.number().required(
    'Minting Power Percentage is required.'
  ),
  capping: Yup.mixed().required('Capping is required.'),
  profitSplitFee: Yup.number().required('Super Node Level is required.'),
  licenseName: Yup.string().required('license Name is required.'),
  aiTradingSoftwareName: Yup.string().required(
    'aiTrading Software Name is required.'
  ),
  superNodeLevel: Yup.number().required('Super Node Level is required.'),
  globalPool: Yup.number().required('Global Pool is required.'),
  bonus: Yup.number().required('Bonus is required.'),
});

const AddProduct = () => {
  // STATES
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [duplicateVouchers, setDuplicateVouchers] = useState<{
    open: boolean;
    duplicates: string[];
  }>({
    open: false,
    duplicates: [],
  });

  const { addProduct, getProducts } = useProductActions();

  const navigate = useNavigate();

  const { providers } = useSelector(selectProviderSlice);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const initialValues: {
    status: { value: string; label: string };
    defiPortal: { value: string; label: string };
    aiTradingNews: { value: string; label: string };
    name: string;
    description: string;
    price: number;
    url: string;
    imageUrl: string;
    vouchers: string;
    externalProductId: string;
    skuId: string;
    mintingPower: number;
    mintingPowerPerc: number;
    airdropPromo: number;
    stakeLimit: number;
    tokenAirdrop: number;
    licenseName: string;
    profitSplitFee: number;
    aiTradingSoftwareName: string;
    superNodeLevel: number;
    globalPool: number;
    bonus: number;
    capping: number;
    [key: string]: any;
  } = {
    status: { value: '', label: '' },
    defiPortal: { value: '', label: '' },
    aiTradingNews: { value: '', label: '' },

    name: '',
    description: '',
    price: 0,
    url: 'https://s3-alpha-sig.figma.com/img/7e81/61ad/d52b69a5f11e633605fd221870e6fc43?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hPKa4Ho9VT0BN2ERm2guLOaKPe~0ImqnIWO5G5UqxdI9H3kPxCOdXUWGFjerYrN1Cc2yn5j7bdJGLgl2JUPjaNlO6zISB5BQt2Ff6ysaqXrc8qiRzSXFbbUtW5z7KSIS~iJ31~-qpxqB~dnBVm48QmYxk3lOLLJ8kp9Sq0CqesDcDL9pZ1CvY5gmvcVXM2OFg-K5mY3fdTl0O7rY5xeNTsb9QjYG9ShJ5wH3gxReokQUoXeoeGPm1RrVb6kIAZy83WDeUReDgZapAKs-3ysDm320FEwC0nKQpiIzzO3nBYj0S~xYJE1ikNKpDOqm2cLrR6LmubiDN9d9s2EbbP92VQ__',
    imageUrl:
      'https://s3-alpha-sig.figma.com/img/7e81/61ad/d52b69a5f11e633605fd221870e6fc43?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hPKa4Ho9VT0BN2ERm2guLOaKPe~0ImqnIWO5G5UqxdI9H3kPxCOdXUWGFjerYrN1Cc2yn5j7bdJGLgl2JUPjaNlO6zISB5BQt2Ff6ysaqXrc8qiRzSXFbbUtW5z7KSIS~iJ31~-qpxqB~dnBVm48QmYxk3lOLLJ8kp9Sq0CqesDcDL9pZ1CvY5gmvcVXM2OFg-K5mY3fdTl0O7rY5xeNTsb9QjYG9ShJ5wH3gxReokQUoXeoeGPm1RrVb6kIAZy83WDeUReDgZapAKs-3ysDm320FEwC0nKQpiIzzO3nBYj0S~xYJE1ikNKpDOqm2cLrR6LmubiDN9d9s2EbbP92VQ__',
    vouchers: '',
    externalProductId: '',
    skuId: '',
    mintingPower: 0,
    mintingPowerPerc: 0.0,
    airdropPromo: 0,
    stakeLimit: 0,
    tokenAirdrop: 0,
    licenseName: '',
    profitSplitFee: 0,
    aiTradingSoftwareName: '',
    superNodeLevel: 0,
    globalPool: 0,
    bonus: 0,
    capping: 0,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const _value = {
        ...values,
        status:
          lowerCaseAllLetters(values.status.value) === 'true' ? true : false,
        defiPortal:
          lowerCaseAllLetters(values.defiPortal.value) === 'true'
            ? true
            : false,
        aiTradingNews:
          lowerCaseAllLetters(values.aiTradingNews.value) === 'true'
            ? true
            : false,
      };

      console.log('🚀 ~ onSubmit: ~ values:', _value);
      setSaveLoading(true);

      try {
        const response = await addProduct(_value);

        if (response?.status) {
          await getProducts(true);
          successAlert(response?.message);
          navigate('/cloudk2/products');
        } else {
          if (response.data?.errorVouchers) {
            setDuplicateVouchers({
              open: true,
              duplicates: response.data?.errorVouchers,
            });
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
  console.log('formik', formik.errors);

  return (
    <div className="w-full px-6 py-2 sm:py-8 mb-20 lg:px-8 text-primary max-w-[1700px] mx-auto">
      <div className="mx-auto text-start">
        <h2 className="text-xl font-bold  tracking-tight sm:text-2xl">
          Add Product
        </h2>
      </div>

      <form onSubmit={formik.handleSubmit} className="">
        {/* PRODUCT IMAGE */}

        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 mt-12">
          <GlobalSelect
            required
            label="Status"
            name="status"
            placeholder="Select status"
            options={[
              { label: 'Active', value: 'Active' },
              { label: 'Disable', value: 'In Active' },
            ]}
            value={formik.values.status?.value}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isError={formik.touched.status && !!formik.errors.status}
            error={formik.errors.status}
            // setFieldTouched={formik.setFieldTouched}
            // setFieldValue={formik.setFieldValue}

            setFieldTouched={() => formik.setFieldTouched('status', true)}
            setFieldValue={(e: any, opition: any) => {
              formik.setFieldValue(e, opition);
            }}
          />
          <GlobalSelect
            required
            label="Defi Portal"
            name="defiPortal"
            placeholder="Select Defi portal"
            options={[
              { label: 'True', value: 'true' },
              { label: 'False', value: 'false' },
            ]}
            value={formik.values.defiPortal?.value}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isError={formik.touched.defiPortal && !!formik.errors.defiPortal}
            error={formik.errors.defiPortal}
            // setFieldTouched={formik.setFieldTouched}
            // setFieldValue={formik.setFieldValue}

            setFieldTouched={() => formik.setFieldTouched('defiPortal', true)}
            setFieldValue={(e: any, opition: any) => {
              formik.setFieldValue(e, opition);
            }}
          />
          <GlobalSelect
            required
            label="Status"
            name="aiTradingNews"
            placeholder="Select Ai Trading"
            options={[
              { label: 'True', value: 'true' },
              { label: 'False', value: 'false' },
            ]}
            value={formik.values.aiTradingNews?.value}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isError={
              formik.touched.aiTradingNews && !!formik.errors.aiTradingNews
            }
            error={formik.errors.aiTradingNews}
            // setFieldTouched={formik.setFieldTouched}
            // setFieldValue={formik.setFieldValue}

            setFieldTouched={() =>
              formik.setFieldTouched('aiTradingNews', true)
            }
            setFieldValue={(e: any, opition: any) => {
              formik.setFieldValue(e, opition);
            }}
          />

          {Object.keys(initialValues).map((key) => {
            if (
              key === 'status' ||
              key === 'defiPortal' ||
              key === 'aiTradingNews'
            ) {
              return null;
            }
            return (
              <FormikInput
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                name={key}
                type={
                  typeof initialValues[key] === 'number' ? 'number' : 'text'
                }
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
        <SaveBar
          btnText={'Submit'}
          onSubmit={formik.handleSubmit}
          loading={saveLoading}
          disabled={saveLoading}
          onCancel={() => navigate('/providers')}
        />
      </form>
    </div>
  );
};

export default AddProduct;
