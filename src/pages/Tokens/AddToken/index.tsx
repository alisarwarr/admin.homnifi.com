import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '../../../components/Button';
import GlobalInput from '../../../components/Global/GlobalInput';
import GlobalSelect from '../../../components/Global/GlobalSelect';
import GlobalDialog from '../../../components/Dialog';
import { ReactComponent as CrossIcon } from '../../../SVGIcons/cancelIcon.svg';
import { useTokenActions } from '../../../store/token/tokenAction';
import useLoading from '../../../utils/hooks/useLoading';
import { useTokensSettingsAction } from '../../../store/tokensSettings/tokensSettingsAction';
import { selectTokensSettings } from '../../../store/tokensSettings/tokensSettingsSlice';
import { useSelector } from 'react-redux';
import { errorNotify, successAlert } from '../../../utils/alerts';

interface Props {
  open: boolean;
  onClose: () => void;
  editToken: any;
}

const TYPES_DATA = [
  { label: 'ON CHAIN', value: 'on-chain' },
  { label: 'OFF CHAIN ', value: 'off-chain' },
];
function AddToken({ open, onClose, editToken }: Props) {
  const { onUpdateToken, createNewToken } = useTokenActions();
  const { networkSettings } = useSelector(selectTokensSettings);
  const { getNetworkSettings, addNetworkSettings } = useTokensSettingsAction();

  const [isSubmit, setIsSubmit] = useState(false);
  const { isLoading, startLoading, stopLoading } = useLoading(false);

  const initialValues = {
    name: '',
    symbol: '',
    type: '',
    withdrawType: '',
    color: '',
    networks: [],
    iconUrl: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    symbol: Yup.string().required('Display name is required'),
    type: Yup.string().required('type is required'),
    color: Yup.string().required('Color is required'),
    withdrawType: Yup.string().required('Withdraw type is required'),
    iconUrl: Yup.string().required('Icon url required'),
    networks: Yup.array()
      .of(Yup.string())
      .min(1, 'At least one network must be selected')
      .required('Networks is required'),
  });

  // formik initialization and form submission here
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      startLoading();
      let response: any;
      if (editToken) {
        response = await onUpdateToken(editToken._id, values);
      } else {
        response = await createNewToken(values);
      }
      if (response.status) {
        successAlert(response.message);
        stopLoading();
        return onResetStates();
      } else {
        stopLoading();
        return errorNotify(response.message);
      }
    },
  });

  //reset state from after form submission
  const onResetStates = () => {
    onClose();
    resetForm();
  };

  const { handleChange, handleSubmit, values, errors, touched, resetForm, setFieldValue, setValues } = formik;

  // get token api call
  useEffect(() => {
    if (!networkSettings || networkSettings?.length === 0) {
      getNetworkSettings({});
    }
  }, []);

  //remove item item from dropdown
  const removeItemHanlder = (id: string) => {
    if (values?.networks?.includes(id)) {
      return setFieldValue(
        'networks',
        values.networks.filter((dt: string) => dt !== id)
      );
    }
  };

  // set form states of editable tokens
  useEffect(() => {
    if (editToken) {
      const type: any = TYPES_DATA.find((dt: any) => dt.value === editToken.type);
      const withdrawType: any = TYPES_DATA.find((dt: any) => dt.value === editToken.withdrawType);
      setValues({
        name: editToken.name ?? '',
        symbol: editToken.symbol ?? '',
        type: type?.value ?? '',
        withdrawType: withdrawType?.value ?? '',
        color: editToken.color ?? '',
        // networks: editToken.networks,
        networks: editToken.networkList?.map((dt) => dt._id),
        iconUrl: editToken?.iconUrl ?? '',
      });
    }
  }, [editToken]);

  return (
    <div>
      <GlobalDialog
        open={open}
        size="md"
        closeButtonShow={false}
        onClose={onResetStates}
        content={
          <>
            <div className="flex justify-between items-center py-2">
              <div className=" text-md font-medium">Add Token</div>
              <div className="cursor-pointer" onClick={onResetStates}>
                <CrossIcon />
              </div>
            </div>
            <div className="mx-4 md:mx-2 mt-4">
              <div className="flex flex-col  md:flex-row w-full">
                <div className="w-full md:w-1/2 mx-2">
                  <GlobalInput
                    name="name"
                    label="Token Name"
                    placeholder="Enter your name"
                    type="text"
                    required
                    value={values.name}
                    onChange={handleChange}
                    isError={isSubmit ? errors.name : false}
                    error={errors.name}
                  />
                </div>

                <div className="w-full md:w-1/2 mx-2">
                  <GlobalInput
                    name="symbol"
                    label="Symbol"
                    placeholder="Enter your symbol"
                    type="text"
                    required
                    className="w-1/2"
                    value={values.symbol}
                    onChange={handleChange}
                    isError={isSubmit ? errors.symbol : false}
                    error={errors.symbol}
                  />
                </div>
              </div>

              <div className="flex flex-col md:items-baseline  md:flex-row w-full">
                <div className="w-full md:w-1/2 mx-2">
                  <GlobalSelect
                    required
                    label="Withdraw Type"
                    labelOptionClass={'text-left'}
                    name={'withdrawType'}
                    placeholder={'Selecte ..'}
                    options={[
                      { label: 'ON CHAIN', value: 'on-chain' },
                      { label: 'OFF CHAIN ', value: 'off-chain' },
                    ]}
                    setFieldTouched={() => formik.setFieldTouched('withdrawType', true)}
                    error={errors.withdrawType}
                    isError={touched.withdrawType && errors.withdrawType && isSubmit ? true : false}
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
                  <GlobalSelect
                    required
                    label="Type"
                    labelOptionClass={'text-left'}
                    name={'type'}
                    placeholder={'Selecte ..'}
                    options={[
                      { label: 'ON CHAIN', value: 'on-chain' },
                      { label: 'OFF CHAIN ', value: 'off-chain' },
                    ]}
                    isError={isSubmit && errors.type && touched.type ? true : false}
                    onChange={(e) => {
                      formik.setFieldValue('type', e);
                    }}
                    inputClass="mb-2 w-full"
                    value={values.type}
                    error={errors.type}
                  />
                </div>
              </div>

              <div className="flex flex-col md:items-baseline  md:flex-row w-full">
                <div className="w-full mx-2 pt-2">
                  <GlobalSelect
                    label="Networks"
                    labelOptionClass={'text-left'}
                    name={'networks'}
                    placeholder={'Selecte ..'}
                    options={networkSettings?.map((dt: any) => {
                      return { label: dt.name, value: dt._id };
                    })}
                    isMulti={true}
                    // isError={false}
                    removeItemHanlder={removeItemHanlder}
                    onChange={(e) => {
                      setFieldValue('networks', [...values.networks, e]);
                    }}
                    inputClass="mb-2 w-full"
                    value={values.networks}
                    isError={isSubmit && errors.networks && touched.networks ? true : false}
                    error={errors.networks}
                  />
                </div>
              </div>

              <div className="flex flex-col  md:flex-row md:items-baseline  w-full">
                <div className="w-full md:w-1/2 mx-2">
                  <GlobalInput
                    name="color"
                    label="color"
                    placeholder="Enter color"
                    type="text"
                    required
                    value={values.color}
                    onChange={handleChange}
                    isError={isSubmit ? errors.color : false}
                    error={errors.color}
                  />
                </div>

                <div className="w-full md:w-1/2 mx-2">
                  <GlobalInput
                    name="iconUrl"
                    label="Icon URL"
                    placeholder="Enter icon url"
                    type="text"
                    required
                    value={values.iconUrl}
                    onChange={handleChange}
                    isError={isSubmit ? errors.iconUrl : false}
                    error={errors.iconUrl}
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
                    onClick={() => {
                      setIsSubmit(true);
                      handleSubmit();
                    }}
                  >
                    Add Token
                  </Button>
                </div>
              </div>
            </div>
          </>
        }
      />
    </div>
  );
}

export default AddToken;
