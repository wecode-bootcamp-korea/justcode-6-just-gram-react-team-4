import { FormEventHandler, useEffect, useState } from 'react';
import { MdOutlineDarkMode } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useValidation from '../hooks/useValidation';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { toggleTheme } from '../redux/slices/isDark';

const StyledLogin = styled.div<{
  theme: string;
}>`
  max-width: 400px;
  width: 100%;
  margin-top: 200px;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  position: relative;
  background-color: ${({ theme }) => (theme === 'light' ? 'white' : '#444444')};

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
        background-color: ${({ theme }) => (theme === 'light' ? 'white' : '#444444')};
      }
    }

    button {
      width: 100%;
      border: none;
      border-radius: 4px;
      padding: 10px 0;
      background-color: ${({ theme }) => (theme === 'light' ? 'blue' : '#888888')};

      color: white;
      font-weight: 700;
      font-size: 20px;
      cursor: pointer;

      &:disabled {
        background-color: ${({ theme }) => (theme === 'light' ? 'lightskyblue' : '#555555')};
        color: ${({ theme }) => (theme === 'light' ? 'white' : '#999999')};
      }
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const disabled = useValidation(email, pw);

  const theme = useAppSelector(({ theme }) => theme);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginHandler: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    navigate('/main');
  };

  return (
    <StyledLogin theme={theme}>
      <h1>Justgram</h1>
      <MdOutlineDarkMode size={30} onClick={() => dispatch(toggleTheme())} />
      <form onSubmit={loginHandler}>
        <div className='inputContainer'>
          <input
            type='email' //
            onChange={e => setEmail(e.target.value)}
            placeholder='이메일'
          />
          <input
            type='password' //
            autoComplete='false'
            onChange={e => setPw(e.target.value)}
            placeholder='비밀번호'
          />
        </div>
        <button disabled={disabled}>Login</button>
      </form>
    </StyledLogin>
  );
};

export default Login;
