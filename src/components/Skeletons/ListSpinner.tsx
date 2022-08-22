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

const StyledSpinner = styled.li`
  background-color: ${({ theme }) => theme.colors.header};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 10px;
  margin-bottom: 20px;
  overflow: hidden;
  position: relative;

  div.title {
    width: 100px;
    height: 24px;
    background-color: ${({ theme }) => theme.colors.line};
    border-radius: 10px;
    margin: 20px;
  }

  div.image {
    aspect-ratio: 1 / 1.1;
    background-color: ${({ theme }) => theme.colors.line};
  }

  div.text {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 20px;

    div.line {
      width: 100%;
      height: 24px;
      background-color: ${({ theme }) => theme.colors.line};
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
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.skeletonGrad.side} 0%, ${({ theme }) => theme.colors.skeletonGrad.center} 50%, ${({ theme }) => theme.colors.skeletonGrad.side} 100%);
    animation: ${fade} infinite 0.5s;
  }
`;

const ListSpinner = () => {
  return (
    <StyledSpinner>
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
