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
    { id: 'toWalletIcon', label: 'To Wallet Icon', show: true },
    { id: 'onChainWallet', label: 'On Chain Wallet', show: true },
    { id: 'confirmation', label: 'Confirmation', show: true },
    { id: 'transactionStatus', label: 'Transaction', show: true },
];


export default function DepositSettings() {
    const [loading, setLoading] = useState(false);


    const fetchData = (page: number) => {
        setLoading(true);
        setTimeout(() => {
            getDepositSettings({ page, limit: 10 });
            setLoading(false);
        }, 1000);
    };


    const { getDepositSettings, addNetworkSettings } = useTokensSettingsAction();
    const { depositSettings } = useSelector(selectTokensSettings);
    useEffect(() => {
        fetchData(1);
    }, []);


    const rows = depositSettings?.list ? depositSettings?.list?.map((_data: any) => {
        return {
            id: _data.requestId,
            userEmail: _data.user.email,
            amount: _data.amount,
            time: _data.createdAt,
            toWallet: _data.toWallet.token.name,
            toWalletIcon: _data.toWallet.token.iconUrl,
            onChainWallet: _data.onChainWallet,
            confirmation: _data.confirmation,
            transactionStatus: _data.transactionStatus
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
            minDisplayAmount: ''
        },
        validationSchema: Yup.object({
            fromToken: Yup.string().required('Type is required'),
            toToken: Yup.string().required('ID is required'),
            minAmount: Yup.string().required('Minimum Amount is required'),
            minDisplayAmount: Yup.string().required('Minimum Display Amount is required')
        }),
        onSubmit: async (values) => {
            const data = {
                fromToken: values.fromToken.id,
                toToken: values.toToken,
                minAmount: values.minAmount,
                minDisplayAmount: values.minDisplayAmount
            };
            await addNetworkSettings(data);
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
                                depositSettings?.list
                                    ? depositSettings?.list.map((item: any) => item.toWallet.token).map((item: any) => ({ label: item.name, value: item.name, id: item._id }))
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
                            label="From Token"
                            name="fromToken"
                            placeholder="select a From Token"
                            options={
                                depositSettings?.list
                                    ? depositSettings?.list.map((item: any) => item.toWallet.token).map((item: any) => ({ label: item.name, value: item.name, id: item._id }))
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
                            name="minDisplayAmount"
                            label="Min. Display Amount"
                            placeholder="Enter Minimum Display Amount"
                            type="number"
                            value={formik.values.minDisplayAmount}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={formik.touched.minDisplayAmount && !!formik.errors.minDisplayAmount}
                            error={formik.errors.minDisplayAmount}
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
                        <span>Add Deposit</span>
                    </button>
                </div>

                {/* TABLE */}
                {
                    depositSettings && (
                        <GlobalTable
                            rows={rows}
                            headCells={headCells}
                            copyItems={['']}
                            colorItems={['transactionStatus']}
                            imageItems={['toWalletIcon']}
                            isLoading={loading}
                            totalPages={depositSettings?.totalPages}
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