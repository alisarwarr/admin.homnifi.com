import { useEffect, useState } from 'react';
import { add, refresh } from '../../images/other';
import GlobalTable from '../../components/Table/GlobalTable';
import GlobalDialog from '../../components/Dialog';
import GlobalInput from '../../components/Global/GlobalInput';
import GlobalSelect from '../../components/Global/GlobalSelect';
import GlobalButton from '../../components/Global/GlobalButton';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTokensSettingsAction } from '../../store/tokensSettings/tokensSettingsAction';
import { selectTokensSettings } from '../../store/tokensSettings/tokensSettingsSlice';
import { useSelector } from 'react-redux';


const headCells = [
    { id: 'requestId', label: 'ID', show: true },
    { id: 'userEmail', label: 'Email', show: true },
    { id: 'amount', label: 'Amount', show: true },
    { id: 'transactionStatus', label: 'Transaction', show: true },
    { id: 'time', label: 'Time', show: true },
    { id: 'toWallet', label: 'To Wallet', show: true },
    { id: 'toWalletIcon', label: 'Icon', show: true },
];


export default function DepositSettings() {
    const [loading, setLoading] = useState(true);


    const { getDepositSettings } = useTokensSettingsAction();
    const { depositSettings } = useSelector(selectTokensSettings);
    useEffect(() => {
        getDepositSettings({ page: 1, limit: 10 });
    }, []);
    console.log({ depositSettings });


    const rows = depositSettings?.list ? depositSettings?.list?.map((_data: any, index: number) => {
        return {
            requestId: _data.requestId,
            userEmail: _data.user.email,
            amount: _data.amount,
            transactionStatus: _data.transactionStatus,
            time: _data.createdAt,
            toWallet: _data.toWallet.token.name,
            toWalletIcon: _data.toWallet.token.iconUrl
        };
    }) : [];


    const [open, setOpen] = useState(false);
    const onOpen = () => setOpen(true);
    const onClose = () => {
        setOpen(false);
        setTimeout(() => { formik.resetForm(); }, 1000);
    };


    const formik = useFormik({
        initialValues: {
            fromToken: '',
            toToken: '',
            assertTo: '',
            minAmount: '',
            mimDisplayAmount: '',
            feeType: '',
            commisionType: ''
        },
        validationSchema: Yup.object({
            fromToken: Yup.string().required('Type is required'),
            toToken: Yup.string().required('ID is required'),
            minAmount: Yup.string().required('Minimum Amount is required'),
            mimDisplayAmount: Yup.string().required('Minimum Display Amount is required'),
            feeType: Yup.string().required('Fee Type is required'),
            commisionType: Yup.string().required('Commision Type is required'),
        }),
        onSubmit: (values) => {
            alert(JSON.stringify(values));
            onClose();
        },
    });


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
                            name="fromToken"
                            label="Type"
                            placeholder="Enter From Token"
                            type="text"
                            value={formik.values.fromToken}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={formik.touched.fromToken && !!formik.errors.fromToken}
                            error={formik.errors.fromToken}
                        />

                        <GlobalInput
                            name="toToken"
                            label="ID"
                            placeholder="Enter To Token"
                            type="text"
                            value={formik.values.toToken}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={formik.touched.toToken && !!formik.errors.toToken}
                            error={formik.errors.toToken}
                        />

                        <GlobalInput
                            name="minAmount"
                            label="Min. Amount"
                            placeholder="Enter Minimum Amount"
                            type="number"
                            value={formik.values.minAmount}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={formik.touched.minAmount && !!formik.errors.minAmount}
                            error={formik.errors.minAmount}
                        />

                        <GlobalInput
                            name="mimDisplayAmount"
                            label="Min. Display Amount"
                            placeholder="Enter Minimum Display Amount"
                            type="number"
                            value={formik.values.mimDisplayAmount}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={formik.touched.mimDisplayAmount && !!formik.errors.mimDisplayAmount}
                            error={formik.errors.mimDisplayAmount}
                        />

                        <GlobalInput
                            name="feeType"
                            label="Fee Type"
                            placeholder="Enter Fee Type"
                            type="number"
                            value={formik.values.feeType}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={formik.touched.feeType && !!formik.errors.feeType}
                            error={formik.errors.feeType}
                        />

                        <GlobalSelect
                            required
                            label="Commision Type"
                            name="commisionType"
                            placeholder="select a Commision Type"
                            options={[
                                { label: 'Token X', value: 'tokenX' },
                                { label: 'Token Y', value: 'tokenY' },
                            ]}
                            value={formik.values.commisionType}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={formik.touched.commisionType && !!formik.errors.commisionType}
                            error={formik.errors.commisionType}
                            setFieldTouched={formik.setFieldTouched}
                            setFieldValue={formik.setFieldValue}
                        />

                        <div className="flex justify-end mt-3">
                            <GlobalButton
                                text="Submit"
                                type="submit"
                                classNames="!rounded-lg font-normal tracking-wide !px-4 !py-3 !w-max text-sm"
                            />
                        </div>
                    </form>
                }
            />


            <div className="w-full px-2">
                {/* PAGE TITLE */}
                <div className="flex bg-primary items-center  text-white">
                    <h1 className="flex-1 font-bold text-2xl px-3 py-1">Deposit Settings</h1>

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
                        <span>Add Deposit</span>
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