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
    { id: 'transactionStatus', label: 'Transaction', show: true },
    { id: 'time', label: 'Time', show: true },
    { id: 'toWallet', label: 'To Wallet', show: true },
    { id: 'toWalletIcon', label: 'Icon', show: true }
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


    const { getDepositSettings } = useTokensSettingsAction();
    const { depositSettings } = useSelector(selectTokensSettings);
    useEffect(() => {
        fetchData(1);
    }, []);


    const rows = depositSettings?.list ? depositSettings?.list?.map((_data: any) => {
        return {
            id: _data.requestId,
            userEmail: _data.user.email,
            amount: _data.amount,
            transactionStatus: _data.transactionStatus,
            time: _data.createdAt,
            toWallet: _data.toWallet.token.name,
            toWalletIcon: _data.toWallet.token.iconUrl
        };
    }) : [];


    return (
        <div className="w-full px-2">
            {/* PAGE TITLE */}
            <div className="flex bg-primary items-center  text-white">
                <h1 className="flex-1 font-bold text-2xl px-3 py-1">Deposit Settings</h1>

                <div
                    className="flex gap-1 items-center cursor-pointer px-3"
                    onClick={() => fetchData(1)}
                >
                    <img src={refresh} alt="" width={24} height={24} />
                    <span>Refresh</span>
                </div>
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
    )
}