import { useEffect, useState } from 'react';
import { add, edit, refresh } from '../../images/other';
import GlobalTable from '../../components/Table/GlobalTable';
import GlobalDialog from '../../components/Dialog';
import GlobalInput from '../../components/Global/GlobalInput';
import GlobalSelect from '../../components/Global/GlobalSelect';
import GlobalButton from '../../components/Global/GlobalButton';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTokensSettingsAction } from '../../store/tokensSettings/tokensSettingsAction';
import { selectTokensSettings } from '../../store/tokensSettings/tokensSettingsSlice';
import { useSelector } from 'react-redux';

const headCells = [
  { id: 'fromToken', label: 'From Token', show: true },
  { id: 'toToken', label: 'To Token', show: true },
  { id: 'minAmount', label: 'Min Amount', show: true },
  { id: 'minDisplayAmount', label: 'Min Display Amount', show: true },
  { id: 'quickActions', label: 'Actions', show: true },
];

export default function DepositSettings() {
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      getDepositSettings();
      setLoading(false);
    }, 1000);
  };

  const { getDepositSettings, addDespositSettings, getAllTokens, updateDespositSettings } = useTokensSettingsAction();
  const { depositSettings, allTokens } = useSelector(selectTokensSettings);
  useEffect(() => {
    fetchData();
    getAllTokens();
  }, []);

  const [selectedId, setSelectedId] = useState(null);

  const rows = depositSettings
    ? depositSettings?.map((_data: any, index: number) => {
        return {
          fromToken: _data.fromToken?.name,
          toToken: _data.toToken?.name,
          minAmount: _data.minAmount,
          minDisplayAmount: _data.minDisplayAmount,
          quickActions: (
            <div className="flex justify-start">
              <img
                src={edit}
                width={24}
                height={24}
                color="red"
                alt="View Icon"
                className="cursor-pointer"
                onClick={() => {
                  setOpen(true);
                  setSelectedId(depositSettings[index]._id);
                  formik.setFieldValue('fromToken', {
                    label: depositSettings[index].fromToken.name,
                    value: depositSettings[index].fromToken.name,
                    id: depositSettings[index].fromToken._id,
                  });
                  formik.setFieldValue('toToken', {
                    label: depositSettings[index].toToken.name,
                    value: depositSettings[index].toToken.name,
                    id: depositSettings[index].toToken._id,
                  });
                  formik.setFieldValue('minAmount', depositSettings[index].minAmount);
                  formik.setFieldValue('minDisplayAmount', depositSettings[index].minDisplayAmount);
                }}
              />
            </div>
          ),
        };
      })
    : [];

  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => {
    setOpen(false);
    setSelectedId(null);
    setTimeout(() => {
      formik.resetForm();
    }, 1000);
  };

  const formik = useFormik({
    initialValues: {
      fromToken: { label: '', value: '', id: '' },
      toToken: { label: '', value: '', id: '' },
      minAmount: '',
      minDisplayAmount: '',
    },
    validationSchema: Yup.object({
      fromToken: Yup.object({
        label: Yup.string().required(),
        value: Yup.string().required(),
        id: Yup.string().required(),
      }).required('From Token is required'),
      toToken: Yup.object({
        label: Yup.string().required(),
        value: Yup.string().required(),
        id: Yup.string().required(),
      }).required('To Token is required'),
      minAmount: Yup.string().required('Minimum Amount is required'),
      minDisplayAmount: Yup.string()
        .required('Minimum Display Amount is required')
        .test('is-greater-than-minAmount', 'Min Display Amount must be greater than Min Amount', function (value) {
          const { minAmount } = this.parent;
          return Number(value) > Number(minAmount);
        }),
    }),
    onSubmit: async (values) => {
      const data = {
        fromToken: values.fromToken.id,
        toToken: values.toToken.id,
        minAmount: values.minAmount,
        minDisplayAmount: values.minDisplayAmount,
      };
      if (!selectedId) {
        await addDespositSettings(data);
      } else {
        await updateDespositSettings({ id: selectedId, data });
      }
      fetchData();
      onClose();
    },
  });

  return (
    <>
      <GlobalDialog
        open={open}
        size="xs"
        closeButtonShow={false}
        onClose={onClose}
        content={
          <form onSubmit={formik.handleSubmit}>
            <GlobalSelect
              required
              label="To Token"
              name="toToken"
              placeholder="select a To Token"
              options={
                allTokens ? allTokens.map((item: any) => ({ label: item.name, value: item.name, id: item._id })) : []
              }
              value={formik.values.toToken.value}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isError={formik.touched.toToken?.value && !!formik.errors.toToken?.value}
              error={formik.errors.toToken?.value}
              setFieldTouched={formik.setFieldTouched}
              setFieldValue={formik.setFieldValue}
            />

            <GlobalSelect
              required
              label="From Token"
              name="fromToken"
              placeholder="select a From Token"
              options={
                allTokens ? allTokens.map((item: any) => ({ label: item.name, value: item.name, id: item._id })) : []
              }
              value={formik.values.fromToken.value}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isError={formik.touched.fromToken?.value && !!formik.errors.fromToken?.value}
              error={formik.errors.fromToken?.value}
              setFieldTouched={formik.setFieldTouched}
              setFieldValue={formik.setFieldValue}
            />

            <GlobalInput
              name="minAmount"
              label="Min. Amount"
              placeholder="Enter Minimum Amount"
              type="number"
              value={formik.values.minAmount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isError={formik.touched.minAmount && !!formik.errors.minAmount}
              error={formik.errors.minAmount}
            />

            <GlobalInput
              name="minDisplayAmount"
              label="Min. Display Amount"
              placeholder="Enter Minimum Display Amount"
              type="number"
              value={formik.values.minDisplayAmount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isError={formik.touched.minDisplayAmount && !!formik.errors.minDisplayAmount}
              error={formik.errors.minDisplayAmount}
            />

            <div className="flex justify-end mt-3">
              <GlobalButton
                text="Submit"
                type="submit"
                classNames="!rounded-lg font-normal tracking-wide !px-4 !py-3 !w-max text-sm"
              />
            </div>
          </form>
        }
      />

      <div className="w-full px-2">
        {/* PAGE TITLE */}
        <div className="flex bg-primary items-center  text-white">
          <h1 className="flex-1 font-bold text-2xl px-3 py-1">Deposit Settings</h1>

          <div className="flex gap-1 items-center cursor-pointer px-3" onClick={fetchData}>
            <img src={refresh} alt="refresh" width={24} height={24} />
            <span>Refresh</span>
          </div>

          <button className="flex gap-1 text-white items-center cursor-pointer px-3" onClick={onOpen}>
            <img src={add} alt="" width={24} height={24} />
            <span>Add Deposit</span>
          </button>
        </div>

        {/* TABLE */}
        {depositSettings && (
          <GlobalTable
            rows={rows}
            headCells={headCells}
            isLoading={loading}
            paginate={false}
            imageItems={['iconUrl']}
          />
        )}
      </div>
    </>
  );
}
