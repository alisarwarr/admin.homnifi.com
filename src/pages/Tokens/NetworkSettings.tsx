import { useEffect, useState } from 'react';
import { add, refresh } from '../../images/other';
import GlobalTable from '../../components/Table/GlobalTable';
import GlobalDialog from '../../components/Dialog';
import GlobalInput from '../../components/Global/GlobalInput';
import GlobalButton from '../../components/Global/GlobalButton';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTokensSettingsAction } from '../../store/tokensSettings/tokensSettingsAction';
import { selectTokensSettings } from '../../store/tokensSettings/tokensSettingsSlice';
import { useSelector } from 'react-redux';

const headCells = [
  { id: 'name', label: 'Name', show: true },
  { id: 'blockchainCode', label: 'Blockchain Code', show: true },
];

export default function NetworkSettings() {
  const [loading, setLoading] = useState(false);

  const fetchData = (page: number) => {
    setLoading(true);
    setTimeout(() => {
      getNetworkSettings({ page, limit: 10 });
      setLoading(false);
    }, 1000);
  };

  const { getNetworkSettings, addNetworkSettings } = useTokensSettingsAction();
  const { networkSettings } = useSelector(selectTokensSettings);
  useEffect(() => {
    fetchData(1);
  }, []);

  const rows = networkSettings
    ? networkSettings?.map((_data: any) => {
        return {
          name: _data.name,
          blockchainCode: _data.code,
        };
      })
    : [];

  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => {
    setOpen(false);
    setTimeout(() => {
      formik.resetForm();
    }, 1000);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      blockchainCode: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      blockchainCode: Yup.string().required('Blockchain Code is required'),
    }),
    onSubmit: async (values) => {
      const data = {
        name: values.name,
        code: values.blockchainCode,
      };
      await addNetworkSettings(data);
      fetchData(1);
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
            <GlobalInput
              name="name"
              label="Name"
              placeholder="Enter your Name"
              type="text"
              required
              value={formik.values.name}
              onChange={formik.handleChange}
              isError={formik.errors.name && formik.touched.name}
              error={formik.errors.name}
            />

            <GlobalInput
              name="blockchainCode"
              label="Blockchain Code"
              placeholder="Enter Blockchain Code"
              type="text"
              required
              value={formik.values.blockchainCode}
              onChange={formik.handleChange}
              isError={
                formik.errors.blockchainCode && formik.touched.blockchainCode
              }
              error={formik.errors.blockchainCode}
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
          <h1 className="flex-1 font-bold text-2xl px-3 py-1">
            Network Settings
          </h1>

          <div
            className="flex gap-1 items-center cursor-pointer px-3"
            onClick={() => fetchData(1)}
          >
            <img src={refresh} alt="refresh" width={24} height={24} />
            <span>Refresh</span>
          </div>

          <button
            className="flex gap-1 text-white items-center cursor-pointer px-3"
            onClick={onOpen}
          >
            <img src={add} alt="" width={24} height={24} />
            <span>Add Network</span>
          </button>
        </div>

        {/* TABLE */}
        {networkSettings && (
          <GlobalTable
            rows={rows}
            headCells={headCells}
            copyItems={['']}
            colorItems={['']}
            imageItems={['']}
            isLoading={loading}
            totalPages={networkSettings?.totalPages}
            handlePageChange={(page: number) => {
              fetchData(page);
            }}
          />
        )}
      </div>
    </>
  );
}
