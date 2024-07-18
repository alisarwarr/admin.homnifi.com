// REDUX
import {
  TokenTransactionSettingType,
  selectToken,
  setTokenList,
  setTokenPairs,
  setTokenTRansactionSettingList,
  setWithdrawSettingsList,
} from './tokenSlice';
import { useDispatch, useSelector } from 'react-redux';

// UTILS
import {
  TOKEN,
  TOKEN_PAIRS,
  TOKEN_PAIRS_EDIT,
  TOKEN_PAIRS_SETTING,
  TOKEN_TRANSACTION_SETTING,
  GET_ALL_TOKENS,
  ADD_WITH_DRAW_SETTINGS,
} from '../../utils/network/ApiEndpoints';
import ApiRequest from '../../utils/network/ApiRequest';

export const useTokenActions = () => {
  const dispatch = useDispatch();

  const { tokensList, tokenTransactionSettingList, tokenPairs } = useSelector(selectToken);

  // Recent Devices Section Notifications Api
  const getTokensList = async (force: boolean = false) => {
    if (tokensList?.length && !force) return;

    const response = await ApiRequest().request({
      method: 'GET',
      url: GET_ALL_TOKENS,
    });

    const _tokensList = response?.data.data;
    dispatch(setTokenList(_tokensList));
  };

  const getTokenById = async (id: string) => {
    const response = await ApiRequest().request({
      method: 'GET',
      url: `${TOKEN}/${id}`,
    });
    const _token = response?.data?.data;
    return _token;
  };

  const updateToken = async (id: string | undefined, data: any) => {
    return await ApiRequest()
      .request({
        method: 'PUT',
        url: `${TOKEN}/${id}/settings`,
        data: data,
      })
      .then((response: any) => {
        getTokensList(true);
        return { status: true, ...response.data };
      })
      .catch((err: any) => {
        return { status: false, ...err.data };
      });
  };

  const getTokenTransactionSettingList = async (force: boolean = false) => {
    const existingData = Object.keys(tokenTransactionSettingList).find((token) => {
      return tokenTransactionSettingList[token].length > 0 && token;
    });

    if (existingData && !force) return;

    const response = await ApiRequest().request({
      method: 'GET',
      url: `${TOKEN_TRANSACTION_SETTING}`,
    });
    const _tokenTransactionSettingList = response?.data?.data;
    console.log('🚀 ~ getTokenTransactionSettingList ~ _tokenTransactionSettingList:', _tokenTransactionSettingList);

    const tokensByType: { [key: string]: TokenTransactionSettingType[] } = {};

    // Iterate over each transaction type
    const transactionTypes = ['LYK-W', 'LYK-R', 'LYK-D'];
    transactionTypes.forEach((type) => {
      // Filter tokens array based on transactionType
      const tokensOfType = _tokenTransactionSettingList.filter(
        (token: TokenTransactionSettingType) => token.symbol === type
      );

      // Assign filtered tokens to the corresponding type key in tokensByType object
      tokensByType[type] = tokensOfType;
    });

    dispatch(setTokenTRansactionSettingList(tokensByType));
  };

  const getTokenTransactionSettingById = async (id: string) => {
    const response = await ApiRequest().request({
      method: 'GET',
      url: `${TOKEN_TRANSACTION_SETTING}/${id}`,
    });
    const _tokenTransactionSetting = response?.data?.data;
    return _tokenTransactionSetting;
  };

  const updateTokenTransactionSettings = async (id: string | undefined, data: any) => {
    return await ApiRequest()
      .request({
        method: 'PUT',
        url: `${TOKEN}/${id}/trx-settings`,
        data: data,
      })
      .then((response: any) => {
        return { status: true, ...response.data };
      })
      .catch((err: any) => {
        return { status: true, ...err.data };
      });
  };

  const getTokenPairs = async (force: boolean = false) => {
    if (tokenPairs?.length && !force) return;

    return await ApiRequest()
      .request({
        method: 'GET',
        url: TOKEN_PAIRS,
      })
      .then((response: any) => {
        dispatch(setTokenPairs(response?.data?.data));
        return response;
      })
      .catch((err: any) => {
        return err.data;
      });
  };

  const getTokenPairById = async (id: string) => {
    return await ApiRequest()
      .request({
        method: 'GET',
        url: `${TOKEN_PAIRS}/${id}`,
      })
      .then((response: any) => {
        return response?.data?.data;
      })
      .catch((err: any) => {
        return err.data;
      });
  };

  const getSingleTokenPairSetting = async () => {
    return await ApiRequest()
      .request({
        method: 'GET',
        url: TOKEN_PAIRS_SETTING,
      })
      .then((response: any) => {
        return response.data.data;
      })
      .catch((err: any) => {
        return err.data;
      });
  };

  const editSingleTokenPairSetting = async (data: any) => {
    return await ApiRequest()
      .request({
        method: 'POST',
        url: TOKEN_PAIRS_EDIT,
        data,
      })
      .then((response: any) => {
        return response.data;
      })
      .catch((err: any) => {
        return err.data;
      });
  };

  const createWithdrawSetting = async (data: any) => {
    return await ApiRequest()
      .request({
        method: 'POST',
        url: ADD_WITH_DRAW_SETTINGS,
        data,
      })
      .then((response: any) => {
        return response.data;
      })
      .catch((err: any) => {
        return err.data;
      });
  };

  const createNewToken = async (data: any) => {
    return await ApiRequest()
      .request({
        method: 'POST',
        url: `${TOKEN}`,
        data: data,
      })
      .then((response: any) => {
        getTokensList(true);
        return response.data;
      })
      .catch((err: any) => {
        return err.data;
      });
  };

  const onUpdateToken = async (id: string | undefined, data: any) => {
    return await ApiRequest()
      .request({
        method: 'PUT',
        url: `${TOKEN}/${id}`,
        data: data,
      })
      .then((response: any) => {
        getTokensList(true);
        console.log('response update token::', response.data);
        return response.data;
      })
      .catch((err: any) => {
        return err.data;
      });
  };

  const getWithdrawSettings = async () => {
    return await ApiRequest()
      .request({
        method: 'GET',
        url: ADD_WITH_DRAW_SETTINGS,
      })
      .then((response: any) => {
        dispatch(setWithdrawSettingsList(response.data.data));
        return response.data.data;
      })
      .catch((err: any) => {
        return err.data;
      });
  };

  const updateWithdrawSetting = async (id: string, data: any) => {
    return await ApiRequest()
      .request({
        method: 'PUT',
        url: `${ADD_WITH_DRAW_SETTINGS}/${id}`,
        data,
      })
      .then((response: any) => {
        getWithdrawSettings();
        return response.data;
      })
      .catch((err: any) => {
        return err.data;
      });
  };

  return {
    createWithdrawSetting,
    getTokensList,
    getTokenById,
    updateToken,
    getTokenTransactionSettingList,
    getTokenTransactionSettingById,
    updateTokenTransactionSettings,
    getTokenPairs,
    getTokenPairById,
    getSingleTokenPairSetting,
    editSingleTokenPairSetting,
    createNewToken,
    onUpdateToken,
    getWithdrawSettings,
    updateWithdrawSetting
  };
};
