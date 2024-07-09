import { useEffect, useRef, useState } from 'react';
// import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SaveBar from '../../../../components/SaveBar';
// import FileUpload from '@/components/upload/FileUpload';
import { download, photo } from '../../../../images/other';
import { useNavigate, useParams } from 'react-router-dom';

// REDUX
import { useProductActions } from '../../../../store/products/productActions';
import ReactSelect from '../../../../components/ReactSelect';
import { errorAlert, successAlert } from '../../../../utils/alerts';
import FormikInput from '../../../../components/FormikInput';
import { useProvidersActions } from '../../../../store/providers/providerActions';
import { useSelector } from 'react-redux';
import { selectProviderSlice } from '../../../../store/providers/providerSlice';
import { Product, selectProductSlice } from '../../../../store/products/productSlice';
import VouchersTable from '../../../../components/VouchersTable';
import Dialog from '../../../../components/Dialog/BasicDialog';
import { TRANSACTION_TYPES } from '../../../../constants';
import GlobalSelect from '../../../../components/Global/GlobalSelect';

const validationSchema = Yup.object().shape({
  type: Yup.mixed().required('Type is required.'),
  status: Yup.mixed().required('Status is required.'),
  question: Yup.string().required('Description is required.'),
  url: Yup.number().required('Price is required.'),
});

const updateValidationSchema = Yup.object().shape({
  type: Yup.mixed().required('Type is required.'),
  status: Yup.mixed().required('Status is required.'),
  question: Yup.string().required('Description is required.'),
  url: Yup.number().required('Price is required.'),
});

const formFields = [
  { key: 'question', label: 'Question', type: 'text' },
  { key: 'url', label: 'Question', type: 'text' },
];

const PRODUCT_STATUS_LABEL: any = {
  ACTIVE: 'Active',
  INACTIVE: 'In-Active',
};

const AddFaqs = () => {
  // STATES
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [duplicateVouchers, setDuplicateVouchers] = useState({ open: false, duplicates: [] });

  const { addProduct, getProducts, updateProduct, getProductById } = useProductActions();
  const { getProviders } = useProvidersActions();

  const navigate = useNavigate();

  const { providers } = useSelector(selectProviderSlice);
  const { products } = useSelector(selectProductSlice);

  const { id } = useParams();

  const fileInputRef = useRef<any>(null);

  const initialValues: {
    type: any;
    status: any;
    question: string;
    url: any;
    [key: string]: any;
  } = {
    type: '',
    status: '',
    question: '',
    url: '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: id ? updateValidationSchema : validationSchema,

    onSubmit: async (values) => {
      setSaveLoading(true);
      const _values: any = {
        ...values,
        provider: values.provider?.value,
        status: values.status?.value,
      };

      const formData = new FormData();
      for (const key in _values) {
        if (key === 'image') {
          if (_values.image instanceof Blob) {
            formData.append(key, _values[key]);
            continue;
          } else {
            continue;
          }
        }

        // if (key === 'vouchers' && id) {
        //   continue;
        // }

        formData.append(key, _values[key]);
      }
      try {
        let response;

        if (id) {
          response = await updateProduct(id, formData);
        } else {
          response = await addProduct(formData);
        }

        if (response?.status) {
          await getProducts(true);
          if (!id) {
            successAlert(response?.message);
            navigate('/products');
          } else {
            successAlert(response?.message);
          }
        } else {
          if (response.data?.errorVouchers) {
            setDuplicateVouchers({ open: true, duplicates: response.data?.errorVouchers });
          } else {
            errorAlert(response?.message);
          }
        }
      } catch (error) {
        console.error(`Product ${id ? 'update' : 'add'} failed`, error);
      } finally {
        setSaveLoading(false);
      }
    },
  });

  return (
    <div className="w-full px-6 py-2 sm:py-8 mb-20 lg:px-8 text-white max-w-[1700px] mx-auto ">
      <div className="mx-auto text-start">
        <h2 className="text-xl font-bold  sm:text-1xl text-primary">{id ? 'Update' : 'Add'} Faq</h2>
      </div>

      <form onSubmit={formik.handleSubmit} className="">
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 mt-12">

          <GlobalSelect
            required
            label="Trx. Type"
            name="type"
            options={[
              { label: 'Deposit', value: TRANSACTION_TYPES.DEPOSIT },
              { label: 'WithDraw', value: TRANSACTION_TYPES.WITHDRAW },
              { label: 'Transfer', value: TRANSACTION_TYPES.TRANSFER },
              { label: 'Swap', value: TRANSACTION_TYPES.SWAP },
            ]}
            placeholder='Select Value'
            setFieldTouched={() => formik.setFieldTouched('type', true)}
            setFieldValue={(e: any) => {
              formik.setFieldValue('type', e);
            }}
            isError={formik.touched.type && !!formik.errors.type}
            value={formik.values.type.value}
            onChange={(e: any) => {
              formik.setFieldValue('type', e);
            }}
            onBlur={formik.handleBlur}
          />


          <GlobalSelect
            required
            label="Status"
            name="status"
            options={[
              { label: 'Active', value: 'ACTIVE' },
              { label: 'In-Active', value: 'INACTIVE' },
            ]}
            placeholder='Select Value'
            setFieldTouched={() => formik.setFieldTouched('status', true)}
            setFieldValue={(e: any) => {
              formik.setFieldValue('status', e);
            }}
            isError={formik.touched.status && !!formik.errors.status}
            value={formik.values.status.value}
            onChange={(e: any) => {
              formik.setFieldValue('status', e);
            }}
            onBlur={formik.handleBlur}
          />

          {formFields.map((field) => (
            <div key={field.key}>
              <FormikInput
                label={field.label}
                name={field.key}
                type={field.type}
                placeholder={`Enter ${field.label}`}
                error={formik.errors[field.key]}
                touched={formik.touched[field.key]}
                value={formik.values[field.key]}
                onChange={(e: any) => formik.setFieldValue(field.key, e.target.value)}
              />
            </div>
          ))}
        </div>
      </form>
      <div className="mt-3">
        <SaveBar
          btnText={'Submit'}
          onSubmit={formik.handleSubmit}
          loading={saveLoading}
          disabled={saveLoading}
          onCancel={() => navigate('/products')}
        />
      </div>
      {id && <VouchersTable id={id} status="AVAILABLE" />}

      <Dialog
        className="max-w-4xl"
        open={duplicateVouchers.open}
        onClose={() => setDuplicateVouchers((prev) => ({ ...prev, open: false }))}
      >
        <h2 className="text-red-500 text-center">Duplicate Vouchers Found!</h2>
        <p className="font-light text-xs">Please resolve the file and re upload</p>
        <p className="font-light text-xs italic">Below are the duplicate vouchers</p>
        <div className="flex gap-2 flex-wrap w-full my-3">
          {duplicateVouchers.duplicates.map((dup: any, i: number) => (
            <span key={i} className="px-4 py-1 rounded-full bg-slate-700">
              {dup}
            </span>
          ))}
        </div>
      </Dialog>
    </div>
  );
};

export default AddFaqs;
