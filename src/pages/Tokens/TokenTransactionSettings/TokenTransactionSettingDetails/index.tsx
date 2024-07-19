import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SaveBar from '../../../../components/SaveBar';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ausd, pusd, usdt, xpl } from '../../../../images/other';

// REDUX
import { errorAlert, successAlert } from '../../../../utils/alerts';
import FormikInput from '../../../../components/FormikInput';
import { TokenTransactionSettingType } from '../../../../store/token/tokenSlice';
import { useTokenActions } from '../../../../store/token/tokenAction';
import { CapitalizeAllLetters, CapitalizeFirstLetter, lowerCaseAllLetters } from '../../../../utils/utils';
import ReactSelect from '../../../../components/ReactSelect';
import { TRANSACTION_PROCESS, TRANSACTION_TYPES, WITHDRAW_FEE_TYPES } from '../../../../constants';
import GlobalSelect from '../../../../components/Global/GlobalSelect';

const validationSchema = Yup.object().shape({
  feeType: Yup.mixed(),
  fee: Yup.number(),
  minAmount: Yup.number().nullable(),
  maxAmount: Yup.number().nullable(),
  trxType: Yup.mixed(),
  processType: Yup.mixed(),
  chargesType: Yup.mixed(),
  charges: Yup.number(),
  name: Yup.string(),
});

const formFields = [
  { key: 'name', label: 'Token Name', type: 'text' },
  { key: 'minAmount', label: 'Min. Transaction Amount', type: 'text' },
  { key: 'maxAmount', label: 'Max. Transaction Amount', type: 'text' },

  { key: 'fee', label: 'Fee', type: 'text' },
  { key: 'charges', label: 'Charges', type: 'text' },
];

export const tokenImages: any = {
  AUSD: ausd,
  PUSD: pusd,
  Tether: usdt,
  XPL: xpl,
};

