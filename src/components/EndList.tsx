import styled from 'styled-components';

const StyledLi = styled.li`
  display: flex;
  justify-content: center;
  padding: 20px;
  margin-bottom: 20px;
  font-weight: 700;
`;

const EndList = () => {
  return <StyledLi>There is no more feed</StyledLi>;
};

export default EndList;
