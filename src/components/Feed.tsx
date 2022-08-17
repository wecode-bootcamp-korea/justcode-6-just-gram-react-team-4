import { FormEventHandler, forwardRef, useRef, useState } from 'react';
import { AiOutlineSmile } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import styled from 'styled-components';
import { feedData } from '../fakeData/getData';
import { useAppSelector } from '../redux/hooks';

const StyledLi = styled.li<{
  theme: string;
  isOpen: boolean;
  imageLength: number | undefined;
  imagePage: number;
}>`
  background-color: ${({ theme }) => (theme === 'light' ? 'white' : '#333333')};
  border: 1px solid ${({ theme }) => (theme === 'light' ? 'lightgray' : '#777777')};
  border-radius: 10px;
  margin-bottom: 20px;

  h4 {
    font-size: 18px;
    font-weight: bold;
    padding: 20px;
  }

  div.imageWrapper {
    overflow: hidden;
    position: relative;

    button {
      position: absolute;
      top: calc(50% - 15px);
      z-index: 2;
      width: 30px;
      height: 30px;
      font-size: 0;
      border: none;
      border-radius: 50%;
      background-color: white;
      opacity: 0.5;
      cursor: pointer;

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
      margin-bottom: 20px;
      transform: translateX(calc(-100% * ${({ imagePage, imageLength }) => imagePage / (imageLength as number)}));
      transition: 0.3s;

      img {
        width: calc(100% / ${({ imageLength }) => (imageLength ? imageLength : 0)});
        aspect-ratio: 1 / 1.1;
        object-fit: cover;
      }
    }
  }

  div.content {
    position: relative;
    margin: 0 20px;

    & > p {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: ${({ isOpen }) => (isOpen ? 'none' : '3')};
      line-height: 1.5;
      overflow: hidden;
      margin-bottom: 20px;
    }

    span.more {
      position: absolute;
      right: 0;
      bottom: -18px;
      margin: 0;
      cursor: pointer;
      font-size: 12px;
    }
  }
  ul.commentList {
    display: flex;
    flex-direction: column;
    margin: 10px 20px 0 20px;

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
    border-top: 1px solid ${({ theme }) => (theme === 'light' ? 'gray' : 'white')};
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
};

const Feed = forwardRef<HTMLLIElement, IFeed>(({ feed }, ref) => {
  const theme = useAppSelector(({ theme }) => theme);

  const [isOpen, setIsOpen] = useState(false);
  const [commentList, setCommentList] = useState(feed.commentList || []);
  const [imagePage, setImagePage] = useState(0);

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

  const changePage = (isNext: boolean) => {
    if (feed.images) {
      if (isNext && imagePage < feed.images.length - 1) {
        setImagePage(imagePage + 1);
      } else if (!isNext && imagePage > 0) {
        setImagePage(imagePage - 1);
      }
    }
  };

  return (
    <StyledLi //
      theme={theme}
      isOpen={isOpen}
      ref={ref}
      imageLength={feed.images?.length}
      imagePage={imagePage}
    >
      <h4>
        {feed.title} {feed.feedId}
      </h4>

      {feed.images && (
        <div className='imageWrapper'>
          {imagePage !== 0 && (
            <button className='prev' onClick={() => changePage(false)}>
              이전
            </button>
          )}
          {imagePage !== feed.images.length - 1 && (
            <button className='next' onClick={() => changePage(true)}>
              다음
            </button>
          )}
          <div className='imageContainer'>
            {feed.images.map(image => (
              <img src={image} width='100%' key={image} />
            ))}
          </div>
        </div>
      )}

      <div className='content'>
        <p>{feed.content}</p>
        <span className='more' onClick={() => setIsOpen(!isOpen)}>
          더 보기
        </span>
      </div>
      <ul className='commentList'>
        {commentList.map(comment => (
          <li key={comment.commentId}>
            <p>
              <strong>{comment.userId}</strong> {comment.commentMain}
            </p>
            <BsTrash onClick={() => removeHandler(comment.commentId)} />
          </li>
        ))}
      </ul>

      <form onSubmit={submitHandler}>
        <AiOutlineSmile size={30} />
        <input ref={inputRef} type='text' id='comment' placeholder='댓글입력' />
      </form>
    </StyledLi>
  );
});

export default Feed;
