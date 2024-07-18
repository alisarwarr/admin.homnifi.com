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
    { id: 'id', label: 'ID', show: true },
    { id: 'userEmail', label: 'Email', show: true },
    { id: 'amount', label: 'Amount', show: true },
    { id: 'time', label: 'Time', show: true },
    { id: 'toWallet', label: 'To Wallet', show: true },
    { id: 'fromWallet', label: 'From Wallet', show: true },
    { id: 'serialNumber', label: 'Serial Number', show: true },
    { id: 'fee', label: 'Fee', show: true },
    { id: 'total', label: 'Total', show: true }
];


export default function SwapSettings() {
    const [loading, setLoading] = useState(false);


    const fetchData = (page: number) => {
        setLoading(true);
        setTimeout(() => {
            getSwapSettings({ page, limit: 10 });
            setLoading(false);
        }, 1000);
    };


    const { getSwapSettings, addSwapSettings } = useTokensSettingsAction();
    const { swapSettings } = useSelector(selectTokensSettings);
    useEffect(() => {
        fetchData(1);
    }, []);


    const rows = swapSettings?.list ? swapSettings?.list?.map((_data: any) => {
        return {
            id: _data.requestId,
            userEmail: _data.user.email,
            amount: _data.amount,
            time: _data.createdAt,
            toWallet: _data.toWallet.token.name,
            fromWallet: _data.fromWallet.token.name,
            serialNumber: _data.serialNumber,
            fee: _data.fee,
            total: _data.total
        };
    }) : [];


    const [open, setOpen] = useState(false);
    const onOpen = () => setOpen(true);
    const onClose = () => {
        setOpen(false);
        setTimeout(() => {
            formik.resetForm();
        }, 1000);
    };


    const formik = useFormik({
        initialValues: {
            fromToken: { label: "", value: "", id: "" },
            toToken: { label: "", value: "", id: "" },
            minAmount: '',
            maxAmount: '',
            feeType: '',
            commission: '',
            commissionType: { label: "", value: "" }
        },
        validationSchema: Yup.object({
            fromToken: Yup.mixed().required('From Token is required'),
            toToken: Yup.mixed().required('To Token is required'),
            minAmount: Yup.number().required('Minimum Amount is required').min(0, 'Amount must be greater than or equal to 0'),
            maxAmount: Yup.number().required('Maximum Amount is required').min(0, 'Amount must be greater than or equal to 0'),
            commission: Yup.number().required('Commission is required').min(0, 'Amount must be greater than or equal to 0'),
            commissionType: Yup.mixed().required('Commission Type is required'),
        }),
        onSubmit: async (values) => {
            const data = {
                fromToken: values.fromToken.id,
                toToken: values.toToken.id,
                minAmount: values.minAmount,
                maxAmount: values.maxAmount,
                commission: values.commission,
                commissionType: values.commissionType.value
            };
            await addSwapSettings(data);
            fetchData(1);
            onClose();
        }
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
                        <GlobalSelect
                            required
                            label="From Token"
                            name="fromToken"
                            placeholder="select a From Token"
                            options={
                                swapSettings?.list
                                    ? swapSettings?.list.map((item: any) => item.fromWallet.token).map((item: any) => ({ label: item.name, value: item.name, id: item._id }))
                                    : []
                            }
                            value={formik.values.fromToken.value}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={formik.touched.fromToken && !!formik.errors.fromToken}
                            error={formik.errors.fromToken}
                            setFieldTouched={formik.setFieldTouched}
                            setFieldValue={formik.setFieldValue}
                        />

                        <GlobalSelect
                            required
                            label="To Token"
                            name="toToken"
                            placeholder="select a To Token"
                            options={
                                swapSettings?.list
                                    ? swapSettings?.list.map((item: any) => item.toWallet.token).map((item: any) => ({ label: item.name, value: item.name, id: item._id }))
                                    : []
                            }
                            value={formik.values.toToken.value}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={formik.touched.toToken && !!formik.errors.toToken}
                            error={formik.errors.toToken}
                            setFieldTouched={formik.setFieldTouched}
                            setFieldValue={formik.setFieldValue}
                        />

                        <GlobalInput
                            name="minAmount"
                            label="Min. Amount"
                            placeholder="Enter Min. Amount"
                            type="number"
                            required
                            value={formik.values.minAmount}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={formik.touched.minAmount && !!formik.errors.minAmount}
                            error={formik.errors.minAmount}
                        />

                        <GlobalInput
                            name="maxAmount"
                            label="Max. Amount"
                            placeholder="Enter Max. Amount"
                            type="number"
                            required
                            value={formik.values.maxAmount}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={formik.touched.maxAmount && !!formik.errors.maxAmount}
                            error={formik.errors.maxAmount}
                        />

                        <GlobalSelect
                            required
                            label="Commision Type"
                            name="commissionType"
                            placeholder="select a Commision Type"
                            options={[
                                { label: 'Token X', value: 'tokenX' },
                                { label: 'Token Y', value: 'tokenY' },
                            ]}
                            value={formik.values.commissionType.value}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={formik.touched.commissionType && !!formik.errors.commissionType}
                            error={formik.errors.commissionType}
                            setFieldTouched={formik.setFieldTouched}
                            setFieldValue={formik.setFieldValue}
                        />

                        <GlobalInput
                            name="commission"
                            label="Commission"
                            type="number"
                            required
                            value={formik.values.commission}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={formik.touched.commission && !!formik.errors.commission}
                            error={formik.errors.commission}
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
                    <h1 className="flex-1 font-bold text-2xl px-3 py-1">Swap Settings</h1>

                    <div
                        className="flex gap-1 items-center cursor-pointer px-3"
                        onClick={() => fetchData(1)}
                    >
                        <img src={refresh} alt="refresh" width={24} height={24} />
                        <span>Refresh</span>
                    </div>

                    <button
                        className="flex gap-1 text-white items-center cursor-pointer px-3"
                        onClick={onOpen}
                    >
                        <img src={add} alt="" width={24} height={24} />
                        <span>Add Swap</span>
                    </button>
                </div>

                {/* TABLE */}
                {
                    swapSettings && (
                        <GlobalTable
                            rows={rows}
                            headCells={headCells}
                            copyItems={['']}
                            colorItems={['']}
                            imageItems={['']}
                            isLoading={loading}
                            totalPages={swapSettings?.totalPages}
                            handlePageChange={(page: number) => {
                                fetchData(page);
                            }}
                        />
                    )
                }
            </div>
        </>
    )
}