import * as Yup from 'yup';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../../../components/Button';
import { successAlert } from '../../../../utils/alerts';
import GlobalDialog from '../../../../components/Dialog';
import { selectToken } from '../../../../store/token/tokenSlice';
import GlobalInput from '../../../../components/Global/GlobalInput';
import GlobalSelect from '../../../../components/Global/GlobalSelect';
import { useTokenActions } from '../../../../store/token/tokenAction';
import { ReactComponent as CrossIcon } from '../../../../SVGIcons/cancelIcon.svg';
import useLoading from '../../../../utils/hooks/useLoading';

interface Props {
  open: boolean;
  onClose: () => void;
  selectedSetting?: any;
}

function AddWithdrawSettings({ open, onClose, selectedSetting }: Props) {
  const { startLoading, stopLoading, isLoading } = useLoading();
  const { getTokensList, createWithdrawSetting, updateWithdrawSetting } =
    useTokenActions();

  const { tokensList } = useSelector(selectToken);
  const [isSubmit, setIsSubmit] = React.useState(false);
  const initialValues = {
    type: '',
    withdrawFrom: '',
    withdrawTo: '',
    minAmount: '',
    minDisplayAmount: '',
    minWithdrawableAmount: '',
    withdrawRate: '',
    feeType: '',
    commissionRate: '',
    commissionType: '',
  };

  const validationSchema = Yup.object().shape({
    type: Yup.string().required('Type is required'),
    feeType: Yup.string().required('Fee type is required'),
    minAmount: Yup.number()
      .required('Min amount is required')
      .test(
        'is-less',
        'Min amount must be less than Min display amount',
        function (value) {
          const { minDisplayAmount } = this.parent;
          return value < minDisplayAmount;
        }
      ),
    minDisplayAmount: Yup.number()
      .required('Min display amount is required')
      .test(
        'is-greater',
        'Min display amount must be greater than Min amount',
        function (value) {
          const { minAmount } = this.parent;
          return value > minAmount;
        }
      ),
    withdrawRate: Yup.string().required('WithdrawRate is required'),
    minWithdrawableAmount: Yup.number().required(
      'Min withdrawable amount is required'
    ),
    withdrawTo: Yup.string().required('Withdraw To name is required'),
    commissionRate: Yup.string().required('Commission value is required'),
    commissionType: Yup.string().required('Commission type is required'),
    withdrawFrom: Yup.string().required('Withdraw From is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmit(true);
      startLoading();
      const body = {
        type: values.type,
        fromToken: values.withdrawFrom,
        toToken: values.withdrawTo,
        minAmount: values.minAmount,
        minDisplayAmount: values.minDisplayAmount,
        minWithdrawableAmount: values.minWithdrawableAmount,
        fee: values.withdrawRate,
        feeType: values.feeType,
        commission: values.commissionRate,
        commissionType: values.commissionType,
      };

      let response: any;
      if (selectedSetting) {
        response = await updateWithdrawSetting(selectedSetting._id, body);
      } else {
        response = await createWithdrawSetting(body);
      }

      if (response.status) {
        successAlert(response.message);
        return onResetStates();
      }
      stopLoading();

      successAlert(
        response.message
          ? response.message
          : response.error
            ? response.error
            : 'Something went worng'
      );
    },
  });

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    resetForm,
    setValues,
  } = formik;

  useEffect(() => {
    getTokensList();
  }, []);

  // edit withdraw setting state set here
  useEffect(() => {
    if (selectedSetting) {
      setValues({
        type: selectedSetting.type ?? '',
        withdrawFrom: selectedSetting.fromToken._id ?? '',
        withdrawTo: selectedSetting.toToken._id ?? '',
        minAmount: selectedSetting.minAmount ?? 0,
        minDisplayAmount: selectedSetting.minDisplayAmount ?? 0,
        minWithdrawableAmount: selectedSetting.minWithdrawableAmount ?? 0,
        withdrawRate: selectedSetting.fee ?? '',
        feeType: selectedSetting.feeType ?? '',
        commissionRate: selectedSetting.commission ?? 0,
        commissionType: selectedSetting.commissionType ?? '',
      });
    }
  }, [selectedSetting]);

  //reset state from after form submission
  const onResetStates = () => {
    setIsSubmit(false);
    onClose();
    stopLoading();
    resetForm();
  };

  return (
    <div>
      <GlobalDialog
        open={open}
        size="md"
        closeButtonShow={false}
        onClose={onResetStates}
        content={
          <form
            onSubmit={(e) => {
              setIsSubmit(true);
              handleSubmit(e);
            }}
          >
            <div className="flex justify-between items-center py-2">
              <div className="text-md font-medium  md:mx-6">
                Add Withdraw Settings
              </div>
              <div
                className="cursor-pointer -mr-2"
                onClick={() => {
                  onResetStates();
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
                      { label: 'internal', value: 'internal' },
                      { label: 'external', value: 'external' },
                    ]}
                    setFieldTouched={() => formik.setFieldTouched('type', true)}
                    error={errors.type}
                    isError={
                      isSubmit && errors.type && touched.type ? true : false
                    }
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
                    options={
                      tokensList?.length
                        ? tokensList?.map((tkn) => {
                            return {
                              label: tkn.name,
                              value: tkn._id,
                            };
                          })
                        : []
                    }
                    setFieldTouched={() =>
                      formik.setFieldTouched('withdrawFrom', true)
                    }
                    error={errors.withdrawFrom}
                    isError={
                      isSubmit && errors.withdrawFrom && touched.withdrawFrom
                        ? true
                        : false
                    }
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
                    options={
                      tokensList?.length
                        ? tokensList?.map((tkn) => {
                            return {
                              label: tkn.name,
                              value: tkn._id,
                            };
                          })
                        : []
                    }
                    setFieldTouched={() =>
                      formik.setFieldTouched('withdrawTo', true)
                    }
                    error={errors.withdrawTo}
                    isError={
                      isSubmit && errors.withdrawTo && touched.withdrawTo
                        ? true
                        : false
                    }
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
                    name="minDisplayAmount"
                    label="Min Display Amount"
                    placeholder="Enter min display amount"
                    type="number"
                    value={values.minDisplayAmount}
                    onChange={handleChange}
                    isError={isSubmit && errors.minDisplayAmount}
                    error={errors.minDisplayAmount}
                  />
                </div>
              </div>

              <div className="flex flex-col md:items-baseline  md:flex-row w-full">
                <div className="w-full mx-2">
                  <GlobalInput
                    toolTip="Amount exceeding this value will request for admin approval"
                    required
                    name="minWithdrawableAmount"
                    label="Max Amount For Automatic Withdraw "
                    placeholder="Enter min with drawableAmount"
                    type="number"
                    value={values.minWithdrawableAmount}
                    onChange={handleChange}
                    isError={isSubmit && errors.minWithdrawableAmount}
                    error={errors.minWithdrawableAmount}
                  />
                </div>
              </div>
              <div className="w-full text-primary mx-2 my-1">
                Withdrawal Fees (MLYK)
              </div>

              <div className="flex flex-col  md:flex-row md:items-baseline  w-full">
                <div className="w-full md:w-1/2 mx-2">
                  <GlobalInput
                    name="withdrawRate"
                    label="Value"
                    placeholder="Enter fee value"
                    type="number"
                    required
                    value={values.withdrawRate}
                    onChange={handleChange}
                    isError={
                      isSubmit && errors.withdrawRate && touched.withdrawRate
                        ? true
                        : false
                    }
                    error={errors.withdrawRate}
                  />
                </div>

                <div className="w-full md:w-1/2 mx-2">
                  <GlobalSelect
                    required
                    label="Fee Type"
                    labelOptionClass={'text-left'}
                    name={'feeType'}
                    placeholder={'Selecte Fee Type'}
                    options={[
                      { label: 'fixed', value: 'fixed' },
                      { label: 'percentage', value: 'percentage' },
                    ]}
                    setFieldTouched={() =>
                      formik.setFieldTouched('feeType', true)
                    }
                    error={errors.feeType}
                    isError={
                      isSubmit && errors.feeType && touched.feeType
                        ? true
                        : false
                    }
                    value={values.feeType}
                    onChange={(e: any) => {
                      formik.setFieldValue('feeType', e);
                    }}
                    onBlur={formik.handleBlur}
                    inputClass="mb-2 w-full"
                  />
                </div>
              </div>
              <div className="w-full text-primary mx-2 my-1">
                Withdrawal Commission
              </div>
              <div className="flex flex-col  md:flex-row md:items-baseline  w-full">
                <div className="w-full md:w-1/2 mx-2">
                  <GlobalInput
                    name="commissionRate"
                    label="Value"
                    placeholder="Enter commisson value"
                    type="number"
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
                    placeholder={'Selecte commission Type'}
                    options={[
                      { label: 'fixed', value: 'fixed' },
                      { label: 'percentage', value: 'percentage' },
                    ]}
                    setFieldTouched={() =>
                      formik.setFieldTouched('commissionType', true)
                    }
                    error={errors.commissionType}
                    isError={
                      isSubmit &&
                      errors.commissionType &&
                      touched.commissionType
                        ? true
                        : false
                    }
                    value={values.commissionType}
                    onChange={(e: any) => {
                      formik.setFieldValue('commissionType', e);
                    }}
                    onBlur={formik.handleBlur}
                    inputClass="mb-2 w-full"
                  />
                </div>
              </div>
              <div className="mx-4 md:mx-2 my-2">
                <div className="flex flex-col  md:flex-row w-full">
                  <Button
                    loading={isLoading}
                    className="bg-primary rounded-full my-4"
                    loadingType="circular"
                    buttonType="submit"
                  >
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
