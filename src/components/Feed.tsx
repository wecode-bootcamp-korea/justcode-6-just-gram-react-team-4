import { FormEventHandler, forwardRef, useRef, useState } from 'react';
import { AiFillHeart, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineHeart, AiOutlineMessage, AiOutlineSmile } from 'react-icons/ai';
import { BsThreeDots, BsTrash } from 'react-icons/bs';
import styled from 'styled-components';
import { feedData } from '../fakeData/getData';
import useSwiper from '../hooks/useSwiper';
import { useAppSelector } from '../redux/hooks';

const StyledLi = styled.li<{
  isOpen: boolean;
  imageLength: number | undefined;
}>`
  background-color: ${({ theme }) => theme.colors.feed};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 10px;
  margin-bottom: 20px;

  div.title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    font-weight: bold;
    padding: 20px;

    svg {
      cursor: pointer;
    }
  }

  div.imageWrapper {
    overflow: hidden;
    position: relative;
    margin-bottom: 10px;
    cursor: pointer;

    button {
      position: absolute;
      top: calc(50% - 15px);
      z-index: 2;
      font-size: 0;
      border: none;
      border-radius: 50%;
      background-color: white;
      color: black;
      opacity: 0.5;
      cursor: pointer;
      padding: 0;

      &.prev {
        left: 10px;
      }

      &.next {
        right: 10px;
      }
    }

    div.imageContainer {
      display: flex;
      width: calc(100% * ${({ imageLength }) => (imageLength ? imageLength : 0)});

      img {
        width: calc(100% / ${({ imageLength }) => (imageLength ? imageLength : 0)});
        aspect-ratio: 1 / 1.1;
        object-fit: cover;
        -webkit-user-drag: none;
      }
    }
  }

  ul.feedMenu {
    display: flex;
    gap: 20px;
    margin-bottom: 10px;
    padding: 0 20px;

    li:first-of-type {
      cursor: pointer;
    }
  }

  div.content {
    position: relative;
    padding: 0 20px;
    margin-bottom: 20px;

    & > p {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: ${({ isOpen }) => (isOpen ? 'none' : '3')};
      line-height: 1.5;
      overflow: hidden;
      margin-bottom: 20px;
      font-size: 18px;
    }

    span.more {
      position: absolute;
      right: 20px;
      bottom: -16px;
      margin: 0;
      cursor: pointer;
      font-size: 12px;
    }
  }

  div.likes {
    padding: 0 20px;
    margin-bottom: 20px;

    p {
      font-weight: 700;
    }
  }

  ul.commentList {
    display: flex;
    flex-direction: column;
    margin: 0 20px;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;

      strong {
        font-weight: 700;
      }

      svg {
        cursor: pointer;
      }
    }
  }

  form {
    display: flex;
    align-items: center;
    gap: 10px;
    border-top: 1px solid ${({ theme }) => theme.colors.line};
    padding: 20px;
    margin-top: 20px;

    input {
      width: 100%;
      border: none;
      background-color: transparent;
      padding: 4x;
      font-size: 20px;
    }
  }
`;

type IFeed = {
  feed: feedData;
  openModal: (idx: number) => void;
};

const Feed = forwardRef<HTMLLIElement, IFeed>(({ feed, openModal }, ref) => {
  const { swipedTarget, prevBtn, nextBtn, page } = useSwiper(feed.images);

  const [isOpen, setIsOpen] = useState(false);
  const [commentList, setCommentList] = useState(feed.commentList || []);
  const [likes, setLikes] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const submitHandler: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    if (commentList && inputRef.current && inputRef.current.value) {
      setCommentList([
        ...commentList,
        {
          commentId: (commentList.slice(-1)[0]?.commentId || 0) + 1,
          commentMain: inputRef.current.value,
          userId: 1,
        },
      ]);

      inputRef.current.value = '';
    }
  };

  const removeHandler = (commentId: number) => {
    setCommentList(commentList.filter(comment => comment.commentId !== commentId));
  };

  return (
    <StyledLi //
      isOpen={isOpen}
      ref={ref}
      imageLength={feed.images?.length}
    >
      <div className='title'>
        <h4>
          {feed.title} {feed.feedId}
        </h4>
        <BsThreeDots size={20} onClick={() => openModal(feed.feedId)} />
      </div>

      {feed.images && (
        <div className='imageWrapper'>
          {page === 0 || (
            <button className='prev' ref={prevBtn}>
              <AiOutlineArrowLeft size={30} color='black' />
            </button>
          )}
          {page === feed.images.length - 1 || (
            <button className='next' ref={nextBtn}>
              <AiOutlineArrowRight size={30} />
            </button>
          )}
          <div className='imageContainer' ref={swipedTarget}>
            {feed.images.map(image => (
              <img src={image} width='100%' key={image} />
            ))}
          </div>
        </div>
      )}

      <ul className='feedMenu'>
        <li onClick={() => setLikes(!likes)}>{likes ? <AiFillHeart size={34} color='red' /> : <AiOutlineHeart size={34} />}</li>
        <li>
          <AiOutlineMessage size={34} />
        </li>
      </ul>

      <div className='content'>
        <p>{feed.content}</p>
        <span className='more' onClick={() => setIsOpen(!isOpen)}>
          더 보기
        </span>
      </div>

      <div className='likes'>
        <p>좋아요 {likes ? 1 : 0}개</p>
      </div>

      <ul className='commentList'>
        {commentList.map(comment => (
          <li key={comment.commentId}>
            <p>
              <strong>{comment.commentId}</strong> {comment.commentMain}
            </p>
            <BsTrash onClick={() => removeHandler(comment.commentId)} />
          </li>
        ))}
      </ul>

      <form onSubmit={submitHandler}>
        <AiOutlineSmile size={24} />
        <input ref={inputRef} type='text' id='comment' placeholder='댓글입력' />
      </form>
    </StyledLi>
  );
});

export default Feed;
