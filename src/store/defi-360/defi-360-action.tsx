//UTILS
import ApiRequest from '../../utils/network/ApiRequest';
import { setAutoCompoundPenality } from './defi-360-slice';
import { DEFI_360_AUTO_COMPOUND_PENALITY } from '../../utils/network/ApiEndpoints';
import { useDispatch } from 'react-redux';


export const useDefi360Action = () => {
    const dispatch = useDispatch();


    const getAutoCompoundPenality = async () => {
        return await ApiRequest()
            .request({
                method: 'GET',
                url: DEFI_360_AUTO_COMPOUND_PENALITY,
            })
            .then((response: any) => {
                dispatch(setAutoCompoundPenality(response.data.data));
                return response;
            })
            .catch((error: any) => error);
    };


    const postAutoCompoundPenality = async (data: any) => {
        return await ApiRequest()
            .request({
                method: 'POST',
                url: DEFI_360_AUTO_COMPOUND_PENALITY,
                data
            })
            .then((response: any) => response)
            .catch((error: any) => error);
    };


    return {
        getAutoCompoundPenality,
        postAutoCompoundPenality
    };
};
