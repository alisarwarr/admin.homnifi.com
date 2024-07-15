import React, { useEffect, useRef, useState } from 'react';
import { ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import FormikInput from '../../components/FormikInput';
import Button from '../../components/Button';
import { useSelector } from 'react-redux';
import { selectAdminData } from '../../store/admin/adminSlice';
import { useAdminActions } from '../../store/admin/adminActions';
import { errorAlert, successAlert } from '../../utils/alerts';
import { selectUser } from '../../store/user/userSlice';

export default function Profile(): JSX.Element {
  const { getAdminData, updateAdminData } = useAdminActions();
  const admin = useSelector(selectAdminData);

  const user = useSelector(selectUser);


  const formikRef = useRef<any>(null);

  const initialValues = {
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  };

  useEffect(() => {
    getAdminData(user?.id);
  }, []);

  useEffect(() => {
    if (formikRef.current && admin) {
      formikRef.current.setValues({
        email: admin?.email || '',
        username: admin?.username || '',
        firstName: admin?.firstName || '',
        lastName: admin?.lastName || '',
        phoneNumber: admin?.phoneNumber || '',
      });
    }
  }, [admin]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    username: Yup.string().required('Username is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
  });

  const onSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      const response = await updateAdminData(values);
      if (response.status) {
        successAlert('Successfully updated profile!');
      } else {
        errorAlert(response.message);
      }
    } catch (error) {
      console.error(error);
      errorAlert('An error occurred while updating the profile.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    initialTouched: {
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
    },
    innerRef: formikRef,
  });

  const { handleChange, handleSubmit: handleFormikSubmit, values, errors, touched } = formik;

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  return (
    <div className="w-full px-6 py-2 sm:py-8 mb-20 lg:px-8 text-white max-w-[1700px] mx-auto">
      <div className="mx-auto text-start">
        <h2 className="text-2xl font-bold">Profile</h2>
      </div>

      <form className="h-full gap-10 space-y-9 w-full md:w-[70%] m-auto" onSubmit={handleFormikSubmit}>
        <div className="grid grid-cols-2 gap-3 w-full">
          {Object.keys(initialValues).map((key) => (
            <div key={key} className="flex flex-col gap-2 items-end">
              <div className="w-full  mt-4">
                <FormikInput
                  className="my-8"
                  label={capitalizeFirstLetter(key)}
                  type={key}
                  name={key}
                  shrink={true}
                  error={errors[key] && touched[key] ? true : false}
                  value={values[key]}
                  onChange={handleChange}
                />
              </div>
              {touched[key] && errors[key] && <div className="text-red-500 text-xs">{errors[key]}</div>}{' '}
            </div>
          ))}
        </div>
        <Button className="w-full" loading={isSubmitting} loadingType="circular" buttonType="submit">
          Edit Admin
        </Button>
      </form>
    </div>
  );
}

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
