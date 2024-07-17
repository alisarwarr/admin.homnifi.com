import React, { useState } from 'react';
import { add, edit, view, viewWhite } from '../../../images/other';
import AddAdminRole from '../../../components/Admin/AddAdminRole';
import GlobalTable from '../../../components/Table/GlobalTable';
import { Tooltip } from 'antd';
import { ReactComponent as DeleteIcon } from '../../../SVGIcons/deleteIcon.svg';

function AdminRoles() {
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const onPopupHandler = () => {
    setOpen(!open);
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
        'tokens-setting',
        'transaction-setting',
        'desposit',
        'withdraw',
        'withdraw-setting',
        'transfer',
        'swap',
        'faqs',
        'cloud-k-2.0',
        'community',
        'cron-jobs',
        'maintenance-setting',
        'auth-slider-setting',
        'edit',
        'delete',
      ],
    },
    { name: 'Supper Admin', roles: ['transfer', 'swap', 'faqs', 'cloud-k-2.0', 'community'] },
    { name: 'Sub Admin', roles: ['cron-jobs', 'maintenance-setting', 'auth-slider-setting', 'edit', 'delete'] },
  ];

  const rows = data?.map((_data: any, index: number) => {
    return {
      id: index,
      name: _data.name,
      role: `${_data.roles.slice(0, 4).join(', ')} ${_data.roles.length > 4 && '...'}`,
      actions: (
        <div className="flex items-center gap-2">
          <Tooltip title="View Admin">
            <img src={view} width={18} height={18} alt="View Icon" className="cursor-pointer" />
          </Tooltip>

          <Tooltip title="Edit Admin">
            <img
              src={edit}
              width={18}
              height={18}
              alt="Edit Icon"
              onClick={() => {
                onPopupHandler();
                setSelectedRole(_data);
              }}
              className="cursor-pointer"
            />
          </Tooltip>

          <Tooltip title={'Delete'}>
            <div onClick={() => onDeleteHandler(_data)}>
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

  return (
    <div className="w-full px-2">
      <div className="flex bg-primary items-center table-head-bg text-white">
        <h1 className="flex-1 font-bold text-2xl px-3 py-1">Admin Roles</h1>
        <div className="flex gap-1 items-center cursor-pointer px-3" onClick={onPopupHandler}>
          <img src={add} alt="" width={24} height={24} />
          <span>Create Role</span>
        </div>
      </div>

      <AddAdminRole open={open} onClose={onPopupHandler} editRole={selectedRole} />
      <GlobalTable rows={rows} headCells={headCells} isLoading={false} paginate={false} />
    </div>
  );
}

export default AdminRoles;
