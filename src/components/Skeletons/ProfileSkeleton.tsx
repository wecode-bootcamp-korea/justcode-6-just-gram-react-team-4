import styled from 'styled-components';

const StyledDiv = styled.div`
  div.name {
    width: 120px;
    height: 20px;
    background-color: ${({ theme }) => theme.colors.line};
    margin-bottom: 10px;
  }

  div.email {
    width: 180px;
    height: 18px;
    background-color: ${({ theme }) => theme.colors.line};
  }
`;

const ProfileSkeleton = () => {
  return (
    <StyledDiv>
      <div className='name' />
      <div className='email' />
    </StyledDiv>
  );
};

export default ProfileSkeleton;
