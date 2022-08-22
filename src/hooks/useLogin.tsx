import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { ProfileResponse, setLoading, setProfile } from '../redux/slices/userInfo';

/**
 * access_token이 있는지 검사 후 있을 경우 profile을 불러와주는 훅,
 * access_token이 없을 경우 로그인 페이지로 돌려보냄
 * access_token이 있을 경우 profile을 불러오고 실패할 경우 다시 로그인 페이지로 돌려보냄
 */

const useLogin = () => {
  const access_token = useAppSelector(({ userInfo: { access_token } }) => access_token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      dispatch(setLoading(true));

      if (!access_token) {
        navigate('/');
        dispatch(setLoading(false));
        return;
      }

      try {
        const { data } = await axios.get<ProfileResponse>('http://auth.jaejun.me:10010/me', {
          headers: {
            Authorization: access_token,
          },
        });

        dispatch(setProfile(data));
        navigate('/main');
        dispatch(setLoading(false));
      } catch (error) {
        navigate('/');
        dispatch(setLoading(false));
      }
    })();
  }, [access_token]);
};

export default useLogin;
