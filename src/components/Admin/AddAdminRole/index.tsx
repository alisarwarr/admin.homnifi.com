import * as Yup from 'yup';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import { CancelIcon } from '../../../images/svg';
import GlobalInput from '../../Global/GlobalInput';
import GlobalSelect from '../../Global/GlobalSelect';
import GlobalDialog from '../../../components/Dialog';
import GlobalCheckbox from '../../Global/GlobalCheckbox';
import { ReactComponent as CrossIcon } from '../../../SVGIcons/cancelIcon.svg';
import { permissionsList, rolesList } from '../../../utils/data';

interface Props {
  open: boolean;
  onClose: () => void;
  editRole?: any;
  isView?: boolean;
}

function AddAdminRole({ open, onClose, editRole, isView = false }: Props) {
  const [activeRoles, setActiveRoles] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<any[]>([]);
  const [isRoleSubmit, setIsRoleSubmit] = useState<boolean>(false);

  //permission checkbox handler
  const handleRoleSelection = (name: string, role: string) => {
    if (role === 'all' && !activeRoles[name]?.includes(role)) {
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

  //delete permissions
  const handleUserClick = (name: string) => {
    setSelectedRoles((prevItems) => prevItems.filter((dt) => dt !== name));
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
    onSubmit: (values) => {
      setIsRoleSubmit(true);
      console.log('Submitted values:', { activeRoles, selectedRoles });
    },
  });
  const { handleChange, handleSubmit, values, errors, touched, setFieldValue } = formik;

  //edit data set state
  useEffect(() => {
    if (editRole) {
      setFieldValue('name', editRole.name);
      const obj = {};
      editRole.roles.map((dt: any) => {
        obj[dt.name] = dt.roles;
      });
      setActiveRoles((prev) => ({
        ...prev,
        ...obj,
      }));

      const keys = Object.keys(obj);
      setSelectedRoles(keys);
    }
  }, [editRole]);

  return (
    <div>
      <GlobalDialog
        open={open}
        size="md"
        closeButtonShow={false}
        onClose={onClose}
        content={
          <form onSubmit={handleSubmit} className="h-full gap-10 space-y-9 w-full ">
            <div className="flex justify-between items-center py-2">
              <div className=" text-md font-medium">
                {editRole && !isView ? 'Edit' : isView ? 'View' : 'Create'} Admin Role
              </div>
              <div className="cursor-pointer" onClick={onClose}>
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
                    placeholder="Enter your name"
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
                  options={rolesList.map((dt) => ({
                    label: dt?.name,
                    value: dt?.name,
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
