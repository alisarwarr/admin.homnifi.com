import { useEffect, useRef, useState } from 'react';
// import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SaveBar from '../../../../components/SaveBar';
import { useNavigate, useParams } from 'react-router-dom';

// REDUX
import { errorAlert, successAlert } from '../../../../utils/alerts';
import FormikInput from '../../../../components/FormikInput';
import VouchersTable from '../../../../components/VouchersTable';
import Dialog from '../../../../components/Dialog/BasicDialog';
import { TRANSACTION_TYPES } from '../../../../constants';
import GlobalSelect from '../../../../components/Global/GlobalSelect';
import { useFaqActions } from '../../../../store/wallet/faqs/faqActions';
import { lowerCaseAllLetters } from '../../../../utils/utils';

const validationSchema = Yup.object().shape({
  type: Yup.mixed().required('Type is required.'),
  status: Yup.mixed().required('Status is required.'),
  question: Yup.string().required('Description is required.'),
  videoUrl: Yup.string().matches(
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be|vimeo\.com|dailymotion\.com)\/.+$/,
    'Enter a valid video URL from YouTube, Vimeo, or Dailymotion.'
  ),
  answer: Yup.string().required('Answer is required.'),
});

const updateValidationSchema = Yup.object().shape({
  type: Yup.mixed().required('Type is required.'),
  status: Yup.mixed().required('Status is required.'),
  question: Yup.string().required('Description is required.'),
  videoUrl: Yup.string().matches(
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be|vimeo\.com|dailymotion\.com)\/.+$/,
    'Enter a valid video URL from YouTube, Vimeo, or Dailymotion.'
  ),
  answer: Yup.string().required('Answer is required.'),
});

const formFields = [
  { key: 'question', label: 'Question', type: 'text' },
  { key: 'answer', label: 'Answer', type: 'text' },
  { key: 'videoUrl', label: 'Video Url', type: 'text' },
];

const PRODUCT_STATUS_LABEL: any = {
  ACTIVE: 'Active',
  INACTIVE: 'In-Active',
};

const AddFaqs = () => {
  // STATES
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [duplicateVouchers, setDuplicateVouchers] = useState({
    open: false,
    duplicates: [],
  });

  const { addFaq, getFaqs } = useFaqActions();

  const navigate = useNavigate();

  const { id } = useParams();

  const initialValues: {
    type: any;
    status: any;
    question: string;
    answer: string;
    videoUrl: string;

    [key: string]: any;
  } = {
    type: '',
    status: '',
    answer: '',
    question: '',
    videoUrl: '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: id ? updateValidationSchema : validationSchema,

    onSubmit: async (values) => {
      setSaveLoading(true);
      const _values: any = {
        ...values,
        type: lowerCaseAllLetters(values.type?.value),
        status: lowerCaseAllLetters(values.status?.value),
      };

      try {
        let response;

        if (id) {
          // response = await updateProduct(id, formData);
        } else {
          response = await addFaq(_values);
        }
        if (response?.status) {
          successAlert(response?.message);
          await getFaqs(true);

          navigate('/history/faq');
        }
        console.log('response', response);
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
        <h2 className="text-xl font-bold  sm:text-1xl text-primary">
          {id ? 'Update' : 'Add'} Faq
        </h2>
      </div>

      <form onSubmit={formik.handleSubmit} className="">
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 mt-12">
          <GlobalSelect
            required
            label="Transaction Type"
            name="type"
            options={[
              { label: 'Deposit', value: TRANSACTION_TYPES.DEPOSIT },
              { label: 'WithDraw', value: TRANSACTION_TYPES.WITHDRAW },
              { label: 'Transfer', value: TRANSACTION_TYPES.TRANSFER },
              { label: 'Swap', value: TRANSACTION_TYPES.SWAP },
            ]}
            placeholder="Select Value"
            setFieldTouched={() => formik.setFieldTouched('type', true)}
            setFieldValue={(e: any, opition: any) => {
              formik.setFieldValue(e, opition);
            }}
            isError={formik.touched.type && !!formik.errors.type}
            error={formik.errors.type}
            value={formik.values.type.value}
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
            placeholder="Select Value"
            setFieldTouched={() => formik.setFieldTouched('status', true)}
            setFieldValue={(e: any, opition: any) => {
              formik.setFieldValue(e, opition);
            }}
            isError={formik.touched.status && !!formik.errors.status}
            error={formik.errors.status}
            value={formik.values.status.value}
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
                onChange={(e: any) =>
                  formik.setFieldValue(field.key, e.target.value)
                }
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
        onClose={() =>
          setDuplicateVouchers((prev) => ({ ...prev, open: false }))
        }
      >
        <h2 className="text-red-500 text-center">Duplicate Vouchers Found!</h2>
        <p className="font-light text-xs">
          Please resolve the file and re upload
        </p>
        <p className="font-light text-xs italic">
          Below are the duplicate vouchers
        </p>
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
