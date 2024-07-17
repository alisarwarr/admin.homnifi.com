import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import Button from '../../../components/Button';
import { CancelIcon } from '../../../images/svg';
import React, { useEffect, useState } from 'react';
import GlobalInput from '../../Global/GlobalInput';
import GlobalSelect from '../../Global/GlobalSelect';
import GlobalDialog from '../../../components/Dialog';
import { permissionsList } from '../../../utils/data';
import GlobalCheckbox from '../../Global/GlobalCheckbox';
import { errorNotify, successAlert } from '../../../utils/alerts';
import { useAdminActions } from '../../../store/admin/adminActions';
import { ReactComponent as CrossIcon } from '../../../SVGIcons/cancelIcon.svg';
import { selectAdminPermissionsList } from '../../../store/admin/adminSlice';

interface Props {
  open: boolean;
  onClose: () => void;
  editRole?: any;
  isView?: boolean;
}

function AddAdminRole({ open, onClose, editRole, isView = false }: Props) {
  const adminPermissionsList = useSelector(selectAdminPermissionsList);
  const { createAdminData, getAdminPermissionsList, createAdminRole, updateAdminPermisson } = useAdminActions();

  const [activeRoles, setActiveRoles] = useState<any>({});
  const [selectedRoles, setSelectedRoles] = useState<any[]>([]);
  const [isRoleSubmit, setIsRoleSubmit] = useState<boolean>(false);

  //permission checkbox handler
  const handleRoleSelection = (name: string, role: string) => {
    if (role === 'ALL' && !activeRoles[name]?.includes(role)) {
      setActiveRoles((prev) => ({
        ...prev,
        [name]: permissionsList,
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

  //delete permissions
  const handleUserClick = (name: string) => {
    setSelectedRoles((prevItems) => prevItems.filter((dt) => dt !== name));

    setActiveRoles((prev: any) => {
      const roleObject = { ...prev };
      if (roleObject.hasOwnProperty(name)) {
        delete roleObject[name];
      }
      return roleObject;
    });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
  });

  const initialValues: any = {
    name: '',
    permission: '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsRoleSubmit(true);
      let response;

      if (editRole) {
        const body = Object.keys(activeRoles)?.map((dt: string) => {
          return {
            source: dt,
            actions: activeRoles[dt],
          };
        });
        response = await updateAdminPermisson(editRole._id, { permissions: body });
      } else {
        const body = Object.keys(activeRoles)?.map((dt: string) => {
          return {
            module: dt,
            action: activeRoles[dt],
          };
        });
        response = await createAdminRole({ name: values.name, permissions: body });
      }
      if (response.status) {
        successAlert(response.message);
        setIsRoleSubmit(false);
        return resetForm();
      } else {
        return errorNotify(response.message);
      }
    },
  });

  const { handleChange, handleSubmit, values, errors, touched, setFieldValue, resetForm } = formik;

  //edit data set state
  useEffect(() => {
    if (editRole) {
      setFieldValue('name', editRole.name);
      const obj = {};
      editRole.permissions.map((dt: any) => {
        obj[dt.module] = dt.action;
      });
      setActiveRoles(obj);

      const keys = Object.keys(obj);
      setSelectedRoles(keys);
    }
  }, [editRole]);

  useEffect(() => {
    getAdminPermissionsList();
  }, []);

  return (
    <div>
      <GlobalDialog
        open={open}
        size="md"
        closeButtonShow={false}
        onClose={() => {
          onClose();
          setActiveRoles({});
        }}
        content={
          <form onSubmit={handleSubmit} className="h-full gap-10 space-y-9 w-full ">
            <div className="flex justify-between items-center py-2">
              <div className=" text-md font-medium">
                {editRole && !isView ? 'Edit' : isView ? 'View' : 'Create'} Admin Role
              </div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  onClose();
                  setActiveRoles({});
                }}
              >
                <CrossIcon />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 mt-4 mx-8">
              <div className="flex flex-col items-end">
                <div className="w-full relative">
                  <GlobalInput
                    disabled={isView}
                    name="name"
                    label="Name"
                    placeholder="Enter Role name"
                    type="text"
                    required
                    value={values.name}
                    onChange={handleChange}
                    isError={errors.name}
                    error={errors.name}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <GlobalSelect
                  disabled={isView}
                  name="permission"
                  label="Permission"
                  required={!selectedRoles.length}
                  placeholder="Select Permission"
                  options={adminPermissionsList?.map((dt) => ({
                    label: dt.module,
                    value: dt.module,
                  }))}
                  isMulti={true}
                  isError={isRoleSubmit && !selectedRoles.length ? true : false}
                  error={'Permission is required'}
                  onChange={(e: any) => {
                    setSelectedRoles((prev) => {
                      if (prev.includes(e)) {
                        return prev;
                      } else {
                        return [...prev, e];
                      }
                    });
                    handleChange(e);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col mx-8 ">
              {selectedRoles.length > 0 && (
                <div className="flex flex-col justify-end items-start rounded-md z-10 border border-gray-300  text-gray-500 ">
                  <div className="h-[32vh] w-full overflow-y-auto">
                    {selectedRoles.map((dt) => (
                      <div key={dt} className="px-4 py-3 w-full border-b-2">
                        <div className="flex gap-4 justify-between">
                          <div className="flex gap-4">
                            <div className="font-medium text-sm w-36">{dt}</div>
                            {permissionsList.map((rl) => (
                              <div key={rl}>
                                <GlobalCheckbox
                                  disabled={isView}
                                  className="font-medium"
                                  checked={activeRoles[dt]?.includes(rl) ?? false}
                                  label={rl}
                                  onChange={() => {
                                    handleRoleSelection(dt, rl);
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                          <div
                            className={`selt-end  ${isView ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            onClick={() => {
                              if (!isView) {
                                handleUserClick(dt);
                              }
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
            </div>
            <div className="mx-8">
              <Button className="w-full bg-primary " loadingType="circular" buttonType="submit">
                Submit
              </Button>
            </div>
          </form>
        }
      />
    </div>
  );
}

export default AddAdminRole;
