import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '../../../../components/Button';
import GlobalDialog from '../../../../components/Dialog';
import GlobalInput from '../../../../components/Global/GlobalInput';
import GlobalSelect from '../../../../components/Global/GlobalSelect';
import { ReactComponent as CrossIcon } from '../../../../SVGIcons/cancelIcon.svg';

interface Props {
  open: boolean;
  onClose: () => void;
  selectedSetting?: any;
}

function AddWithdrawSettings({ open, onClose, selectedSetting }: Props) {
  const [isSubmit, setIsSubmit] = React.useState(false);
  const initialValues = {
    type: '',
    withdrawFrom: '',
    withdrawTo: '',
    minAmount: '',
    maxAmount: '',
    withdrawRate: '',
    feeType: '',
    commissionRate: '',
    commissionType: '',
  };

  const validationSchema = Yup.object().shape({
    type: Yup.string().required('Type is required'),
    feeType: Yup.string().required('Fee type is required'),
    minAmount: Yup.string().required('Min amount is required'),
    maxAmount: Yup.string().required('Max amount is required'),
    withdrawRate: Yup.string().required('WithdrawRate is required'),
    withdrawTo: Yup.string().required('Withdraw To name is required'),
    commissionRate: Yup.string().required('Commission rate is required'),
    commissionType: Yup.string().required('Commission type is required'),
    withdrawFrom: Yup.string().required('Withdraw From is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setIsSubmit(true);
      console.log('values', values);
      onClose();
      resetForm();
    },
  });

  const { handleChange, handleSubmit, values, errors, touched, resetForm } = formik;

  useEffect(() => {
    console.log('selectedSetting ::', selectedSetting);
  }, [selectedSetting]);

  return (
    <div>
      <GlobalDialog
        open={open}
        size="md"
        closeButtonShow={false}
        onClose={onClose}
        content={
          <form
            onSubmit={(e) => {
              setIsSubmit(true);
              handleSubmit(e);
            }}
          >
            <div className="flex justify-between items-center py-2">
              <div className="text-md font-medium  md:mx-6">Add Withdraw Settings</div>
              <div
                className="cursor-pointer -mr-2"
                onClick={() => {
                  setIsSubmit(false);
                  onClose();
                }}
              >
                <CrossIcon />
              </div>
            </div>
            <div className="mx-4 md:mx-4 mt-4">
              <div className="flex flex-col  md:flex-row w-full">
                <div className="w-full md:w-1/2 mx-2">
                  <GlobalSelect
                    required
                    label="Type"
                    labelOptionClass={'text-left'}
                    name={'type'}
                    placeholder={'Selecte Type'}
                    options={[
                      { label: 'one', value: 'one' },
                      { label: 'two', value: 'two' },
                      { label: 'three', value: 'three' },
                    ]}
                    setFieldTouched={() => formik.setFieldTouched('type', true)}
                    error={errors.type}
                    isError={isSubmit && errors.type && touched.type ? true : false}
                    value={values.type}
                    onChange={(e: any) => {
                      console.log('event 123 ::', e);
                      formik.setFieldValue('type', e);
                    }}
                    onBlur={formik.handleBlur}
                    inputClass="mb-2 w-full"
                  />
                </div>

                <div className="w-full md:w-1/2 mx-2">
                  <GlobalSelect
                    required
                    label="Withdraw From"
                    labelOptionClass={'text-left'}
                    name={'withdrawFrom'}
                    placeholder={'Selecte From'}
                    options={[
                      { label: 'one', value: 'one' },
                      { label: 'two', value: 'two' },
                      { label: 'three', value: 'three' },
                    ]}
                    setFieldTouched={() => formik.setFieldTouched('withdrawFrom', true)}
                    error={errors.withdrawFrom}
                    isError={isSubmit && errors.withdrawFrom && touched.withdrawFrom ? true : false}
                    value={values.withdrawFrom}
                    onChange={(e: any) => {
                      console.log('event 123 ::', e);
                      formik.setFieldValue('withdrawFrom', e);
                    }}
                    onBlur={formik.handleBlur}
                    inputClass="mb-2 w-full"
                  />
                </div>
                <div className="w-full md:w-1/2 mx-2">
                  <GlobalSelect
                    required
                    label="Withdraw To"
                    labelOptionClass={'text-left'}
                    name={'withdrawTo'}
                    placeholder={'Selecte To'}
                    options={[
                      { label: 'one', value: 'one' },
                      { label: 'two', value: 'two' },
                      { label: 'three', value: 'three' },
                    ]}
                    setFieldTouched={() => formik.setFieldTouched('withdrawTo', true)}
                    error={errors.withdrawTo}
                    isError={isSubmit && errors.withdrawTo && touched.withdrawTo ? true : false}
                    value={values.withdrawTo}
                    onChange={(e: any) => {
                      console.log('event 123 ::', e);
                      formik.setFieldValue('withdrawTo', e);
                    }}
                    onBlur={formik.handleBlur}
                    inputClass="mb-2 w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col md:items-baseline  md:flex-row w-full">
                <div className="w-full md:w-1/2 mx-2">
                  <GlobalInput
                    name="minAmount"
                    label="Min.Amount"
                    placeholder="Enter min amount"
                    type="number"
                    required
                    value={values.minAmount}
                    onChange={handleChange}
                    isError={isSubmit && errors.minAmount}
                    error={errors.minAmount}
                  />
                </div>

                <div className="w-full md:w-1/2 mx-2">
                  <GlobalInput
                    required
                    name="maxAmount"
                    label="Max. Amount"
                    placeholder="Enter max amount"
                    type="text"
                    value={values.maxAmount}
                    onChange={handleChange}
                    isError={isSubmit && errors.maxAmount}
                    error={errors.maxAmount}
                  />
                </div>
              </div>
              <div className="w-full text-primary mx-2 my-1">Withdrawal Fees (inEurk)</div>

              <div className="flex flex-col  md:flex-row md:items-baseline  w-full">
                <div className="w-full md:w-1/2 mx-2">
                  <GlobalInput
                    name="withdrawRate"
                    label="Rate"
                    placeholder="Enter rate"
                    type="text"
                    required
                    value={values.withdrawRate}
                    onChange={handleChange}
                    isError={isSubmit && errors.withdrawRate && touched.withdrawRate ? true : false}
                    error={errors.withdrawRate}
                  />
                </div>

                <div className="w-full md:w-1/2 mx-2">
                  <GlobalSelect
                    required
                    label="Fee Type"
                    labelOptionClass={'text-left'}
                    name={'feeType'}
                    placeholder={'Selecte Type'}
                    options={[
                      { label: 'one', value: 'one' },
                      { label: 'two', value: 'two' },
                      { label: 'three', value: 'three' },
                    ]}
                    setFieldTouched={() => formik.setFieldTouched('feeType', true)}
                    error={errors.feeType}
                    isError={isSubmit && errors.feeType && touched.feeType ? true : false}
                    value={values.feeType}
                    onChange={(e: any) => {
                      console.log('event 123 ::', e);
                      formik.setFieldValue('feeType', e);
                    }}
                    onBlur={formik.handleBlur}
                    inputClass="mb-2 w-full"
                  />
                </div>
              </div>
              <div className="w-full text-primary mx-2 my-1">Withdrawal Commission</div>
              <div className="flex flex-col  md:flex-row md:items-baseline  w-full">
                <div className="w-full md:w-1/2 mx-2">
                  <GlobalInput
                    name="commissionRate"
                    label="Rate"
                    placeholder="Enter your name"
                    type="text"
                    required
                    value={values.commissionRate}
                    onChange={handleChange}
                    isError={isSubmit && errors.commissionRate}
                    error={errors.commissionRate}
                  />
                </div>

                <div className="w-full md:w-1/2 mx-2">
                  <GlobalSelect
                    required
                    label="Commission Type"
                    labelOptionClass={'text-left'}
                    name={'commissionType'}
                    placeholder={'Selecte commission'}
                    options={[
                      { label: 'one', value: 'one' },
                      { label: 'two', value: 'two' },
                      { label: 'three', value: 'three' },
                    ]}
                    setFieldTouched={() => formik.setFieldTouched('commissionType', true)}
                    error={errors.commissionType}
                    isError={isSubmit && errors.commissionType && touched.commissionType ? true : false}
                    value={values.commissionType}
                    onChange={(e: any) => {
                      console.log('event 123 ::', e);
                      formik.setFieldValue('commissionType', e);
                    }}
                    onBlur={formik.handleBlur}
                    inputClass="mb-2 w-full"
                  />
                </div>
              </div>
              <div className="mx-4 md:mx-2 my-2">
                <div className="flex flex-col  md:flex-row w-full">
                  <Button className="bg-primary rounded-full my-4" loadingType="circular" buttonType="submit">
                    Add Withdraw Setting
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

export default AddWithdrawSettings;