const TokenTransactionSettingDetails = () => {
  // STATES
  const [saveLoading, setSaveLoading] = useState<boolean>(false);

  const { state }: { state: TokenTransactionSettingType } = useLocation();

  const { updateTokenTransactionSettings, getTokenTransactionSettingList, getTokenTransactionSettingById } =
    useTokenActions();

  const { id } = useParams();

  const navigate = useNavigate();

  const initialValues: TokenTransactionSettingType = {
    feeType: '',
    fee: 0,
    chargesType: '',
    charges: 0,
    minAmount: 0,
    maxAmount: 0,
    trxType: '',
    tokenName: '',
    processType: '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      console.log('🚀 ~ onSubmit: ~ values:', values);
      const _values = {
        ...values,
        feeType: lowerCaseAllLetters(values.feeType.value),
        trxType: lowerCaseAllLetters(values.trxType.value),
        chargesType: lowerCaseAllLetters(values.chargesType.value),
        processType: lowerCaseAllLetters(values.processType.value),
      };
      delete _values.token;
      setSaveLoading(true);

      try {
        const response = id && (await updateTokenTransactionSettings(id, _values));
        if (response.status) {
          await getTokenTransactionSettingList(true);
          successAlert(response?.message);
          navigate(`/tokens/settings/transition`);
        } else {
          errorAlert(response?.message);
        }
      } catch (error) {
        console.error(`Token Transaction Setting ${id ? 'update' : 'add'} error`, error);
      } finally {
        setSaveLoading(false);
      }
    },
  });

  useEffect(() => {
    (async () => {
      if (id) {
        let _state = state;

        if (!_state) {
          // FETCHG FROM API
          _state = await getTokenTransactionSettingById(id);
        }

        // SET VALUES
        if (_state) {
          formik.setValues({
            feeType: {
              label: CapitalizeFirstLetter(_state.trxSettings?.feeType),
              value: CapitalizeAllLetters(_state.trxSettings?.feeType),
            },
            fee: _state.trxSettings?.fee,

            minAmount: _state.trxSettings?.minAmount,
            maxAmount: _state.trxSettings?.maxAmount,
            charges: _state.trxSettings?.charges,
            chargesType: {
              label: CapitalizeFirstLetter(_state.trxSettings?.chargesType),
              value: CapitalizeAllLetters(_state.trxSettings?.chargesType),
            },
            processType: {
              label: CapitalizeFirstLetter(_state.trxSettings?.processType),
              value: CapitalizeAllLetters(_state.trxSettings?.processType),
            },

            trxType: {
              label: CapitalizeFirstLetter(_state.trxSettings?.trxType),
              value: CapitalizeAllLetters(_state.trxSettings?.trxType),
            },
            name: _state.name,
          });
        }
      }
    })();
  }, []);

  return (
    <div className="w-full px-6 py-2 sm:py-8 mb-20 lg:px-8 text-white max-w-[1700px] mx-auto bg-white">
      <div className="mx-auto text-start flex gap-4 items-center text-primary">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl ">{`${
          id ? 'Update' : 'Add'
        } Token Setting (${CapitalizeFirstLetter(state?.trxSettings?.trxType ?? '')})`}</h2>
        <span className="flex items-center gap-1 text-2xl">
          {formik.values.name === 'Tether' ? 'USDT' : formik.values.name}
        </span>
      </div>

      <form onSubmit={formik.handleSubmit} className="">
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 mt-12">
          {formFields.map((field) => {
            return state?.transactionType === 'SWAP' && field.key === 'fee' ? (
              <></>
            ) : (
              <div key={field.key}>
                <FormikInput
                  label={field.label}
                  name={field.key}
                  type={field.type}
                  placeholder={`Enter ${field.label}`}
                  error={formik.errors[field.key]}
                  value={formik.values[field.key]}
                  onChange={(e: any) => formik.setFieldValue(field.key, e.target.value)}
                  disabled={field.key === 'name' || field.key === 'symbol'}
                  touched={formik.touched[field.key]}
                  shrink={true}
                />
              </div>
            );
          })}

          {state?.transactionType !== 'SWAP' && (
            <GlobalSelect
              required
              label="Fee Type"
              name="feeType"
              options={[
                { label: 'Fixed', value: WITHDRAW_FEE_TYPES.FIXED },
                { label: 'Percentage', value: WITHDRAW_FEE_TYPES.PERCENTAGE },
              ]}
              setFieldTouched={formik.setFieldTouched}
              setFieldValue={formik.setFieldValue}
              isError={formik.touched.feeType && !!formik.errors.feeType}
              value={formik.values.feeType.value}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          )}
          <GlobalSelect
            name="trxType"
            label="Transaction Type"
            required
            placeholder="Select Transaction Type"
            options={[
              { label: 'Deposit', value: TRANSACTION_TYPES.DEPOSIT },
              { label: 'Withdraw', value: TRANSACTION_TYPES.WITHDRAW },
              { label: 'Transfer', value: TRANSACTION_TYPES.TRANSFER },
              { label: 'Swap', value: TRANSACTION_TYPES.SWAP },
            ]}
            setFieldTouched={formik.setFieldTouched}
            setFieldValue={formik.setFieldValue}
            isError={formik.touched.trxType && !!formik.errors.trxType}
            value={formik.values.trxType.value}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <GlobalSelect
            label="Charges Fees"
            name="chargesType"
            required
            options={[
              { label: 'Fixed', value: WITHDRAW_FEE_TYPES.FIXED },
              { label: 'Percentage', value: WITHDRAW_FEE_TYPES.PERCENTAGE },
            ]}
            setFieldTouched={formik.setFieldTouched}
            setFieldValue={formik.setFieldValue}
            isError={formik.touched.chargesType && !!formik.errors.chargesType}
            value={formik.values.chargesType.value}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <GlobalSelect
            required
            label="Trx Process"
            name="processType"
            options={[
              { label: 'Auto', value: TRANSACTION_PROCESS.AUTO },
              { label: 'Munual', value: TRANSACTION_PROCESS.MANUAL },
            ]}
            setFieldTouched={formik.setFieldTouched}
            setFieldValue={formik.setFieldValue}
            isError={formik.touched.processType && !!formik.errors.processType}
            value={formik.values.processType.value}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
      </form>

      <div className="mt-3">
        <SaveBar
          btnText={'Submit'}
          onSubmit={formik.handleSubmit}
          loading={saveLoading}
          disabled={saveLoading}
          onCancel={() => navigate(`/tokens/settings/${state?.transactionType?.toLowerCase()}`)}
        />
      </div>
    </div>
  );
};

export default TokenTransactionSettingDetails;
