import styled from 'styled-components';
import useScrollDetector from '../hooks/useScrollDetector';
import { BiArrowToTop } from 'react-icons/bi';
import { useAppSelector } from '../redux/hooks';

const StyledBtn = styled.button<{
  scrollOver: boolean;
  theme: boolean;
}>`
  position: fixed;
  right: 20px;
  bottom: 20px;
  padding: 10px;
  background-color: ${({ theme }) => (theme === 'light' ? 'white' : '#444444')};
  border: none;
  border-radius: 50%;
  transform: translateY(${({ scrollOver }) => (scrollOver ? '0px' : '100px')});
  transition: 0.3s;
  cursor: pointer;
`;

const TopBtn = () => {
  const { scrollOver } = useScrollDetector();
  const theme = useAppSelector(({ theme }) => theme);

  return (
    <StyledBtn scrollOver={scrollOver} theme={theme} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <BiArrowToTop size={40} />
    </StyledBtn>
  );
};

export default TopBtn;
