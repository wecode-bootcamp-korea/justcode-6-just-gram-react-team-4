import { forwardRef } from 'react';
import styled from 'styled-components';
import { feedData } from '../fakeData/getData';
import { useAppSelector } from '../redux/hooks';

const StyledLi = styled.li<{
  theme: string;
}>`
  padding: 20px;
  background-color: ${({ theme }) => (theme === 'light' ? 'white' : '#333333')};
  border: 1px solid ${({ theme }) => (theme === 'light' ? 'lightgray' : '#777777')};
  border-radius: 10px;
  margin-bottom: 20px;

  h4 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  p {
    line-height: 1.5;
  }
`;

type IFeed = {
  feed: feedData;
};

const Feed = forwardRef<HTMLLIElement, IFeed>(({ feed }, ref) => {
  const theme = useAppSelector(({ theme }) => theme);
  return (
    <StyledLi theme={theme} ref={ref}>
      <h4>
        {feed.title} {feed.feedId}
      </h4>
      <p>{feed.content}</p>
    </StyledLi>
  );
});

export default Feed;
