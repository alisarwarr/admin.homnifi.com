import {
  Checkbox,
  IconButton,
  InputBase,
  MenuItem,
  Pagination,
  Select,
  Skeleton,
  Tooltip,
} from '@mui/material';
import NoData from './NoData';
import React, { useEffect, useState } from 'react';
import {
  exportIcon,
  filterIcon,
  lock,
  mail,
  print,
  unlock,
} from '../../images/other';
import styled from '@emotion/styled';
import FormikInput from '../FormikInput';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import GlobalDialog from '../Dialog';
import MailUser from '../Users/MailUser';
import ConfirmDialog from '../Dialog/ConfirmDialog';
import { useCustomerActions } from '../../store/customer/customerActions';
import { errorAlert, successAlert } from '../../utils/alerts';
import { Theme } from '@mui/material/styles';

import { Copy } from '../../images/svg';
import { formatDate, isIsoDateString } from '../../utils/helper';

type Props = {
  rows?: any[];
  accordion?: any;
  isLoading?: boolean | undefined;
  headCells?: {
    id: string;
    label: string;
    dataClass?: string;
    headCellClass?: string;
    rowDataClass?: string;
    showToolTip?: boolean;
  }[];
  totalPages?: number;
  handlePageChange?: (num: number) => void;
  tableTitle?: string;
  page?: number;
  paginate?: boolean;
  checkBoxes?: boolean;
  setColumns?: any;
  ColumnsList?: any;
  filter?: any;
  setFilter?: any;
  handleLimitChange?: any;
  showInnerFilters?: boolean;
  csvData?: any;
  sort?: any;
  setSort?: any;
  showSort?: boolean;
  outerFilters?: any;
  refetch?: any;
  showInnerFiltersSearch?: boolean;
  innerFiltersClassName?: string;
  rowClasNames?: string;
  setClickeddRow?: any;
  copyIconList?: any[];
  showAccordion?: string;
  copyItems?: any[];
  colorItems?: any[];
  imageItems?: any[];

  noDataSettings?: string;
  handleOpen?: (id: string) => void;
  filterButtons?: React.ReactNode;
};

const csvConfig = mkConfig({ useKeysAsHeaders: true });

