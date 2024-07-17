import React from 'react';
import { useFormik } from 'formik';
import { save } from '../../../images/other';
import GlobalCheckbox from '../../../components/Global/GlobalCheckbox';
import GlobalButton from '../../../components/Global/GlobalButton';
import GlobalSwitch from '../../../components/Global/GlobalSwitch';

// Define interface for form values
interface FormValues {
  cronJob: boolean;
  autoLogout: boolean;
  apiCalls: boolean;
  other: boolean;
  maintenance: boolean;
}

const Maintenance: React.FC = () => {
  const initialValues: FormValues = {
    cronJob: true,
    autoLogout: false,
    apiCalls: false,
    other: false,
    maintenance: false,
  };

  // Form submission handler
  const onSubmit = (values: FormValues) => {
    // Handle form submission logic here
    console.log('Form submitted with values:', values);
    // Example: perform API call or update state
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  // Formik hook setup

  React.useEffect(() => {}, []);
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
          <h1 className="flex-1 font-bold text-2xl px-3 py-1">Maintenance Mode</h1>

          {/* <div className="flex gap-1 items-center cursor-pointer px-3" onClick={() => formik.handleSubmit()}>
            <img src={save} alt="" width={28} height={28} />
            <span>Save</span>
          </div> */}
        </div>
        <div className="p-5">
          <GlobalSwitch
            label="Maintenance Mode"
            checked={formik.values.maintenance}
            onChange={(checked) => formik.setFieldValue('maintenance', checked)}
          />
        </div>

        {/* Checkboxes */}
        {formik.values.maintenance && (
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-10 justify-evenly p-10 ">
              {checkboxes.map(({ key, label }) => (
                <GlobalCheckbox
                  key={key}
                  className={'font-medium text-3xl'}
                  label={label}
                  checked={formik.values[key]}
                  setChecked={(checked) => formik.setFieldValue(key, checked)}
                />
              ))}
            </div>
            <div className="flex flex-row justify-center gap-20">
              <GlobalButton outlined text="Reset" classNames="!w-96" />
              <GlobalButton text="Save" classNames="!w-96" />
            </div>
          </form>
        )}

        {/* TABLE */}
      </div>
    </div>
  );
};

export default Maintenance;
