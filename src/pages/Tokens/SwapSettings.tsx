import { useEffect, useState } from 'react';
import { add, refresh } from '../../images/other';
import GlobalTable from '../../components/Table/GlobalTable';
import GlobalDialog from '../../components/Dialog';
import GlobalInput from '../../components/Global/GlobalInput';
import GlobalSelect from '../../components/Global/GlobalSelect';
import GlobalButton from '../../components/Global/GlobalButton';
import GlobalFormControlLabel from '../../components/Global/GlobalFormControlLabel';
import GlobalSwitch from '../../components/Global/GlobalSwitch';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTokensSettingsAction } from '../../store/tokensSettings/tokensSettingsAction';
import { selectTokensSettings } from '../../store/tokensSettings/tokensSettingsSlice';
import { useSelector } from 'react-redux';


const headCells = [
    { id: 'id', label: 'ID', show: true },
    { id: 'fromToken', label: 'From Token', show: true },
    { id: 'toToken', label: 'To Token', show: true },
    { id: 'minAmount', label: 'Min. Amount', show: true },
    { id: 'maxAmount', label: 'Max. Amount', show: true },
    { id: 'commisionType', label: 'Commision Type', show: true },
    { id: 'customRate', label: 'Custom Rate', show: true },
];


export default function SwapSettings() {
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        // getWithdrawHistoryRequests(true, filter);
    }, []);


    const rows = []?.map((_data: any, index: number) => {
        return {
            id: "",
            fromToken: "",
            toToken: "",
            assertTo: "",
            minAmount: "",
            maxAmount: "",
            feeType: "",
            commisionType: "",
            customRate: ""
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
            fromToken: '',
            toToken: '',
            assertTo: '',
            minAmount: '',
            maxAmount: '',
            feeType: '',
            customRate: '',
            commisionType: ''
        },
        validationSchema: Yup.object({
            fromToken: Yup.string().required('From Token is required'),
            toToken: Yup.string().required('To Token is required'),
            minAmount: Yup.number().required('Minimum Amount is required').min(0, 'Amount must be greater than or equal to 0'),
            maxAmount: Yup.number().required('Maximum Amount is required').min(0, 'Amount must be greater than or equal to 0'),
            customRate: Yup.number(),
            commisionType: Yup.string().required('Commission Type is required'),
        }),
        onSubmit: (values) => {
            alert(JSON.stringify(values));
            onClose();
        }
    });


    const { getSwapSettings } = useTokensSettingsAction();
    const { swapSettings } = useSelector(selectTokensSettings);
    useEffect(() => {
        // getSwapSettings();
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
                        <GlobalSelect
                            required
                            label="From Token"
                            name="fromToken"
                            placeholder="select a From Token"
                            options={[
                                { label: 'Token A', value: 'tokenA' },
                                { label: 'Token B', value: 'tokenB' },
                            ]}
                            value={formik.values.fromToken}
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
                            options={[
                                { label: 'Token X', value: 'tokenX' },
                                { label: 'Token Y', value: 'tokenY' },
                            ]}
                            value={formik.values.toToken}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={formik.touched.toToken && !!formik.errors.toToken}
                            error={formik.errors.toToken}
                            setFieldTouched={formik.setFieldTouched}
                            setFieldValue={formik.setFieldValue}
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

                        <div className="flex items-center justify-between">
                            <GlobalFormControlLabel
                                control={
                                    <GlobalSwitch
                                        checked={formik.values.customRate}
                                        onChange={(e) => {
                                            formik.setFieldValue('customRate', e.target.checked);
                                            // Reset customRate value when switching off
                                            if (!e.target.checked) {
                                                formik.setFieldValue('customRate', 0);
                                            }
                                        }}
                                    />
                                }
                                label="Custom Rate"
                                className="text-primary"
                            />

                            <GlobalInput
                                name="customRate"
                                label="Custom Rate"
                                type="number"
                                required
                                value={formik.values.customRate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isError={formik.touched.customRate && !!formik.errors.customRate}
                                error={formik.errors.customRate}
                                disabled={!formik.values.customRate}
                            />
                        </div>

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
                        <span>Add Swap</span>
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