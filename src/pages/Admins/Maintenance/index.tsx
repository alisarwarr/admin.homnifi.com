import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { save } from '../../../images/other';
import GlobalCheckbox from '../../../components/Global/GlobalCheckbox';
import GlobalButton from '../../../components/Global/GlobalButton';
import GlobalSwitch from '../../../components/Global/GlobalSwitch';
import { useAdminActions } from '../../../store/admin/adminActions';
import { useSelector } from 'react-redux';
import { selectMaintenanceMode } from '../../../store/admin/adminSlice';
import FormikInput from '../../../components/FormikInput';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';

// Define interface for form values
interface FormValues {
  cronJob: boolean;
  autoLogout: boolean;
  apiCalls: boolean;
  other: boolean;
  maintenance: boolean;
  reason: string;
  note: string;
  startDate: Date;
  endDate: Date;
}

const Maintenance: React.FC = () => {
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);

  const initialValues: FormValues = {
    cronJob: false,
    autoLogout: false,
    apiCalls: false,
    other: false,
    maintenance: false,
    reason: '',
    note: '',
    startDate: new Date(),
    endDate: new Date(),
  };

  const { checkMaintenanceMode, updateMaintenanceMode } = useAdminActions();
  const maintenanceMode = useSelector(selectMaintenanceMode);

  // Form submission handler
  const onSubmit = (values: FormValues) => {
    const res = updateMaintenanceMode(values);
    console.log('🚀 ~ onSubmit ~ res:', res);
    console.log('Form submitted with values:', values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  useEffect(() => {
    checkMaintenanceMode();
    formik.setFieldValue(
      'maintenance',
      maintenanceMode !== null ? true : false
    );
  }, [maintenanceMode]);

  const handleSelect = (ranges: any) => {
    formik.setFieldValue('startDate', ranges.selection.startDate);
    formik.setFieldValue('endDate', ranges.selection.endDate);
    setShowDateRangePicker(false); // Close the date range picker after selection
  };

  const selectionRange = {
    startDate: formik.values.startDate,
    endDate: formik.values.endDate,
    key: 'selection',
  };

  // Array of checkboxes with labels
  const checkboxes = [
    { key: 'cronJob', label: 'Cron Job' },
    { key: 'autoLogout', label: 'Auto Logout' },
    { key: 'apiCalls', label: 'API Calls' },
    { key: 'other', label: 'Other' },
  ];

  return (
    <div>
      <div className="w-full px-2">
        {/* PAGE TITLE */}
        <div className="flex bg-primary items-center text-white">
          <h1 className="flex-1 font-bold text-2xl px-3 py-1">
            Maintenance Mode
          </h1>
        </div>
        <div className="p-5">
          <GlobalSwitch
            label="Maintenance Mode"
            checked={formik.values.maintenance}
            onChange={(checked) => formik.setFieldValue('maintenance', checked)}
          />
        </div>

        {/* Form */}
        {formik.values.maintenance && (
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-3 justify-evenly">
              {checkboxes.map(({ key, label }) => (
                <GlobalCheckbox
                  key={key}
                  className={'font-medium text-3xl'}
                  label={label}
                  checked={formik.values[key]}
                  setChecked={(checked) => formik.setFieldValue(key, checked)}
                />
              ))}

              {/* Reason Input */}
              <FormikInput
                label="Reason"
                name="reason"
                type="text"
                placeholder="Enter reason"
                isError={
                  formik.errors.reason && formik.touched.reason ? true : false
                }
                error={formik.errors.reason}
                touched={formik.touched.reason}
                value={formik.values.reason}
                className="!w-52"
                onChange={formik.handleChange}
              />

              {/* Note Input */}
              <FormikInput
                label="Note"
                name="note"
                type="text"
                placeholder="Enter note"
                error={formik.errors.note}
                isError={
                  formik.errors.note && formik.touched.note ? true : false
                }
                touched={formik.touched.note}
                value={formik.values.note}
                className="!w-52 !m-0"
                onChange={formik.handleChange}
              />

              {/* Date Range Picker */}
              {/* <GlobalButton
                text="Select Date Range"
                classNames="!w-52"
                onClick={() => setShowDateRangePicker(true)}
              />
              {showDateRangePicker && (
                <DateRangePicker
                  ranges={[selectionRange]}
                  onChange={handleSelect}
                />
              )} */}
            </div>
            <div className="flex flex-col gap-10 justify-center py-5">
              <GlobalButton
                outlined
                text="Reset"
                classNames="!w-52"
                onClick={formik.resetForm}
              />
              <GlobalButton
                text="Save"
                classNames="!w-52"
                onClick={formik.handleSubmit}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Maintenance;
