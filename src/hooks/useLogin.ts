import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

const useLogin = () => {
  const isLogin = useAppSelector(({ userInfo: { isLogin } }) => isLogin);
  const navigate = useNavigate();

  useEffect(() => {
    isLogin ? navigate('/main') : navigate('/');
  }, [isLogin]);
};

export default useLogin;
