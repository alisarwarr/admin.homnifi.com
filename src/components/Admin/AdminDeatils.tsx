import { ErrorMessage, Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../TextInput';
import Button from '../Button';
import React, { useEffect, useRef, useState } from 'react';
import { errorAlert, successAlert } from '../../utils/alerts';
import { useAdminActions } from '../../store/admin/adminActions';
import { debounce } from '../../utils/debounce';
import { check, close } from '../../images/other';
import { CircularProgress, Dialog } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useCustomerActions } from '../../store/customer/customerActions';
import ReactSelect from '../ReactSelect';
import { useSelector } from 'react-redux';
import { selectAdminPermissionsList } from '../../store/admin/adminSlice';
import CustomDropdown from '../CustomDropdown';
import FormikInput from '../FormikInput';
import { CapitalizeAllLetters, CapitalizeFirstLetter } from '../../utils/utils';
import GlobalSelect from '../Global/GlobalSelect';
import { TRANSACTION_PROCESS, TRANSACTION_TYPES } from '../../constants';
import GlobalCheckbox from '../Global/GlobalCheckbox';
import { ReactComponent as CancelIcon } from '../../SVGIcons/cancelIcon.svg';
import GlobalButton from '../Global/GlobalButton';
export default function AdminDeatils({ create = false }: { create?: boolean }) {
  const { updateCustomer } = useCustomerActions();
  const { createAdminData, getAdminPermissionsList, checkAdminEmail, checkAdminUsername } = useAdminActions();
  const adminPermissionsList = useSelector(selectAdminPermissionsList);
  const navigate = useNavigate();
  const location: any = useLocation();
  const params: any = useParams();

  const [edit] = useState<boolean>(location?.state?.edit);
  const state = location?.state?._data;

  const formikRef = useRef<any>(null);

  const [open, setOpen] = React.useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isTypingEmail, setIsTypingEmail] = useState<boolean | null>(null);
  const [availablityEmail, setAvailablityEmail] = useState<boolean | null>(null);
  const [isTypingUsername, setIsTypingUsername] = useState<boolean>(false);
  const [availablityUsername, setAvailablityUsername] = useState<boolean | null>(null);

  const initialValues = {
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    roles: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    username: Yup.string().required('Username is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
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
      if (adminPermissionsList.length === 0) {
        await getAdminPermissionsList();
      }

      if (formikRef && state) {
        formikRef.current.setValues({
          email: state?.email ? state?.email : '',
          username: state?.username ? state?.username : '',
          firstName: state?.firstName ? state?.firstName : '',
          lastName: state?.lastName ? state?.lastName : '',
          phoneNumber: state?.phoneNumber ? state?.phoneNumber : '',
          password: state?.password ? state?.password : '',
          adminPermissions: state?.adminPermissions?.map((permission) => {
            return {
              label: permission?.name,
              value: permission?.name,
            };
          }),
        });
        formikRef.current.setFieldTouched('username', false);
      }
    })();
  }, []);

  useEffect(() => {}, [adminPermissionsList, formikRef.current]);

  const onHandleSubmit = async (values) => {
    // enter the submitting
    setIsSubmitting(true);
    setIsSubmit(true);
    const _values = {
      ...values,
      adminPermissions: values.adminPermissions?.map((permission) => permission.value),
    };
    if (
      //CREATE ADMIN
      edit === undefined
    ) {
      const response = await createAdminData(_values);

      if (response?.admin) {
        successAlert('Admin created, Successfully!');
        navigate('/admins');
      } else {
        errorAlert(response?.message);
      }
    } else if (
      //EDIT ADMIN
      edit
    ) {
      const response = await updateCustomer(params.id, _values);
      console.log({ response });

      if (response?.status) {
        successAlert('Admin edited, Successfully!');
        navigate('/admins');
      } else if (!response?.status) {
        errorAlert(response?.message);
      }
    }

    // exit the submitting
    setIsSubmitting(false);
  };

  const handleInput = async (input: string, type: 'email' | 'username'): Promise<void> => {
    if (type === 'email') setIsTypingEmail(true);
    if (type === 'username') setIsTypingUsername(true);

    debounce(input, 1000, async () => {
      try {
        if (type === 'email') {
          const responseEmail = await checkAdminEmail(input);
          setAvailablityEmail(responseEmail.available);
        }
        if (type === 'username') {
          const responseUsername = await checkAdminUsername(input);
          setAvailablityUsername(responseUsername.available);
        }
      } catch (error) {
        if (type === 'email') setAvailablityEmail(false);
        else if (type === 'username') setAvailablityUsername(false);
      }

      if (type === 'email') setIsTypingEmail(false);
      else if (type === 'username') setIsTypingUsername(false);
    });
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log('values', values);
      onHandleSubmit(values);
    },
    initialTouched: {
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
    },
    innerRef: formikRef,
  });

  const { handleChange, handleSubmit, values, errors, touched } = formik;

  return (
    <div className="w-full px-6 py-2 sm:py-8 mb-20 lg:px-8 text-white max-w-[1700px] mx-auto">
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
            options={adminPermissionsList?.map((dt) => ({
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

      <CreateRole onClose={handleClose} open={open} adminPermissionsList={adminPermissionsList} />
    </div>
  );
}

const CreateRole = ({
  onClose,
  open,
  adminPermissionsList,
}: {
  adminPermissionsList: any;
  open: boolean;
  onClose: () => void;
}) => {
  const [isRoleSubmit, setIsRoleSubmit] = React.useState(false);
  const onHandleSubmit = (values: any) => {
    console.log('Submitted values:', values);
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
  });

  const initialValues: any = {
    name: '',
    permission: null,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Submitted values:', values);
    },
  });
  const { handleChange, values, errors, touched, setFieldValue, handleBlur, setFieldTouched, handleSubmit } = formik;
  const [selectedRoles, setSelectedRoles] = useState<any[]>([]);
  const [activedRoles, setActiveRoles] = useState<any[]>([]);
  const [term, setTerms] = useState<boolean>(false);

  const roleAndPermission: any = [
    {
      name: 'user',
      roles: ['all', 'view', 'edit', 'delete'],
    },
    {
      name: 'support',
      roles: ['all', 'view', 'edit', 'delete'],
    },
    {
      name: 'client',
      roles: ['all', 'view', 'edit', 'delete'],
    },
  ];

  const handleRoleSelection = (name: string, role: string) => {
    if (role === 'all' && !activedRoles[name]?.includes(role)) {
      setActiveRoles((prev) => ({
        ...prev,
        [name]: ['all', 'view', 'edit', 'delete'],
      }));
      return;
    }

    setActiveRoles((prev: any) => {
      const userRoles = prev[name] || [];
      const updatedRoles = userRoles.includes(role) ? userRoles.filter((r) => r !== role) : [...userRoles, role];

      if (updatedRoles.length === 0) {
        const { [name]: _, ...rest } = prev;
        return rest;
      }

      return {
        ...prev,
        [name]: updatedRoles,
      };
    });
  };

  const handleUserClick = (name: string) => {
    setSelectedRoles((prevItems) => prevItems.filter((dt) => dt !== name));
  };

  return (
    <Dialog open={open} fullWidth={true} maxWidth={'md'} onClose={onClose}>
      <div className="flex flex-col items-center w-full my-8">
        <h2 className="text-md font-medium self-start mx-8">Create New Role</h2>
        <div className=" text-gray-500 w-full my-4 flex items-center justify-center ">
          <form onSubmit={formik.handleSubmit} className="h-full gap-10 space-y-9 w-full mx-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 mt-4">
              <div className="flex flex-col items-end">
                <div className="w-full relative">
                  <FormikInput
                    type="string"
                    label="Name"
                    name="name"
                    shrink={true}
                    error={isRoleSubmit && errors['name']}
                    touched={isRoleSubmit ? touched['name'] : false}
                    value={values['name']}
                    onChange={handleChange}
                    isError={false}
                  />
                </div>
              </div>
              <div className="flex flex-col mt-2">
                <GlobalSelect
                  name="permission"
                  label="Permission"
                  required={!selectedRoles.length}
                  placeholder="Select Permission"
                  options={roleAndPermission.map((dt) => ({
                    label: dt?.name,
                    value: dt?.name,
                  }))}
                  setFieldTouched={formik.setFieldTouched}
                  setFieldValue={formik.setFieldValue}
                  isMulti={true}
                  isError={formik.touched.permission && !!formik.errors.permission && !selectedRoles.length}
                  value={formik.values.permission?.value}
                  onChange={(e: any) => {
                    setSelectedRoles((prev) => {
                      if (prev.includes(e.value)) {
                        return prev.filter((i) => i !== e.value);
                      } else {
                        return [...prev, e.value];
                      }
                    });
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                />
                {selectedRoles.length === 0 && isRoleSubmit && (
                  <span className="text-xs text-red-500 self-end ">Role is required</span>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              {/* dropdown result section start */}
              {selectedRoles.length > 0 && (
                <div className="flex flex-col justify-end items-start rounded-md z-10 border border-gray-300  text-gray-500 overflow-y-auto">
                  <div className="h-[21vh] w-full">
                    {selectedRoles.map((dt) => (
                      <div key={dt} className="px-4 py-3 w-full border-b-2">
                        <div className="flex gap-4 justify-between">
                          <div className="flex gap-4">
                            <div className="font-medium text-sm w-14">{dt}</div>
                            {['all', 'view', 'edit', 'delete'].map((rl) => (
                              <div key={rl}>
                                <GlobalCheckbox
                                  className="font-medium"
                                  checked={activedRoles[dt]?.includes(rl) ?? false}
                                  setChecked={setTerms}
                                  label={rl}
                                  onChange={() => {
                                    handleRoleSelection(dt, rl);
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                          <div
                            className="selt-end cursor-pointer"
                            onClick={() => {
                              handleUserClick(dt);
                            }}
                          >
                            <CancelIcon />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* dropdown result section end */}
            </div>
            <Button
              className="w-full bg-primary"
              loadingType="circular"
              buttonType="submit"
              onClick={(e) => {
                setIsRoleSubmit(true);
                handleSubmit();
              }}
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </Dialog>
  );
};
