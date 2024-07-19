//UTILS
import { errorAlert, successAlert } from '../../utils/alerts';
import { PLATFORM_AD } from '../../utils/network/ApiEndpoints';
import ApiRequest from '../../utils/network/ApiRequest';
import { setAds } from './platformSlice';
import { useDispatch } from 'react-redux';


export const usePlatformAction = () => {
    const dispatch = useDispatch();


    const addPlatformAd = async (data: any) => {
        return await ApiRequest()
            .request({
                method: 'POST',
                url: PLATFORM_AD,
                data,
            })
            .then((response: any) => {
                successAlert(response.data.message);
            })
            .catch((error: any) => {
                errorAlert(error.data.message || "Something went wrong");
            });
    };
    const getPlatformAd = async () => {
        return await ApiRequest()
            .request({
                method: 'GET',
                url: PLATFORM_AD
            })
            .then((response: any) => {
                dispatch(setAds(response.data.data));
                return response;
            })
            .catch((error: any) => error);
    };
    const editPlatformAd = async ({ id, data }: { id: string; data: any }) => {
        return await ApiRequest()
            .request({
                method: 'PUT',
                url: PLATFORM_AD + id,
                data,
            })
            .then((response: any) => {
                successAlert(response.data.message);
            })
            .catch((error: any) => {
                errorAlert(error.data.message || "Something went wrong");
            });
    };


    return {
        addPlatformAd,
        getPlatformAd,
        editPlatformAd
    }
}