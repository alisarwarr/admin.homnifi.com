import * as Yup from 'yup';
import Button from '../Button';
import { useFormik } from 'formik';
import FormikInput from '../FormikInput';
import { useSelector } from 'react-redux';
import AddAdminRole from './AddAdminRole';
import GlobalSelect from '../Global/GlobalSelect';
import { CapitalizeFirstLetter } from '../../utils/utils';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { errorAlert, successAlert } from '../../utils/alerts';
import { useAdminActions } from '../../store/admin/adminActions';
import { selectAdmin, selectAdminPermissionsList } from '../../store/admin/adminSlice';

export default function AdminDeatils({ create = false }: { create?: boolean }) {
  const { getAdminPermissionsList, getAdminRole, createAdmin, getAdminById, updateAdmin } = useAdminActions();
  const { rolesList, selectedAdmin } = useSelector(selectAdmin);

  const adminPermissionsList = useSelector(selectAdminPermissionsList);
  const location: any = useLocation();
  const navigate = useNavigate();

  const formikRef = useRef<any>(null);
  const state = location?.state?._data;
  const [edit] = useState<boolean>(location?.state?.edit);
  const [open, setOpen] = React.useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const initialValues = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    roles: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Email is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    roles: Yup.string().required('Role is required'),
    password: state
      ? Yup.string()
      : Yup.string()
          .min(6, 'Must be at least 6 characters')
          .matches(/[a-z]/, 'Must have at least 1 lowercase letter')
          .matches(/[A-Z]/, 'Must have at least 1 uppercase letter')
          .matches(/[0-9]/, 'Must have at least 1 number')
          .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must have at least 1 symbol')
          .required('Password is required'),
  });

  useEffect(() => {
    if (adminPermissionsList.length === 0) {
      getAdminPermissionsList();
    }
    if (state) {
      setValues({
        email: state.email ?? '',
        firstName: state.firstName ?? '',
        lastName: state.lastName ?? '',
        password: state.password ?? '',
        roles: state?.role[0]?._id ?? '',
      });
    }
  }, []);

  const handleClose = () => {
    setOpen(!open);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      let response: any;
      if (edit) {
        response = await updateAdmin(state._id, values);
      } else {
        response = await createAdmin(values);
      }

      if (response.data?.status) {
        successAlert('Admin Added Successfully!');
        return navigate('/admin-setting/admins');
      }
      console.log('response 321 123 ::', response.message);
      errorAlert(response.message);
    },
  });
  const { handleChange, handleSubmit, values, errors, touched, setValues } = formik;

  useEffect(() => {
    if (rolesList.length === 0) {
      getAdminRole();
    }
  }, []);

  return (
    <div className="w-full px-6 py-2 sm:py-8 mb-20 lg:px-8 max-w-[1700px] mx-auto">
      <div className="mx-auto text-start flex gap-4 items-center">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
          {create ? 'Create' : <>{edit ? 'Edit' : 'View'}</>} Admin
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-x-6 lg:grid-cols-2 mt-12 mx-12 items-start">
        {Object.keys(initialValues)
          .filter((dt) => dt !== 'roles')
          .map((key) => {
            return (
              <>
                <FormikInput
                  disabled={!edit || (state && key === 'password')}
                  label={CapitalizeFirstLetter(key)}
                  placeholder={`Enter your ${key}`}
                  type={key}
                  name={key}
                  shrink={true}
                  error={isSubmit && errors[key]}
                  touched={isSubmit ? touched[key] : false}
                  value={values[key]}
                  onChange={handleChange}
                  isError={false}
                />
              </>
            );
          })}
        <div className=" flex flex-col justify-end">
          <GlobalSelect
            disabled={!edit}
            required
            name="roles"
            label={'Admin Role'}
            options={rolesList?.map((dt) => ({
              label: dt?.name,
              value: dt?._id,
            }))}
            placeholder="Select Value"
            isError={formik.touched.roles && !!formik.errors.roles}
            value={formik.values.roles}
            onChange={(e: any) => {
              formik.setFieldValue('roles', e);
            }}
            onBlur={formik.handleBlur}
          />
          {touched.roles && errors.roles && isSubmit && (
            <span className="text-xs text-red-500 self-end ">{errors.roles}</span>
          )}
        </div>

        <div className="rounded-full py-4 items-baseline md:mt-4">
          <Button
            disable={!edit}
            className="w-full bg-primary"
            loadingType="circular"
            buttonType="button"
            onClick={handleClose}
          >
            Create New Role
          </Button>
        </div>
      </div>
      <div className="px-6 lg:px-8 mx-auto mt-4">
        <Button
          disable={!edit}
          className="w-full bg-primary"
          loadingType="circular"
          buttonType="button"
          onClick={() => {
            setIsSubmit(true);
            handleSubmit();
          }}
        >
          Submit
        </Button>
      </div>
      <AddAdminRole open={open} onClose={handleClose} />
    </div>
  );
}
