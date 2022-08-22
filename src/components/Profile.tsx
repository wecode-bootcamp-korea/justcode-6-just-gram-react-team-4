import { useEffect, useState } from 'react';
import { BsPerson } from 'react-icons/bs';
import styled from 'styled-components';
import { useAppSelector } from '../redux/hooks';
import FollowSkeleton from './Skeletons/FollowSkeleton';
import ProfileSkeleton from './Skeletons/ProfileSkeleton';

const StyledAside = styled.aside`
  div.profile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    div.imgContainer {
      border: 1px solid gray;
      border-radius: 50%;
      overflow: hidden;
      padding: 4px;
    }

    div.userName {
      width: 64%;

      p:first-of-type {
        font-weight: bold;
        margin-bottom: 10px;
      }
    }

    button {
      background: transparent;
      border: none;
    }
  }

  div.desc {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 10px;

    p:first-of-type {
      font-weight: bold;
    }

    button {
      background: transparent;
      border: none;
    }
  }

  ul.follow {
    margin: 0 10px;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      div.name {
        display: flex;
        flex-direction: column;
        gap: 10px;
        font-size: 14px;
      }

      button {
        background: transparent;
        border: none;
      }
    }
  }
`;

interface FollowData {
  name: string;
  id: number;
}

const Profile = () => {
  const [followList, setFollowList] = useState<FollowData[]>([]);
  const [followLoading, setFollowLoading] = useState(true);
  const { loading, email } = useAppSelector(({ userInfo }) => userInfo);

  useEffect(() => {
    setFollowLoading(true);
    setTimeout(() => {
      setFollowList([
        {
          id: 1,
          name: '이름1',
        },
        {
          id: 2,
          name: '이름2',
        },
      ]);
      setFollowLoading(false);
    }, 1000);
  }, []);

  return (
    <StyledAside>
      <div className='profile'>
        <div className='imgContainer'>
          <BsPerson size={60} />
        </div>
        <div className='userName'>
          {loading ? (
            <ProfileSkeleton />
          ) : (
            <>
              <p>나의 이름</p>
              <p>{email}</p>
            </>
          )}
        </div>
        <button>전환</button>
      </div>
      <div className='desc'>
        <p>회원 님을 위한 추천</p>
        <button>모두 보기</button>
      </div>
      <ul className='follow'>
        {followLoading && (
          <>
            <FollowSkeleton />
            <FollowSkeleton />
          </>
        )}
        {followList.map(follow => (
          <li key={follow.id}>
            <div className='name'>
              <p>{follow.name}</p>
              <p>{follow.id}</p>
            </div>
            <button>팔로우</button>
          </li>
        ))}
      </ul>
    </StyledAside>
  );
};

export default Profile;
