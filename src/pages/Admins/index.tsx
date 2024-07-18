//REACT
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAdminActions } from '../../store/admin/adminActions';

import { add } from '../../images/other';
import { selectUser } from '../../store/user/userSlice';
import { useNavigate } from 'react-router-dom';
import AdminTable from '../../components/Admin/AdminTable';
import { selectAdmin } from '../../store/admin/adminSlice';
import Loader from '../../components/Loader/Loader';

export default function Admins(): JSX.Element {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { list } = useSelector(selectAdmin);
  const { rolesList } = useSelector(selectAdmin);
  const { getAdminList, getAdminRole } = useAdminActions();

  const [loading, setLoading] = useState(true);

  const fetchAdminList = async () => {
    const response = await getAdminList();
    setLoading(false);
  };

  useEffect(() => {
    if (list?.length === 0) {
      fetchAdminList();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!user?.isSuperAdmin) return <></>;

  return (
    <div className="w-full px-2">
      <div className="flex bg-primary items-center table-head-bg text-white">
        <h1 className="flex-1 font-bold text-2xl px-3 py-1">Admins</h1>
        <div
          className="flex gap-1 items-center cursor-pointer px-3"
          onClick={() => navigate('/admin-setting/admins/create', { state: { edit: true } })}
        >
          <img src={add} alt="" width={24} height={24} />
          <span>Create</span>
        </div>
      </div>
      {/* TABLE */}
      <AdminTable data={list} loading={loading} fetchAdminList = {fetchAdminList}/>
    </div>
  );
}
