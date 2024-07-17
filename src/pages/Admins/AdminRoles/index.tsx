import { Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { selectAdmin } from '../../../store/admin/adminSlice';
import GlobalTable from '../../../components/Table/GlobalTable';
import AddAdminRole from '../../../components/Admin/AddAdminRole';
import { add, edit, view, viewWhite } from '../../../images/other';
import { useAdminActions } from '../../../store/admin/adminActions';
import { ReactComponent as DeleteIcon } from '../../../SVGIcons/deleteIcon.svg';

function AdminRoles() {
  const { getAdminRole } = useAdminActions();
  const { rolesList } = useSelector(selectAdmin);

  const [open, setOpen] = useState(false);
  const [isView, setIsView] = useState(false);
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

  const data = [
    {
      name: 'Admin',
      roles: [
        { name: 'tokens-setting', roles: ['all', 'view', 'delete'] },
        { name: 'transaction-setting', roles: ['edit', 'delete'] },
        { name: 'desposit', roles: ['all', 'delete'] },
        { name: 'withdraw', roles: ['all', 'view', 'edit', 'delete'] },
        { name: 'withdraw-setting', roles: ['all', 'view', 'edit', 'delete'] },
        { name: 'transfer', roles: ['all', 'edit', 'delete'] },
        { name: 'swap', roles: ['all', 'view', 'delete'] },
        { name: 'faqs', roles: ['all', 'view', 'edit'] },
        { name: 'cloud-k-2.0', roles: ['all', 'view', 'edit', 'delete'] },
        { name: 'community', roles: ['view', 'edit'] },
        { name: 'cron-jobs', roles: ['all', 'delete'] },
        { name: 'maintenance-setting', roles: ['all', 'view', 'edit', 'delete'] },
      ],
    },
    {
      name: 'Supper Admin',
      roles: [
        { name: 'faqs', roles: ['all', 'view'] },
        { name: 'cloud-k-2.0', roles: ['all', 'view', 'edit', 'delete'] },
        { name: 'community', roles: ['all', 'view', 'delete'] },
        { name: 'cron-jobs', roles: ['all', 'view', 'edit'] },
        { name: 'maintenance-setting', roles: ['view', 'edit', 'delete'] },
      ],
    },
    {
      name: 'Sub Admin',
      roles: [
        { name: 'tokens-setting', roles: ['all', 'delete'] },
        { name: 'transaction-setting', roles: ['all', 'view', 'edit', 'delete'] },
        { name: 'desposit', roles: ['all', 'view'] },
        { name: 'withdraw', roles: ['edit', 'delete'] },
      ],
    },
  ];

  const rows = rolesList?.map((_data: any, index: number) => {
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
              <img src={view} width={18} height={18} alt="View Icon" className="cursor-pointer" />
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

          <Tooltip title={'Delete Admin Role'}>
            <div onClick={() => onDeleteHandler(_data)} className="cursor-pointer">
              <DeleteIcon />
            </div>
          </Tooltip>
        </div>
      ),
    };
  });

  const onDeleteHandler = (itm: any) => {
    console.log('itm ::', itm);
  };

  useEffect(() => {
    // if (rolesList.length === 0) {
      getAdminRole();
    // }
  }, []);

  return (
    <div className="w-full px-2">
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

      <AddAdminRole open={open} onClose={onPopupHandler} editRole={selectedRole} isView={isView} />
      <GlobalTable rows={rows} headCells={headCells} isLoading={false} paginate={false} />
    </div>
  );
}

export default AdminRoles;
