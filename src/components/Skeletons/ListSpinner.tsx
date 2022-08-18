import styled, { keyframes } from 'styled-components';
import { useAppSelector } from '../../redux/hooks';

const fade = keyframes`
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(200%);
  }
`;

const StyledSpinner = styled.li<{
  theme: string;
}>`
  background-color: ${({ theme }) => (theme === 'light' ? 'white' : '#333333')};
  border: 1px solid ${({ theme }) => (theme === 'light' ? 'lightgray' : '#777777')};
  border-radius: 10px;
  margin-bottom: 20px;
  overflow: hidden;
  position: relative;

  div.title {
    width: 100px;
    height: 24px;
    background-color: ${({ theme }) => (theme === 'light' ? 'lightgray' : '#777777')};
    border-radius: 10px;
    margin: 20px;
  }

  div.image {
    aspect-ratio: 1 / 1.1;
    background-color: ${({ theme }) => (theme === 'light' ? 'lightgray' : '#777777')};
  }

  div.text {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 20px;

    div.line {
      width: 100%;
      height: 24px;
      background-color: ${({ theme }) => (theme === 'light' ? 'lightgray' : '#777777')};
      border-radius: 10px;

      &:last-of-type {
        width: 30%;
      }
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, ${({ theme }) => (theme === 'light' ? '#ffffff00' : '#33333300')} 0%, ${({ theme }) => (theme === 'light' ? '#ffffff' : '#333333')} 50%, ${({ theme }) => (theme === 'light' ? '#ffffff00' : '#33333300')} 100%);
    animation: ${fade} infinite 0.5s;
  }
`;

const ListSpinner = () => {
  const theme = useAppSelector(({ theme }) => theme);
  return (
    <StyledSpinner theme={theme}>
      <div className='title' />
      <div className='image' />
      <div className='text'>
        <div className='line' />
        <div className='line' />
        <div className='line' />
      </div>
    </StyledSpinner>
  );
};

export default ListSpinner;