const GlobalTable = ({
  rows = [],
  isLoading,
  headCells = [],
  handlePageChange,
  totalPages,
  page,
  paginate = true,
  checkBoxes = false,
  setColumns = [],
  ColumnsList,
  filter,
  setFilter,
  handleLimitChange,
  showInnerFilters = false,
  csvData,
  outerFilters,
  refetch,
  showInnerFiltersSearch = true,
  innerFiltersClassName = '',
  copyIconList = [],
  accordion = {},
  copyItems,
  colorItems,
  imageItems,
  noDataSettings,
  handleOpen,
  rowClasNames,
  filterButtons,
}: Props) => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [isDropdown, setIsDropdown] = useState(false);
  const [openSendMailDialog, setOpenSendMailDialog] = useState(false);
  const [openLockUserDialog, setOpenLockUserDialog] = useState(false);
  const [openUnLockUserDialog, setOpenUnLockUserDialog] = useState(false);
  const { changeBulkUsersStatus } = useCustomerActions();

  const handleRowCheckboxChange = (row: any) => {
    const selectedIndex = selectedRows.findIndex(
      (selectedRow) => selectedRow._id === row._id
    );
    let newSelectedRows: any[] = [];

    if (selectedIndex === -1) {
      newSelectedRows = [...selectedRows, row];
    } else if (selectedIndex === 0) {
      newSelectedRows = [...selectedRows.slice(1)];
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelectedRows = [...selectedRows.slice(0, -1)];
    } else if (selectedIndex > 0) {
      newSelectedRows = [
        ...selectedRows.slice(0, selectedIndex),
        ...selectedRows.slice(selectedIndex + 1),
      ];
    }

    setSelectedRows(newSelectedRows);
  };

  const handleCheckboxChange = (index) => {
    const updatedColumns = [...ColumnsList];
    updatedColumns[index] = {
      ...updatedColumns[index],
      show: !updatedColumns[index].show,
    };
    setColumns(updatedColumns);
  };

  //search handle change
  const searchHandleChange = (e: any) => {
    setFilter({ ...filter, search: e?.target?.value });
  };

  const mailSelectedUsers = () => {
    setOpenSendMailDialog(true);
  };

  useEffect(() => {
    if (outerFilters?.search !== null && checkBoxes) {
      const search = setTimeout(async () => {
        setSelectedRows([]);
      }, 400);
      return () => clearTimeout(search);
    }
  }, [outerFilters?.search]);

  useEffect(() => {
    if (checkBoxes) {
      setSelectedRows([]);
    }
  }, [
    outerFilters?.country,
    outerFilters?.accountType,
    outerFilters?.twoFA,
    outerFilters?.verified,
  ]);

  return (
    <div className=" backdrop-blur-md  w-full col-span-12  relative  ">
      <div className="h-full">
        {showInnerFilters && (
          <div
            className={`w-full flex justify-end mb-3 ${innerFiltersClassName}`}
          >
            {/* headCells */}
            {showInnerFiltersSearch && (
              <FormikInput
                label=""
                type="text"
                placeholder="Search Name/Email"
                name="search"
                value={filter?.search}
                onChange={searchHandleChange}
                className="max-w-[300px]"
              />
            )}
            <div className="flex gap-2 items-center mr-2 z-50">
              {filterButtons ? (
                filterButtons
              ) : (
                <>
                  <IconButton
                    className="text-white border border-borderBlue focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                    type="button"
                    onClick={() => {
                      const data = csvData();

                      if (data) {
                        const csv = generateCsv(csvConfig)(data);
                        download(csvConfig)(csv);
                      }
                    }}
                  >
                    <img src={exportIcon} className="w-6 bg-primary h-6" />
                  </IconButton>
                  <IconButton
                    className="text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                    type="button"
                    onClick={() => {
                      window.print();
                    }}
                  >
                    <img src={print} className="w-6 h-6" />
                  </IconButton>
                  <IconButton
                    onClick={() => setIsDropdown(!isDropdown)}
                    className="text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                    type="button"
                  >
                    <img src={filterIcon} className="w-6 h-6" />
                  </IconButton>
                  {isDropdown && (
                    <div
                      id="dropdownDefaultCheckbox"
                      className="max-h-[300px] overflow-y-auto w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute top-16 right-8 !z-50"
                    >
                      <ul
                        className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownCheckboxButton"
                      >
                        <li>
                          {ColumnsList.map((itm, index) => {
                            return (
                              <div className="flex items-center border-b border-gray-200 rounded-t-lg dark:border-gray-600 px-2 py-2">
                                <input
                                  id="checkbox-item-1"
                                  type="checkbox"
                                  checked={itm.show}
                                  onChange={() => handleCheckboxChange(index)}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label
                                  htmlFor="checkbox-item-1"
                                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  {itm?.label}
                                </label>
                              </div>
                            );
                          })}
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* Bulk Actions */}
        {selectedRows.length > 0 && (
          <div className="ml-auto flex mr-4 text-white gap-4 border rounded-md w-fit p-3">
            <span>Bulk Actions</span>

            {/* ACTIONS */}
            <div className="flex gap-1">
              <Tooltip title="Mail Selected Users">
                <img
                  src={mail}
                  width={18}
                  height={18}
                  alt="Message Icon"
                  onClick={mailSelectedUsers}
                  className="cursor-pointer"
                />
              </Tooltip>

              <Tooltip title="Block Selected Users">
                <img
                  src={lock}
                  width={18}
                  height={18}
                  alt="Lock Icon"
                  onClick={() => setOpenLockUserDialog(true)}
                  className="cursor-pointer"
                />
              </Tooltip>

              <Tooltip title="Unblock Selected Users">
                <img
                  src={unlock}
                  width={18}
                  height={18}
                  alt="Unlock Icon"
                  onClick={() => setOpenUnLockUserDialog(true)}
                  className="cursor-pointer"
                />
              </Tooltip>
            </div>
          </div>
        )}
        <div
          className={`hidden lg:flex items-center gap-2 overflow-x-auto border bg-white border-borderGray rounded-lg `}
        >
          {/* <div className="hidden lg:flex items-center gap-2 overflow-auto"> */}
          <table className={`table-bordered border-collapse w-full`}>
            <thead>
              <tr
                className={`${rows.length > 0 ? 'text-defaultBlack' : 'text-textSecondary'} w-full text-left`}
              ></tr>
              <tr
                className={`${rows.length > 0 ? 'text-black' : 'text-textSecondary'} w-full `}
              >
                {headCells &&
                  headCells.map((cell, index) => (
                    <th
                      key={index}
                      className={`hidden lg:table-cell text-center font-medium text-sm p-3 border-b border-borderGray
                       ${cell.dataClass}  border-b`}
                    >
                      {cell.label}
                    </th>
                  ))}
              </tr>
            </thead>
            {isLoading ? (
              <tbody>
                <tr className="font-normal text-sm w-full border-b border-secondary">
                  {headCells.map((_, index) => (
                    <td
                      key={index}
                      className="table-cell font-normal text-xs text-textSecondary w-1/5 py-3"
                    >
                      <Skeleton
                        variant="rounded"
                        width={'80%'}
                        height={20}
                        animation={'wave'}
                      />
                    </td>
                  ))}
                  {checkBoxes && (
                    <td className="table-cell font-normal text-xs text-textSecondary w-1/5 py-3">
                      <Skeleton
                        variant="rounded"
                        width={'80%'}
                        height={20}
                        animation={'wave'}
                      />
                    </td>
                  )}
                </tr>
              </tbody>
            ) : (
              <>
                <tbody>
                  {rows.map((row, index) => {
                    return (
                      <tr
                        key={index}
                        className={`font-normal text-xs w-full border-b border-secondary ${rowClasNames}`}
                        onClick={() => handleOpen && handleOpen(row._id)}
                      >
                        {/* Checkbox column */}
                        {checkBoxes && (
                          <td>
                            <Checkbox
                              checked={
                                selectedRows.find(
                                  (selectedRow) => selectedRow._id === row._id
                                )
                                  ? true
                                  : false
                              }
                              onChange={() => handleRowCheckboxChange(row)}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                          </td>
                        )}

                        {headCells.map((cell, index) => {
                          let color = '';
                          if (
                            row[cell.id] === 'success' ||
                            row[cell.id] === 'approved'
                          )
                            color = 'text-primaryGreen';
                          else if (row[cell.id] === 'pending')
                            color = 'text-primary';
                          else if (row[cell.id] === 'failed')
                            color = 'text-primaryRed';

                          return (
                            cell.id !== '_id' && (
                              <td
                                key={index}
                                className={`table-cell font-medium text-xs text-textSecondary py-4 px-2 topup ${cell.rowDataClass} ${cell.dataClass}`}
                              >
                                <div
                                  className={`py-2  flex justify-center items-center ${!copyItems?.includes(headCells[index].id) && `${color}`}`}
                                >
                                  {imageItems?.includes(headCells[index].id) ? (
                                    <img
                                      src={row[cell.id]}
                                      className="w-7 h-7"
                                      alt=""
                                    />
                                  ) : (
                                    <>
                                      {isIsoDateString(row[cell.id]) ? (
                                        formatDate(row[cell.id])
                                      ) : row[cell.id] || row[cell.id] === 0 ? (
                                        row[cell.id]
                                      ) : (
                                        <>-</>
                                      )}
                                    </>
                                  )}
                                  {copyIconList.find(
                                    (dt) => dt === cell.id
                                  ) && (
                                    <Copy
                                      className="ml-3 cursor-pointer"
                                      onClick={() =>
                                        navigator.clipboard.writeText(
                                          row[cell.id]
                                        )
                                      }
                                    />
                                  )}
                                </div>
                              </td>
                            )
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </>
            )}
          </table>
        </div>

        <div className="flex md:hidden flex-col gap-3">
          <div className="flex flex-col gap-4 w-full text-defaultBlack text-xs">
            {isLoading &&
              headCells.map((cell, index) => (
                <div key={index} className="w-full flex items-center">
                  <div className="w-1/3">{cell.label}:</div>
                  <div className="w-2/3">
                    <Skeleton
                      variant="rounded"
                      height={20}
                      animation={'wave'}
                    />
                  </div>
                </div>
              ))}
            {rows.map((row, index) => (
              <div key={index}>
                {headCells.map((cell, index) => (
                  <div key={index} className="w-full  flex items-center mt-3">
                    <div className="w-1/3">{cell.label}:</div>
                    <div className="w-2/3">{row?.[cell.id]}</div>
                    <div className="w-2/3">{accordion[cell.id]}</div>
                  </div>
                ))}
                <hr className="text-white my-3" />
              </div>
            ))}
          </div>
        </div>
        <NoData visible={rows.length < 1 && !isLoading} text={noDataSettings} />
      </div>

      <div
        className={`mt-3 flex ${filter ? 'justify-between' : 'justify-center'} items-center`}
      >
        <div className="self-center w-full flex justify-center ">
          {totalPages && paginate ? (
            <Pagination
              shape="rounded"
              count={totalPages}
              page={page}
              onChange={(e, value) => {
                handlePageChange && handlePageChange(value);
              }}
            />
          ) : (
            ''
          )}
        </div>
      </div>

      <GlobalDialog
        open={openSendMailDialog}
        content={
          <div className="flex flex-col">
            <span className="text-2xl">Mail Selected Users</span>
            <MailUser
              onClose={() => setOpenSendMailDialog(false)}
              bulkMail={true}
              userIds={selectedRows.map((row) => row._id)}
            />
          </div>
        }
        closeButtonShow={false}
      />

      {/* BLOCK USER STATUS DIALOG */}
      <ConfirmDialog
        title={'Block Users?'}
        open={openLockUserDialog}
        onClose={() => {
          setOpenLockUserDialog(false);
        }}
        onConfirm={async () => {
          const res: any = await changeBulkUsersStatus(
            selectedRows.map((row) => row._id),
            { status: 'BLOCK' }
          );

          if (res.data.status) {
            setOpenLockUserDialog(false);
            successAlert(res.data.message);
            refetch();
          } else {
            setOpenLockUserDialog(false);
            errorAlert(res.data.message);
          }
          return;
        }}
      >
        Are you sure you want to Block selected Users?
      </ConfirmDialog>

      {/* UN-BLOCK USER STATUS DIALOG */}
      <ConfirmDialog
        title={'Unblock Users?'}
        open={openUnLockUserDialog}
        onClose={() => {
          setOpenUnLockUserDialog(false);
        }}
        onConfirm={async () => {
          const res: any = await changeBulkUsersStatus(
            selectedRows.map((row) => row._id),
            { status: 'ACTIVE' }
          );

          if (res.data.status) {
            setOpenUnLockUserDialog(false);
            successAlert(res.data.message);
            refetch();
          } else {
            setOpenUnLockUserDialog(false);
            errorAlert(res.data.message);
          }
          return;
        }}
      >
        Are you sure you want to Unblock selected Users?
      </ConfirmDialog>
    </div>
  );
};

export default GlobalTable;
