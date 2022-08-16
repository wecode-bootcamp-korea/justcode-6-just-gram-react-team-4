import { ImSpinner8 } from 'react-icons/im';
import styled, { keyframes } from 'styled-components';
import { useAppSelector } from '../redux/hooks';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.li<{
  theme: string;
}>`
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: ${({ theme }) => (theme === 'light' ? 'white' : '#444444')};
  border: 1px solid lightgray;
  border-radius: 10px;

  svg {
    animation: ${spin} infinite 0.5s;
  }
`;

const ListSpinner = () => {
  const theme = useAppSelector(({ theme }) => theme);

  return (
    <StyledSpinner theme={theme}>
      <ImSpinner8 size={30} />
    </StyledSpinner>
  );
};

export default ListSpinner;
