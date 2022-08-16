import styled, { keyframes } from 'styled-components';
import Header from '../components/Header';
import { ImSpinner8 } from 'react-icons/im';
import ListSpinner from '../components/ListSpinner';

const StyledMain = styled.main`
  max-width: 1100px;
  width: 100%;
  margin-top: 100px;
  display: flex;
  justify-content: space-between;
  gap: 20px;

  ul.feedList {
    width: 60%;
  }

  aside {
    width: 40%;
  }
`;

const Main = () => {
  return (
    <>
      <Header />
      <StyledMain>
        <ul className='feedList'>
          <ListSpinner />
        </ul>
        <aside>2</aside>
      </StyledMain>
    </>
  );
};

export default Main;
