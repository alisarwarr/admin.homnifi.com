import { useEffect, useState } from 'react';
import { add, refresh } from '../../images/other';
import GlobalTable from '../../components/Table/GlobalTable';
import GlobalDialog from '../../components/Dialog';
import GlobalInput from '../../components/Global/GlobalInput';
import GlobalButton from '../../components/Global/GlobalButton';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTokensSettingsAction } from '../../store/tokensSettings/tokensSettingsAction';
import { selectTokensSettings } from '../../store/tokensSettings/tokensSettingsSlice';
import { useSelector } from 'react-redux';


const headCells = [
    { id: 'id', label: 'ID', show: true },
    { id: 'name', label: 'Name', show: true },
    { id: 'blockchainCode', label: 'Blockchain Code', show: true },
];


export default function NetworkSettings() {
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        // getWithdrawHistoryRequests(true, filter);
    }, []);


    const rows = []?.map((_data: any, index: number) => {
        return {
            id: "",
            name: "",
            blockchainCode: ""
        };
    });


    const [open, setOpen] = useState(false);
    const onOpen = () => setOpen(true);
    const onClose = () => {
        setOpen(false);
        setTimeout(() => { formik.resetForm(); }, 1000);
    };


    const formik = useFormik({
        initialValues: {
            name: '',
            blockchainCode: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            blockchainCode: Yup.string().required('Blockchain Code is required'),
        }),
        onSubmit: (values) => {
            alert(JSON.stringify(values));
            onClose();
        }
    });


    const { getNetworkSettings } = useTokensSettingsAction();
    const { networkSettings } = useSelector(selectTokensSettings);
    useEffect(() => {
        // getNetworkSettings();
    }, []);


    return (
        <>
            <GlobalDialog
                open={open}
                size="xs"
                closeButtonShow={false}
                onClose={onClose}
                content={
                    <form onSubmit={formik.handleSubmit}>
                        <GlobalInput
                            name="name"
                            label="Name"
                            placeholder="Enter your Name"
                            type="text"
                            required
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            isError={formik.errors.name && formik.touched.name}
                            error={formik.errors.name}
                        />

                        <GlobalInput
                            name="blockchainCode"
                            label="Blockchain Code"
                            placeholder="Enter Blockchain Code"
                            type="text"
                            required
                            value={formik.values.blockchainCode}
                            onChange={formik.handleChange}
                            isError={formik.errors.blockchainCode && formik.touched.blockchainCode}
                            error={formik.errors.blockchainCode}
                        />

                        <div className="flex justify-end mt-3">
                            <GlobalButton
                                text="Submit"
                                type='submit'
                                classNames="!rounded-lg font-normal tracking-wide !px-4 !py-3 !w-max text-sm"
                            />
                        </div>
                    </form>
                }
            />


            <div className="w-full px-2">
                {/* PAGE TITLE */}
                <div className="flex bg-primary items-center  text-white">
                    <h1 className="flex-1 font-bold text-2xl px-3 py-1">Network Settings</h1>

                    <div
                        className="flex gap-1 items-center cursor-pointer px-3"
                        onClick={async () => {
                            setLoading(true);
                            // await getWithdrawHistoryRequests(true, filter);
                            setLoading(false);
                        }}
                    >
                        <img src={refresh} alt="" width={24} height={24} />
                        <span>Refresh</span>
                    </div>

                    <button
                        className="flex gap-1 text-white items-center cursor-pointer px-3"
                        onClick={onOpen}
                    >
                        <img src={add} alt="" width={24} height={24} />
                        <span>Add Network</span>
                    </button>
                </div>

                {/* TABLE */}
                <GlobalTable
                    rows={rows}
                    headCells={headCells}
                // isLoading={loading}
                // totalPages={swapHistory?.totalPages}
                // page={filter.page}
                // handlePageChange={(page) => {
                //     setFilter({ ...filter, page });
                // }}
                // handleLimitChange={(limit) => {
                //     setFilter({ ...filter, limit });
                // }}
                // setColumns={setColumns}
                // ColumnsList={columns}
                // filter={filter}
                // setFilter={setFilter}
                // showInnerFilters={true}
                // csvData={getCsvData}
                />
            </div>
        </>
    )
}