import { Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { selectAdmin } from '../../../store/admin/adminSlice';
import GlobalTable from '../../../components/Table/GlobalTable';
import AddAdminRole from '../../../components/Admin/AddAdminRole';
import { add, edit, view, viewWhite } from '../../../images/other';
import { useAdminActions } from '../../../store/admin/adminActions';
import { ReactComponent as DeleteIcon } from '../../../SVGIcons/deleteIcon.svg';
import Loader from '../../../components/Loader/Loader';

function AdminRoles() {
  const { getAdminRole } = useAdminActions();
  const { rolesList } = useSelector(selectAdmin);

  const [open, setOpen] = useState(false);
  const [isView, setIsView] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState(null);

  const onPopupHandler = () => {
    setOpen(!open);
    if (open) {
      setSelectedRole(null);
    }
  };

  const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'name', label: 'Name' },
    { id: 'role', label: 'Roles' },
    { id: 'actions', label: 'Actions', headCellClass: 'text-center' },
  ];

  const rows =
    rolesList.length > 0
      ? rolesList?.map((_data: any, index: number) => {
          return {
            id: index,
            name: _data.name,
            role: `${_data.permissions
              ?.slice(0, 4)
              .map((dt: any) => dt.module)
              .join(', ')} ${_data.permissions?.length > 4 ? '...' : ''}`,
            actions: (
              <div className="flex items-center gap-2">
                <Tooltip title="View Admin Role">
                  <div
                    onClick={() => {
                      onPopupHandler();
                      setSelectedRole(_data);
                      setIsView(true);
                    }}
                  >
                    <img
                      src={view}
                      width={18}
                      height={18}
                      alt="View Icon"
                      className="cursor-pointer"
                    />
                  </div>
                </Tooltip>

                <Tooltip title="Edit Admin Role">
                  <img
                    src={edit}
                    width={18}
                    height={18}
                    alt="Edit Icon"
                    onClick={() => {
                      setIsView(false);
                      onPopupHandler();
                      setSelectedRole(_data);
                    }}
                    className="cursor-pointer"
                  />
                </Tooltip>
              </div>
            ),
          };
        })
      : [];

  useEffect(() => {
    if (rolesList.length === 0) {
      getAdminRole();
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full px-2 border py-4 rounded-md">
      <div className="flex bg-primary items-center table-head-bg text-white">
        <h1 className="flex-1 font-bold text-2xl px-3 py-1">Admin Roles</h1>
        <div
          className="flex gap-1 items-center cursor-pointer px-3"
          onClick={() => {
            setSelectedRole(null);
            setIsView(false);
            onPopupHandler();
          }}
        >
          <img src={add} alt="" width={24} height={24} />
          <span>Create Role</span>
        </div>
      </div>

      <AddAdminRole
        open={open}
        onClose={onPopupHandler}
        editRole={selectedRole}
        isView={isView}
      />
      <GlobalTable
        rows={rows}
        headCells={headCells}
        isLoading={loading}
        paginate={false}
      />
    </div>
  );
}

export default AdminRoles;
