import styled from 'styled-components';

const StyledLi = styled.li`
  display: flex;
  justify-content: space-between;

  div.left {
    display: flex;
    flex-direction: column;
    gap: 10px;

    div.name {
      width: 100px;
      height: 20px;
      background-color: lightgray;
      border-radius: 10px;

      &:first-of-type {
        width: 120px;
      }
    }
  }

  div.btn {
    width: 60px;
    height: 20px;
    background-color: lightgray;
    border-radius: 10px;
  }
`;

const FollowSkeleton = () => {
  return (
    <StyledLi>
      <div className='left'>
        <div className='name'></div>
        <div className='name'></div>
      </div>
      <div className='btn'></div>
    </StyledLi>
  );
};

export default FollowSkeleton;
