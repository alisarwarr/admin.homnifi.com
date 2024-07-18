import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '../../../components/Button';
import GlobalInput from '../../../components/Global/GlobalInput';
import GlobalSelect from '../../../components/Global/GlobalSelect';
import GlobalDialog from '../../../components/Dialog';
import { ReactComponent as CrossIcon } from '../../../SVGIcons/cancelIcon.svg';

interface Props {
  open: boolean;
  onClose: () => void;
}

function AddToken({ open, onClose }: Props) {
  const initialValues = {
    name: '',
    displayName: '',
    rate: '',
    networkType: '',
    networkDisplayName: '',
    tokenType: '',
    withdrawType: '',
    tokenIcon: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    displayName: Yup.string().required('Display name is required'),
    rate: Yup.string().required('Rate is required'),
    tokenType: Yup.string().required('Token Type is required'),
    tokenIcon: Yup.string().required('Token icon is required'),
    withdrawType: Yup.string().required('Withdraw type is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log('values', values);
      onClose();
      resetForm();
    },
  });

  const { handleChange, handleSubmit, values, errors, touched, resetForm } =
    formik;

  return (
    <div>
      <GlobalDialog
        open={open}
        size="md"
        closeButtonShow={false}
        onClose={onClose}
        content={
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center py-2">
              <div className=" text-md font-medium">Add Token</div>
              <div className="cursor-pointer" onClick={onClose}>
                <CrossIcon />
              </div>
            </div>
            <div className="mx-4 md:mx-2 mt-4">
              <div className="flex flex-col  md:flex-row w-full">
                <div className="w-full md:w-1/2 mx-2">
                  <GlobalInput
                    name="name"
                    label="Name"
                    placeholder="Enter your name"
                    type="text"
                    required
                    value={values.name}
                    onChange={handleChange}
                    isError={errors.name}
                    error={errors.name}
                  />
                </div>

                <div className="w-full md:w-1/2 mx-2">
                  <GlobalInput
                    name="displayName"
                    label="Display Name"
                    placeholder="Enter your display name"
                    type="text"
                    required
                    className="w-1/2"
                    value={values.displayName}
                    onChange={handleChange}
                    isError={errors.displayName}
                    error={errors.displayName}
                  />
                </div>
              </div>

              <div className="flex flex-col md:items-baseline  md:flex-row w-full">
                <div className="w-full md:w-1/2 mx-2">
                  <GlobalInput
                    name="rate"
                    label="Rate"
                    placeholder="1"
                    type="number"
                    required
                    value={values.rate}
                    onChange={handleChange}
                    isError={errors.rate}
                    error={errors.rate}
                  />
                </div>

                <div className="w-full md:w-1/2 mx-2 pt-2">
                  <GlobalSelect
                    label="Network Type"
                    labelOptionClass={'text-left'}
                    name={'networkType'}
                    placeholder={'Selecte ..'}
                    options={[
                      { label: 'one', value: 'one' },
                      { label: 'two', value: 'two' },
                      { label: 'three', value: 'three' },
                    ]}
                    isError={false}
                    onChange={(e) => {
                      console.log('event ::', e);
                      formik.setFieldValue('networkType', e);
                    }}
                    inputClass="mb-2 w-full"
                    value={values.networkType}
                  />
                </div>
                <div className="w-full md:w-1/2 mx-2">
                  <GlobalInput
                    name="networkDisplayName"
                    label="Network Display Name"
                    placeholder="Enter your"
                    type="text"
                    value={values.networkDisplayName}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full md:w-1/2 mx-2">
                  <GlobalSelect
                    required
                    label="Token Type"
                    labelOptionClass={'text-left'}
                    name={'tokenType'}
                    placeholder={'Selecte ..'}
                    options={[
                      { label: 'one', value: 'one' },
                      { label: 'two', value: 'two' },
                      { label: 'three', value: 'three' },
                    ]}
                    isError={
                      errors.tokenType && touched.tokenType ? true : false
                    }
                    onChange={(e) => {
                      formik.setFieldValue('tokenType', e);
                    }}
                    inputClass="mb-2 w-full"
                    value={values.tokenType}
                    error={errors.tokenType}
                  />
                </div>
              </div>
              <div className="flex flex-col  md:flex-row md:items-baseline  w-full">
                <div className="w-full md:w-1/2 mx-2">
                  <GlobalSelect
                    required
                    label="Withdraw Type"
                    labelOptionClass={'text-left'}
                    name={'withdrawType'}
                    placeholder={'Selecte ..'}
                    options={[
                      { label: 'one', value: 'one' },
                      { label: 'two', value: 'two' },
                      { label: 'three', value: 'three' },
                    ]}
                    setFieldTouched={() =>
                      formik.setFieldTouched('withdrawType', true)
                    }
                    error={errors.withdrawType}
                    isError={
                      touched.withdrawType && errors.withdrawType ? true : false
                    }
                    value={values.withdrawType}
                    onChange={(e: any) => {
                      console.log('event 123 ::', e);
                      formik.setFieldValue('withdrawType', e);
                    }}
                    onBlur={formik.handleBlur}
                    inputClass="mb-2 w-full"
                  />
                </div>

                <div className="w-full md:w-1/2 mx-2">
                  <GlobalInput
                    name="tokenIcon"
                    label="Token Icon"
                    placeholder="Enter your name"
                    type="text"
                    required
                    value={values.tokenIcon}
                    onChange={handleChange}
                    isError={errors.tokenIcon}
                    error={errors.tokenIcon}
                  />
                </div>
              </div>
              <div className="mx-4 md:mx-2 my-2">
                <div className="flex flex-col  md:flex-row w-full">
                  <Button
                    className="bg-primary rounded-full my-4"
                    loadingType="circular"
                    buttonType="submit"
                  >
                    Add Token
                  </Button>
                </div>
              </div>
            </div>
          </form>
        }
      />
    </div>
  );
}

export default AddToken;
