import styled from 'styled-components';
import Header from '../components/Header';
import ListSpinner from '../components/ListSpinner';
import Feed from '../components/Feed';
import useFetch from '../hooks/useFetch';
import { useCallback, useEffect, useState } from 'react';
import EndList from '../components/EndList';
import TopBtn from '../components/TopBtn';

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
  const [lastLi, setLastLi] = useState<HTMLLIElement | null>(null);
  const { loading, feedList, end } = useFetch(lastLi);

  const lastLiRef = useCallback((node: HTMLLIElement) => {
    if (node) setLastLi(node);
  }, []);

  return (
    <>
      <Header />
      <TopBtn />
      <StyledMain>
        <ul className='feedList'>
          {feedList.map((feed, i) => (
            <Feed
              feed={feed} //
              key={feed.feedId}
              ref={i === feedList.length - 1 ? lastLiRef : null}
            />
          ))}
          {loading && <ListSpinner />}
          {end && <EndList />}
        </ul>
        <aside>2</aside>
      </StyledMain>
    </>
  );
};

export default Main;
