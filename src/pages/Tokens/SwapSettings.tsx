import { useEffect, useState } from 'react';
import { add, edit, refresh } from '../../images/other';
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
    { id: 'fromToken', label: 'From Token', show: true },
    { id: 'toToken', label: 'To Token', show: true },
    { id: 'minAmount', label: 'Min Amount', show: true },
    { id: 'maxAmount', label: 'Max Amount', show: true },
    { id: 'createdAt', label: 'Time', show: true },
    { id: 'rate', label: 'Rate', show: true },
    { id: 'commission', label: 'Commission', show: true },
    { id: 'commissionType', label: 'Commission Type', show: true },
    { id: 'quickActions', label: 'Actions', show: true }
];


export default function SwapSettings() {
    const [loading, setLoading] = useState(false);


    const fetchData = () => {
        setLoading(true);
        setTimeout(() => {
            getSwapSettings();
            setLoading(false);
        }, 1000);
    };


    const { getSwapSettings, addSwapSettings, getAllTokens, updateSwapSettings } = useTokensSettingsAction();
    const { swapSettings, allTokens } = useSelector(selectTokensSettings);
    useEffect(() => {
        fetchData();
        getAllTokens();
    }, []);


    const [selectedId, setSelectedId] = useState(null);


    const rows = swapSettings ? swapSettings?.map((_data: any, index: number) => {
        return {
            fromToken: _data.fromToken?.name,
            toToken: _data.toToken?.name,
            minAmount: _data.minAmount,
            maxAmount: _data.maxAmount,
            createdAt: _data.createdAt,
            rate: _data.maxAmount,
            commission: _data.commission,
            commissionType: _data.commissionType,
            quickActions: (
                <div className="flex justify-start">
                    <img
                        src={edit}
                        width={24}
                        height={24}
                        color="red"
                        alt="View Icon"
                        className="cursor-pointer"
                        onClick={() => {
                            setOpen(true);
                            setSelectedId(
                                swapSettings[index]._id
                            );
                            formik.setFieldValue("fromToken", { label: swapSettings[index].fromToken.name, value: swapSettings[index].fromToken.name, id: swapSettings[index].fromToken._id });
                            formik.setFieldValue("toToken", { label: swapSettings[index].toToken.name, value: swapSettings[index].toToken.name, id: swapSettings[index].toToken._id });
                            formik.setFieldValue("minAmount", swapSettings[index].minAmount);
                            formik.setFieldValue("maxAmount", swapSettings[index].maxAmount);
                            formik.setFieldValue("rate", swapSettings[index].rate);
                            formik.setFieldValue("commission", swapSettings[index].commission);
                            formik.setFieldValue("commissionType", { label: swapSettings[index].commissionType, value: swapSettings[index].commissionType });
                        }}
                    />
                </div>
            ),
        };
    }) : [];


    const [open, setOpen] = useState(false);
    const onOpen = () => setOpen(true);
    const onClose = () => {
        setOpen(false);
        setSelectedId(null);
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
            rate: '',
            commission: '',
            commissionType: { label: "", value: "" }
        },
        validationSchema: Yup.object({
            fromToken: Yup.mixed().required('From Token is required'),
            toToken: Yup.mixed().required('To Token is required'),
            minAmount: Yup.number().required('Minimum Amount is required').min(0, 'Amount must be greater than or equal to 0'),
            maxAmount: Yup.number().required('Maximum Amount is required').min(0, 'Amount must be greater than or equal to 0'),
            rate: Yup.number().required('Rate is required').min(0, 'Rate must be greater than or equal to 0'),
            commission: Yup.number().required('Commission is required').min(0, 'Amount must be greater than or equal to 0'),
            commissionType: Yup.mixed().required('Commission Type is required'),
        }),
        onSubmit: async (values) => {
            const data = {
                fromToken: values.fromToken.id,
                toToken: values.toToken.id,
                minAmount: values.minAmount,
                maxAmount: values.maxAmount,
                rate: values.rate,
                commission: values.commission,
                commissionType: values.commissionType.value
            };
            if (!selectedId) {
                await addSwapSettings(data);
            }
            else {
                await updateSwapSettings({ id: selectedId, data });
            }
            fetchData();
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
                                allTokens ?
                                    allTokens.map((item: any) => ({ label: item.name, value: item.name, id: item._id }))
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
                                allTokens ?
                                    allTokens.map((item: any) => ({ label: item.name, value: item.name, id: item._id }))
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

                        <GlobalInput
                            name="rate"
                            label="Rate"
                            placeholder="Enter rate"
                            type="number"
                            required
                            value={formik.values.rate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={formik.touched.rate && !!formik.errors.rate}
                            error={formik.errors.rate}
                        />

                        <GlobalSelect
                            required
                            label="Commision Type"
                            name="commissionType"
                            placeholder="select a Commision Type"
                            options={[
                                { label: 'Fixed', value: 'fixed' },
                                { label: 'Percentage', value: 'percentage' },
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
                        onClick={fetchData}
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
                            isLoading={loading}
                            paginate={false}
                            imageItems={['iconUrl']}
                        />
                    )
                }
            </div>
        </>
    )
}