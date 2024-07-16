import React, { useState } from 'react';
import { add } from '../../../images/other';
import AddAdminRole from '../../../components/Admin/AddAdminRole';

function AdminRoles() {
  const [open, setOpen] = useState(false);
  const onPopupHandler = () => {
    setOpen(!open);
  };
  return (
    <div className="w-full px-2">
      <div className="flex bg-primary items-center table-head-bg text-white">
        <h1 className="flex-1 font-bold text-2xl px-3 py-1">Admins</h1>
        <div className="flex gap-1 items-center cursor-pointer px-3" onClick={onPopupHandler}>
          <img src={add} alt="" width={24} height={24} />
          <span>Create Role</span>
        </div>
      </div>

      <AddAdminRole open={open} onClose={onPopupHandler} />
    </div>
  );
}

export default AdminRoles;
