import { ErrorMessage, Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
// import TextInput from '../TextInput';
import Button from '../Button';
import FormikInput from '../FormikInput';
import { useSelector } from 'react-redux';
import AddAdminRole from './AddAdminRole';
import { debounce } from '../../utils/debounce';
import GlobalSelect from '../Global/GlobalSelect';
import React, { useEffect, useRef, useState } from 'react';
import { useAdminActions } from '../../store/admin/adminActions';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { selectAdmin, selectAdminPermissionsList } from '../../store/admin/adminSlice';
import { CapitalizeAllLetters, CapitalizeFirstLetter } from '../../utils/utils';
// import { errorAlert, successAlert } from '../../utils/alerts';
// import { check, close } from '../../images/other';
// import { CircularProgress, Dialog } from '@mui/material';
// import { useCustomerActions } from '../../store/customer/customerActions';
// import ReactSelect from '../ReactSelect';
// import CustomDropdown from '../CustomDropdown';
// import { TRANSACTION_PROCESS, TRANSACTION_TYPES } from '../../constants';
// import GlobalCheckbox from '../Global/GlobalCheckbox';
// import { ReactComponent as CancelIcon } from '../../SVGIcons/cancelIcon.svg';
// import GlobalButton from '../Global/GlobalButton';

export default function AdminDeatils({ create = false }: { create?: boolean }) {
  // const { updateCustomer } = useCustomerActions();
  // const params: any = useParams();
  // const navigate = useNavigate();
  // const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  // const [isTypingEmail, setIsTypingEmail] = useState<boolean | null>(null);
  // const [availablityEmail, setAvailablityEmail] = useState<boolean | null>(null);
  // const [isTypingUsername, setIsTypingUsername] = useState<boolean>(false);
  // const [availablityUsername, setAvailablityUsername] = useState<boolean | null>(null);

  // const onHandleSubmit = async (values) => {
  //   // enter the submitting
  //   setIsSubmitting(true);
  //   setIsSubmit(true);
  //   const _values = {
  //     ...values,
  //     adminPermissions: values.adminPermissions?.map((permission) => permission.value),
  //   };
  //   if (
  //     //CREATE ADMIN
  //     edit === undefined
  //   ) {
  //     const response = await createAdminData(_values);

  //     if (response?.admin) {
  //       successAlert('Admin created, Successfully!');
  //       navigate('/admin-setting/admins');
  //     } else {
  //       errorAlert(response?.message);
  //     }
  //   } else if (
  //     //EDIT ADMIN
  //     edit
  //   ) {
  //     const response = await updateCustomer(params.id, _values);
  //     console.log({ response });

  //     if (response?.status) {
  //       successAlert('Admin edited, Successfully!');
  //       navigate('/admin-setting/admins');
  //     } else if (!response?.status) {
  //       errorAlert(response?.message);
  //     }
  //   }

  //   // exit the submitting
  //   setIsSubmitting(false);
  // };

  // const handleInput = async (input: string, type: 'email' | 'username'): Promise<void> => {
  //   if (type === 'email') setIsTypingEmail(true);
  //   if (type === 'username') setIsTypingUsername(true);

  //   debounce(input, 1000, async () => {
  //     try {
  //       if (type === 'email') {
  //         const responseEmail = await checkAdminEmail(input);
  //         setAvailablityEmail(responseEmail.available);
  //       }
  //       if (type === 'username') {
  //         const responseUsername = await checkAdminUsername(input);
  //         setAvailablityUsername(responseUsername.available);
  //       }
  //     } catch (error) {
  //       if (type === 'email') setAvailablityEmail(false);
  //       else if (type === 'username') setAvailablityUsername(false);
  //     }

  //     if (type === 'email') setIsTypingEmail(false);
  //     else if (type === 'username') setIsTypingUsername(false);
  //   });
  // };

  const {
    createAdminData,
    getAdminPermissionsList,
    // checkAdminEmail,
    // checkAdminUsername,
    getAdminRole,
    createAdmin,
    getAdminById,
  } = useAdminActions();
  const { rolesList, selectedAdmin } = useSelector(selectAdmin);

  const adminPermissionsList = useSelector(selectAdminPermissionsList);
  const location: any = useLocation();

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
    email: Yup.string().required('Email is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    roles: Yup.string().required('Role is required'),
    password: Yup.string()
      .min(6, 'Must be at least 6 characters')
      .matches(/[a-z]/, 'Must have at least 1 lowercase letter')
      .matches(/[A-Z]/, 'Must have at least 1 uppercase letter')
      .matches(/[0-9]/, 'Must have at least 1 number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must have at least 1 symbol')
      .required('Password is required'),
  });

  useEffect(() => {
    (async () => {
      // if (adminPermissionsList.length === 0) {
      await getAdminPermissionsList();
      // }

      if (formikRef && state) {
        formikRef.current.setValues({
          email: state?.email ? state?.email : '',
          firstName: state?.firstName ? state?.firstName : '',
          lastName: state?.lastName ? state?.lastName : '',
          password: state?.password ? state?.password : '',
          adminPermissions: state?.adminPermissions?.map((permission) => {
            return {
              label: permission?.module,
              value: permission?.module,
            };
          }),
        });
        formikRef.current.setFieldTouched('username', false);
      }
    })();
  }, []);

  useEffect(() => {}, [adminPermissionsList, formikRef.current]);

  const handleClose = () => {
    setOpen(!open);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const response = await createAdmin(values);
      console.log('create admin api response ::', response.data);
      // onHandleSubmit(values);
    },
    initialTouched: {
      email: true,
      firstName: true,
      lastName: true,
    },
    innerRef: formikRef,
  });

  const { handleChange, handleSubmit, values, errors, touched } = formik;

  useEffect(() => {
    getAdminRole();
    // getAdminById()
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
                  label={CapitalizeFirstLetter(key)}
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
          <>{console.log('values', values?.roles)}</>
          <GlobalSelect
            required
            name="roles"
            label={CapitalizeFirstLetter('Admin Role')}
            options={rolesList?.map((dt) => ({
              label: dt?.name,
              value: dt?.name,
            }))}
            placeholder="Select Value"
            setFieldTouched={() => formik.setFieldTouched('roles', true)}
            setFieldValue={(e: any) => {
              formik.setFieldValue('roles', e);
            }}
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

        <div className="rounded-full py-4 items-baseline">
          <Button className="w-full bg-primary" loadingType="circular" buttonType="button" onClick={handleClose}>
            Create New Role
          </Button>
        </div>
      </div>
      <div className="px-6 lg:px-8 mx-auto mt-4">
        <Button
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
