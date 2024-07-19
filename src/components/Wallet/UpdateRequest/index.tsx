import { useState } from 'react';
import { useFormik } from 'formik';

// REDUX
import { errorAlert, successAlert } from '../../../utils/alerts';
import FormikInput from '../../FormikInput';
import { WALLET_ACTIONS } from '../../../constants';
import Button from '../../Button';
import { useWalletActions } from '../../../store/wallet/walletActions';

type Props = {
  action: {
    type: string;
    id: string;
  };
  onClose: any;
  requestFor: string;
};

const UpdateRequest = ({ action, onClose, requestFor }: Props) => {
  // STATES
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const {
    updateWithdrawRequest,
    getWithdrawRequests,
    updateMigrationRequest,
    getMigrationRequests,
  } = useWalletActions();

  const initialValues: {
    denialReason?: string;
    hash?: string;
    [key: string]: any;
  } = {
    denialReason: '',
    hash: '',
  };

  const formik = useFormik({
    initialValues: initialValues,

    onSubmit: async (values) => {
      console.log('🚀 ~ onSubmit: ~ values:', action);
      setSaveLoading(true);

      let _values: any = {
        id: action.id,
      };

      if (action.type === WALLET_ACTIONS.ACCEPT) {
        if (!values.hash && requestFor === 'WITHDRAW') {
          formik.setFieldError('hash', 'Transaction Hash Url Required.');
          setSaveLoading(false);
          return;
        }

        if (requestFor === 'WITHDRAW') {
          _values = {
            ..._values,
            hash: values.hash,
            type: 'accept',
          };
        }
      } else {
        if (!values.denialReason) {
          formik.setFieldError('denialReason', 'Rejection Reason is Required.');
          setSaveLoading(false);
          return;
        }

        _values = {
          ..._values,
          denialReason: values.reason,
          type: 'reject',
        };
      }

      try {
        const response =
          requestFor === 'WITHDRAW' && (await updateWithdrawRequest(_values));
        if (response?.data?.status) {
          successAlert(response?.data?.message);
          requestFor === 'WITHDRAW' && getWithdrawRequests(true);
          onClose();
        } else {
          errorAlert(response?.data?.message);
        }
      } catch (error) {
        console.error(
          `Update ${requestFor === 'WITHDRAW' ? 'Withdraw' : 'Migration'} Request Error`,
          error
        );
      } finally {
        setSaveLoading(false);
      }
    },
  });

  return (
    <div className="w-full text-white max-w-[1700px] mx-auto">
      <form onSubmit={formik.handleSubmit} className="">
        <div className="grid grid-cols-1">
          <>
            {action?.type === WALLET_ACTIONS.REJECT && (
              <div>
                <FormikInput
                  label={'Reason'}
                  name={'denialReason'}
                  type={'text'}
                  placeholder={`Enter Reason`}
                  error={formik.errors.denialReason}
                  value={formik.values.denialReason}
                  onChange={(e: any) =>
                    formik.setFieldValue('denialReason', e.target.value)
                  }
                />
              </div>
            )}

            {action?.type === WALLET_ACTIONS.ACCEPT &&
              requestFor === 'WITHDRAW' && (
                <div>
                  <FormikInput
                    label={'Transaction Hash'}
                    name={'hash'}
                    type={'text'}
                    placeholder={`Enter Transaction Hash `}
                    error={formik.errors.hash}
                    value={formik.values.hash}
                    onChange={(e: any) =>
                      formik.setFieldValue('hash', e.target.value)
                    }
                  />
                </div>
              )}
          </>
        </div>
      </form>

      <div className="mt-3 flex justify-end gap-x-2">
        <Button
          className={`border text-xs lg:text-sm !px-4 !py-1 lg:!py-2 lg:!px-8`}
          loading={saveLoading}
          onClick={() => formik.submitForm()}
          loadingType="circular"
        >
          {action.type === WALLET_ACTIONS.ACCEPT ? 'Accept' : 'Reject'}
        </Button>

        <Button
          className={`border !text-primary !border-primary text-xs lg:text-sm !px-4 !py-1 lg:!py-2 lg:!px-8 bg-white hover:!bg-white/40 transition-all duration-200 ease-in-out`}
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default UpdateRequest;
