import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { save } from '../../../images/other';
import GlobalCheckbox from '../../../components/Global/GlobalCheckbox';
import GlobalButton from '../../../components/Global/GlobalButton';
import GlobalSwitch from '../../../components/Global/GlobalSwitch';
import { useAdminActions } from '../../../store/admin/adminActions';
import { useSelector } from 'react-redux';
import { selectMaintenanceMode } from '../../../store/admin/adminSlice';
import FormikInput from '../../../components/FormikInput';
import { fork } from 'child_process';

// Define interface for form values
interface FormValues {
  cronJob: boolean;
  autoLogout: boolean;
  apiCalls: boolean;
  other: boolean;
  maintenance: boolean;
  reason: string;
  note: string;
}

const Maintenance: React.FC = () => {
  const initialValues: FormValues = {
    cronJob: false,
    autoLogout: false,
    apiCalls: false,
    other: false,
    maintenance: false,
    reason: '',
    note: '',
  };

  const { checkMaintenanceMode, updateMaintenanceMode } = useAdminActions();
  const maintenanceMode = useSelector(selectMaintenanceMode);
  console.log('🚀 ~ maintenanceMode:', maintenanceMode);

  // Form submission handler
  const onSubmit = (values: FormValues) => {
    // Handle form submission logic here
    const res = updateMaintenanceMode(values);
    console.log('🚀 ~ onSubmit ~ res:', res);
    console.log('Form submitted with values:', values);
    // Example: perform API call or update state
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
  }, []);

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
            </div>
            <div className="flex flex-col gap-10 justify-center py-5  ">
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
