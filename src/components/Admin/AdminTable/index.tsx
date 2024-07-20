import { Tooltip } from 'antd';
import StatusChip from '../../StatusChip';
import { useEffect, useState } from 'react';
import { Delete } from '../../../images/svg';
import { useNavigate } from 'react-router-dom';
import GlobalTable from '../../Table/GlobalTable';
import { edit, view } from '../../../images/other';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmDialog from '../../Dialog/ConfirmDialog';
import { Token } from '../../../store/token/tokenSlice';
import { errorAlert, successAlert } from '../../../utils/alerts';
import { useAdminActions } from '../../../store/admin/adminActions';
import {
  selectAdmin,
  selectAdminPermissionsList,
  setSelectedAdmin,
} from '../../../store/admin/adminSlice';

type Props = {
  data: any;
  loading: boolean;
  fetchAdminList: () => void;
};

const headCells = [
  { id: 'username', label: 'Username' },
  { id: 'firstName', label: 'First Name' },
  { id: 'lastName', label: 'Last Name' },
  { id: 'status', label: 'Status' },
  { id: 'actions', label: 'Actions', headCellClass: 'text-center' },
];

const AdminTable = ({ data, loading, fetchAdminList }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDelete, setIsDelete] = useState(false);
  const { adminDataDetail } = useSelector(selectAdmin);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [openLockUserDialog, setOpenLockUserDialog] = useState(false);
  const adminPermissionsList = useSelector(selectAdminPermissionsList);
  const { updateAdminAccess, deleteAdmin, getAdminList } = useAdminActions();

  const rows =
    data?.length > 0
      ? data?.map((_data: any) => {
          return {
            username: _data.username,
            firstName: _data.firstName,
            lastName: _data.lastName,
            status: <StatusChip status={_data.status?.toUpperCase()} />,
            actions: (
              <div className="flex items-center gap-2">
                <Tooltip title="View User">
                  <img
                    src={view}
                    width={18}
                    height={18}
                    alt="View Icon"
                    onClick={() => {
                      navigate('/admin-setting/admins/view/' + _data?._id, {
                        state: { _data, edit: false },
                      });
                      dispatch(setSelectedAdmin(_data));
                    }}
                    className="cursor-pointer"
                  />
                </Tooltip>
                <Tooltip title="Edit Admin">
                  <img
                    src={edit}
                    width={18}
                    height={18}
                    alt="Edit Icon"
                    onClick={() => {
                      navigate('/admin-setting/admins/edit/' + _data?._id, {
                        state: { _data, edit: true },
                      });
                    }}
                    className="cursor-pointer"
                  />
                </Tooltip>
                <Tooltip title="Delete Admin">
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setIsDelete(true);
                      setSelectedUser(_data);
                    }}
                  >
                    <Delete />
                  </div>
                </Tooltip>
              </div>
            ),
          };
        })
      : [];

  //delete admin
  const onDeleteAdmin = async () => {
    const response = await deleteAdmin(selectedUser._id);
    if (response.data?.status) {
      setSelectedUser(null);
      setIsDelete(false);
      return successAlert(response.data.message);
    }
    errorAlert(response.message);
  };

  return (
    <>
      {/* <ConfirmDialog
        title={
          selectedUser?.status === 'ACTIVE' ? 'Block Admin?' : 'Un-Block Admin?'
        }
        open={openLockUserDialog}
        onClose={() => {
          setOpenLockUserDialog(false);
        }}
        onConfirm={async () => {
          const response = await updateAdminAccess(
            selectedUser?._id,
            selectedUser?.status === 'ACTIVE' ? 'BLOCK' : 'ACTIVE'
          );
          if (response?.status) {
            successAlert(
              `Admin acesss ${selectedUser?.status === 'ACTIVE' ? 'Block' : 'Active'}, Successfully!`
            );
            fetchAdminList();
          } else {
            errorAlert(response?.message);
          }
          setOpenLockUserDialog(false);
        }}
      >
        Are you sure you want to{' '}
        {selectedUser?.status === 'ACTIVE' ? 'Block' : 'Un-Block'} this Admin?
      </ConfirmDialog> */}
      <GlobalTable
        rows={rows}
        headCells={headCells}
        isLoading={false}
        paginate={true}
        totalPages={adminDataDetail?.totalPages}
        page={adminDataDetail?.currentPage}
        handlePageChange={(page: number) => {
          getAdminList(page);
        }}
        handleOpen={() => {}}
      />
      <>{console.log('isDelete ::', { isDelete, selectedUser })}</>
      <ConfirmDialog
        title="Approved Verification?"
        open={isDelete}
        onClose={() => {
          setIsDelete(false);
          setSelectedUser(null);
        }}
        onConfirm={() => {
          onDeleteAdmin();
        }}
      >
        Are you sure you want to Delete Admin?
      </ConfirmDialog>
    </>
  );
};

export default AdminTable;
