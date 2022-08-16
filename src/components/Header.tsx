import styled from 'styled-components';
import { BsBookmark, BsPerson, BsSearch } from 'react-icons/bs';
import { MdOutlineDarkMode, MdDarkMode } from 'react-icons/md';
import { AiOutlineHome } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { toggleTheme } from '../redux/slices/isDark';

const StyledHeader = styled.header<{
  menu: boolean;
  theme: string;
}>`
  display: flex;
  justify-content: center;
  width: 100%;
  border-bottom: 1px solid lightgray;
  background-color: ${({ theme }) => (theme === 'light' ? 'white' : '#333333')};
  z-index: 10;

  div.headerContainer {
    max-width: 1100px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    position: relative;

    h1 {
      font-size: 30px;
      font-family: 'Lobster', cursive;
    }

    div.inputContainer {
      position: absolute;
      left: calc(50% - 150px);
      background: #eeeeee;
      border-radius: 10px;
      display: flex;
      align-items: center;
      width: 300px;
      padding: 10px 14px;
      gap: 14px;
      overflow: hidden;

      input {
        width: 100%;
        border: none;
        background: transparent;
      }
    }

    ul.gnb {
      display: flex;
      align-items: center;
      gap: 20px;

      li {
        cursor: pointer;
        border-radius: 50%;

        &:last-of-type {
          border: 1px solid ${({ menu, theme }) => (menu ? (theme === 'light' ? 'black' : 'white') : 'transparent')};
        }
      }
    }

    div.lnbContainer {
      position: absolute;
      top: 100%;
      right: -10px;
      filter: drop-shadow(0 0px 4px rgba(0, 0, 0, 0.1));
      opacity: ${({ menu }) => (menu ? '1' : '0')};
      visibility: ${({ menu }) => (menu ? 'visible' : 'hidden')};
      transform: translateY(${({ menu }) => (menu ? '0' : '-20px')});
      transition: 0.3s;

      ul.lnb {
        overflow: hidden;
        border-radius: 10px;

        li {
          width: 200px;
          background-color: ${({ theme }) => (theme === 'light' ? 'white' : '#444444')};
          padding: 14px;
          cursor: pointer;
          transition: 0.1s;
          position: relative;

          &:hover {
            background-color: ${({ theme }) => (theme === 'light' ? '#eeeeee' : '#777777')};
          }

          &:last-of-type {
            border-top: 1px solid lightgray;
          }
        }
      }

      div.tail {
        position: absolute;
        right: 5px;
        top: -10px;
        border-bottom: 20px solid ${({ theme }) => (theme === 'light' ? 'white' : '#444444')};
        border-left: 20px solid transparent;
        border-right: 20px solid transparent;
      }
    }
  }
`;

const Header = () => {
  const [menu, setMenu] = useState(false);
  const theme = useAppSelector(({ theme }) => theme);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (e.target instanceof Element && !e.target.closest('li.menuBtn')) {
        setMenu(false);
      }
    };

    window.addEventListener('click', clickHandler);
    return () => {
      window.removeEventListener('click', clickHandler);
    };
  }, []);

  const logout = () => {
    navigate('/');
  };

  return (
    <StyledHeader menu={menu} theme={theme}>
      <div className='headerContainer'>
        <h1>Justgram</h1>
        <div className='inputContainer'>
          <BsSearch size={20} />
          <input type='text' placeholder='검색' />
        </div>
        <ul className='gnb'>
          <li onClick={() => dispatch(toggleTheme())}>
            <MdOutlineDarkMode size={30} />
          </li>
          <li>
            <AiOutlineHome size={30} />
          </li>
          <li>
            <BsBookmark size={30} />
          </li>
          <li className='menuBtn' onClick={() => setMenu(!menu)}>
            <BsPerson size={30} />
          </li>
        </ul>
        <div className='lnbContainer'>
          <div className='tail' />
          <ul className='lnb'>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li onClick={logout}>로그아웃</li>
          </ul>
        </div>
      </div>
    </StyledHeader>
  );
};

export default Header;
