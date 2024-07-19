import { useEffect, useState } from 'react';
import { add, edit, refresh } from '../../images/other';
import GlobalTable from '../../components/Table/GlobalTable';
import GlobalDialog from '../../components/Dialog';
import GlobalInput from '../../components/Global/GlobalInput';
import GlobalButton from '../../components/Global/GlobalButton';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { usePlatformAction } from '../../store/platform/platformAction';
import { selectPlatformSlice } from '../../store/platform/platformSlice';
import { useSelector } from 'react-redux';
import GlobalSelect from '../../components/Global/GlobalSelect';

const headCells = [
  { id: 'title', label: 'Title', show: true },
  { id: 'imageUrl', label: 'Image Url', show: true },
  { id: 'description', label: 'Description', show: true },
  { id: 'createdAt', label: 'Date', show: true },
  { id: 'status', label: 'Status', show: true },
  { id: 'quickActions', label: 'Actions', show: true },
];

export default function NetworkSettings() {
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      getPlatformAd();
      setLoading(false);
    }, 1000);
  };

  const { getPlatformAd, addPlatformAd, editPlatformAd } = usePlatformAction();
  const { ads } = useSelector(selectPlatformSlice);
  useEffect(() => {
    fetchData();
  }, []);

  const [selectedId, setSelectedId] = useState(null);

  const rows = ads
    ? ads.map((_data: any, index: number) => ({
        title: _data.title,
        imageUrl: _data.imageUrl,
        description: _data.description,
        createdAt: _data.createdAt,
        status: _data.status,
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
                setSelectedId(ads[index]._id);
                formik.setFieldValue('name', ads[index].title);
                formik.setFieldValue('imageUrl', ads[index].imageUrl);
                formik.setFieldValue('description', ads[index].description);
                formik.setFieldValue('status', { label: ads[index].status, value: ads[index].status });
              }}
            />
          </div>
        ),
      }))
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
      name: '',
      imageUrl: '',
      description: '',
      status: { label: '', value: '' },
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      imageUrl: Yup.string().required('Image Url is required'),
      description: Yup.string().required('Description Url is required'),
      status: Yup.mixed().required('Status is required'),
    }),
    onSubmit: async (values) => {
      const data = {
        title: values.name,
        imageUrl: values.imageUrl,
        description: values.description,
        status: values.status.value,
      };
      if (!selectedId) {
        await addPlatformAd(data);
      } else {
        await editPlatformAd({ id: selectedId, data });
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
              name="imageUrl"
              label="Image Url"
              placeholder="Enter Image Url"
              type="text"
              required
              value={formik.values.imageUrl}
              onChange={formik.handleChange}
              isError={formik.errors.imageUrl && formik.touched.imageUrl}
              error={formik.errors.imageUrl}
            />

            <GlobalInput
              name="description"
              label="Description"
              placeholder="Enter Description"
              type="text"
              value={formik.values.description}
              onChange={formik.handleChange}
              isError={formik.errors.description && formik.touched.description}
              error={formik.errors.description}
            />

            <GlobalSelect
              required
              label="Status"
              name="status"
              placeholder="select a Status"
              options={[
                { label: 'active', value: 'active' },
                { label: 'inactive', value: 'inactive' },
              ]}
              value={formik.values.status.value}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isError={formik.touched.status && !!formik.errors.status}
              error={formik.errors.status}
              setFieldTouched={formik.setFieldTouched}
              setFieldValue={formik.setFieldValue}
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
        <div className="flex bg-primary items-center text-white">
          <h1 className="flex-1 font-bold text-2xl px-3 py-1">Marketing</h1>

          <div className="flex gap-1 items-center cursor-pointer px-3" onClick={fetchData}>
            <img src={refresh} alt="refresh" width={24} height={24} />
            <span>Refresh</span>
          </div>

          <button className="flex gap-1 text-white items-center cursor-pointer px-3" onClick={onOpen}>
            <img src={add} alt="add" width={24} height={24} />
            <span>Add Marketing</span>
          </button>
        </div>

        {ads && (
          <GlobalTable
            rows={rows}
            headCells={headCells}
            isLoading={loading}
            paginate={false}
            imageItems={['imageUrl']}
          />
        )}
      </div>
    </>
  );
}
