import axios from 'axios';
import { FormEventHandler, useState } from 'react';
import { MdOutlineDarkMode } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LoginResponse } from '.';
import useValidation from '../../hooks/useValidation';
import { useAppDispatch } from '../../redux/hooks';
import { login } from '../../redux/slices/userInfo';

const StyledRegister = styled.div`
  max-width: 400px;
  width: 100%;
  margin-top: 14vh;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  position: relative;
  background-color: ${({ theme }) => theme.colors.feed};

  h1 {
    font-family: 'Lobster', cursive;
    font-size: 40px;
    text-align: center;
  }

  & > svg {
    position: absolute;
    top: 30px;
    right: 20px;
    cursor: pointer;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-top: 40px;

    div.inputContainer {
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 100%;
      margin-bottom: 40px;

      input {
        width: 100%;
        border: 1px solid lightgray;
        border-radius: 4px;
        padding: 10px;
        background-color: ${({ theme }) => theme.colors.loginInput};
      }
    }

    p {
      position: absolute;
      bottom: 64px;
      font-size: 14px;
      color: ${({ theme }) => theme.colors.subText};
    }

    button {
      width: 100%;
      border: none;
      border-radius: 4px;
      padding: 10px 0;
      background-color: ${({ theme }) => theme.colors.loginButton};

      color: white;
      font-weight: 700;
      font-size: 20px;
      cursor: pointer;

      &:disabled {
        background-color: ${({ theme }) => theme.colors.disabledBtn};
        color: ${({ theme }) => theme.colors.loginText};
      }
    }
  }

  a.login {
    display: block;
    margin-top: 14px;
    text-decoration: none;
    text-align: center;
    color: ${({ theme }) => theme.colors.subText};
  }
`;

const Register = ({ toggleTheme }: { toggleTheme: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const disabled = useValidation(email, password);
  const [loginError, setLoginError] = useState(false);

  const dispatch = useAppDispatch();

  const registerHandler: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();

    try {
      await axios.post('http://auth.jaejun.me:10010/signup', {
        email,
        password,
      });

      const {
        data: { access_token },
      } = await axios.post<LoginResponse>('http://auth.jaejun.me:10010/login', {
        email,
        password,
      });

      dispatch(login(access_token));
      setLoginError(false);
    } catch (error) {
      setLoginError(true);
    }
  };

  return (
    <StyledRegister>
      <h1>Register</h1>
      <MdOutlineDarkMode size={30} onClick={() => toggleTheme()} />
      <form onSubmit={registerHandler}>
        <div className='inputContainer'>
          <input
            type='email' //
            onChange={e => setEmail(e.target.value)}
            placeholder='이메일'
          />
          <input
            type='password' //
            autoComplete='false'
            onChange={e => setPassword(e.target.value)}
            placeholder='비밀번호'
          />
        </div>
        {loginError && <p>이메일과 비밀번호에 오류가 있거나 서버에 오류가 있습니다.</p>}
        <button disabled={disabled}>Register</button>
      </form>
      <Link to='/' className='login'>
        로그인
      </Link>
    </StyledRegister>
  );
};

export default Register;
