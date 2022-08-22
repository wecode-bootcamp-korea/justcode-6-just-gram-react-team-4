import styled from 'styled-components';
import Header from '../components/Header';
import ListSpinner from '../components/Skeletons/ListSpinner';
import Feed from '../components/Feed';
import useFetch from '../hooks/useFetch';
import { useState } from 'react';
import EndList from '../components/EndList';
import TopBtn from '../components/TopBtn';
import Profile from '../components/Profile';
import FeedModal from '../components/FeedModal';
import useModal from '../hooks/useModal';

const StyledMain = styled.main`
  max-width: 1100px;
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;

  ul.feedList {
    width: 60%;
  }

  aside {
    width: 40%;
  }
`;

const Main = ({ toggleTheme }: { toggleTheme: () => void }) => {
  const [lastLi, setLastLi] = useState<HTMLLIElement | null>(null);
  const { loading, feedList, end } = useFetch(lastLi);
  const { modal, closeModal, openModal, selectedFeed } = useModal();

  return (
    <>
      {modal && <FeedModal closeModal={closeModal} selectedFeed={selectedFeed} />}
      <Header toggleTheme={toggleTheme} />
      <TopBtn />
      <StyledMain>
        <ul className='feedList'>
          {feedList.map((feed, i) => (
            <Feed
              feed={feed} //
              key={feed.feedId}
              ref={i === feedList.length - 1 ? setLastLi : null}
              openModal={openModal}
            />
          ))}
          {loading && <ListSpinner />}
          {end && <EndList />}
        </ul>
        <Profile />
      </StyledMain>
    </>
  );
};

export default Main;
