import { setLogin, setLogout, setUpdateUser } from './userSlice';
import { useDispatch } from 'react-redux';
import { GET_PROFILE, IMPERSONATE_USER, LOGIN } from '../../utils/network/ApiEndpoints';
import ApiRequest from '../../utils/network/ApiRequest';
//API
import { useNavigate } from 'react-router-dom';

export const useUserActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = async ({ email, password }: { email: string; password: string }) => {
    dispatch(
      setLogin({
        loginLoading: true,
      })
    );
    return await ApiRequest()
      .request({
        method: 'POST',
        url: LOGIN,
        data: {
          email,
          password,
        },
      })
      .then((response: any) => {
        const { data } = response;
        console.log('🚀 ~ .then ~ data:', data);
        dispatch(
          setLogin({
            accessToken: data.data.accessToken,
            user: data.data.admin,
            loginLoading: false,
          })
        );
        navigate('/');

        return response.data;
      })
      .catch((error: any) => {
        dispatch(
          setLogin({
            loginLoading: false,
          })
        );
        return error;
      });
  };

  const impersonateUser = async (id: string) => {
    const response = await ApiRequest().request({
      method: 'GET',
      url: IMPERSONATE_USER + `/${id}`,
    });

    return response.data;
  };

  const userLogout = async () => {
    dispatch(setLogout());
    navigate('/auth/signin');
    window.location.reload();
  };

  const getUserProfiles = async () => {
    return await ApiRequest()
      .request({
        method: 'GET',
        url: GET_PROFILE,
      })
      .then((response: any) => {
        const profile = response.data.data;
        console.log({ profile });

        dispatch(setUpdateUser({ user: profile }));
        return response;
      })
      .catch((error: any) => error);
  };

  return {
    userLogin,
    userLogout,
    impersonateUser,
    getUserProfiles,
  };
};
