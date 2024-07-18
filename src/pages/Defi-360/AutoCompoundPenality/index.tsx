import { useEffect, useState } from 'react';
import { add, refresh } from '../../../images/other';
import GlobalTable from '../../../components/Table/GlobalTable';
import GlobalDialog from '../../../components/Dialog';
import GlobalInput from '../../../components/Global/GlobalInput';
import GlobalButton from '../../../components/Global/GlobalButton';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDefi360Action } from '../../../store/defi-360/defi-360-action';
import { useSelector } from 'react-redux';
import { selectDefi360 } from '../../../store/defi-360/defi-360-slice';


const headCells = [
  { id: 'percentage', label: 'Percentage', show: true },
  { id: 'createdAt', label: 'Date', show: true }
];


export default function AutoCompoundPenality() {
  const [loading, setLoading] = useState(false);


  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      getAutoCompoundPenality();
      setLoading(false);
    }, 1000);
  };


  const { getAutoCompoundPenality, postAutoCompoundPenality } = useDefi360Action();
  const { autoCompoundPenality } = useSelector(selectDefi360);
  useEffect(() => {
      fetchData();
  }, []);


  const rows = autoCompoundPenality ? autoCompoundPenality?.map((_data: any) => {
      return {
          id: _data._id,
          percentage: _data.percentage,
          createdAt: _data.createdAt
      };
  }) : [];


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
      percentage: '',
    },
    validationSchema: Yup.object({
      percentage: Yup.number()
        .required('Percentage is required')
        .min(0, 'Percentage must be at least 0')
        .max(100, 'Percentage must be at most 100'),
    }),
    onSubmit: async (values) => {
      const data = {
        percentage: values.percentage,
      };
      await postAutoCompoundPenality(data);
      fetchData();
      onClose();
    }
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
              name="percentage"
              label="Percentage"
              placeholder="Enter the Percentage"
              type="number"
              required
              value={formik.values.percentage}
              onChange={formik.handleChange}
              isError={formik.errors.percentage && formik.touched.percentage}
              error={formik.errors.percentage}
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
          <h1 className="flex-1 font-bold text-2xl px-3 py-1">Auto Compound Penality</h1>

          <div
            className="flex gap-1 items-center cursor-pointer px-3"
          // onClick={() => fetchData(1)}
          >
            <img src={refresh} alt="refresh" width={24} height={24} />
            <span>Refresh</span>
          </div>

          <button
            className="flex gap-1 text-white items-center cursor-pointer px-3"
            onClick={onOpen}
          >
            <img src={add} alt="" width={24} height={24} />
            <span>New Penality</span>
          </button>
        </div>

        {/* TABLE */}
        {
          autoCompoundPenality && (
            <GlobalTable
              rows={rows}
              headCells={headCells}
              copyItems={['']}
              colorItems={['']}
              imageItems={['']}
              isLoading={loading}
            />
          )
        }
      </div>
    </>
  );
}
