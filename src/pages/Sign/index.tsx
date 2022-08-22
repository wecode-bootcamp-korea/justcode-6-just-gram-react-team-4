import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import PageNotFound from '../404';
import Login from './Login';
import Register from './Register';

export interface LoginResponse {
  access_token: string;
}

const Sign = ({ toggleTheme }: { toggleTheme: () => void }) => {
  const access_token = useAppSelector(({ userInfo: { access_token } }) => access_token);
  const navigate = useNavigate();

  useEffect(() => {
    if (access_token) {
      navigate('/main');
    }
  }, [access_token]);

  return (
    <Routes>
      <Route path='/' element={<Login toggleTheme={toggleTheme} />} />
      <Route path='/register' element={<Register toggleTheme={toggleTheme} />} />
      <Route path='/*' element={<PageNotFound />} />
    </Routes>
  );
};

export default Sign;
